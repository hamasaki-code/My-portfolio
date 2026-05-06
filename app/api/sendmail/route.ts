import nodemailer from "nodemailer";
import { isIP } from "node:net";
import { NextResponse } from "next/server";

type ContactRequestBody = {
    name?: unknown;
    email?: unknown;
    content?: unknown;
    recaptchaToken?: unknown;
};

type ValidatedContactRequest = {
    name: string;
    email: string;
    content: string;
    recaptchaToken: string;
};

type RecaptchaVerifyResponse = {
    success?: boolean;
    "error-codes"?: string[];
};

type RecaptchaVerificationResult =
    | { ok: true }
    | { ok: false; status: number; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_CONTENT_LENGTH = 500;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_CLEANUP_INTERVAL_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_BUCKETS = 5000;
const RECAPTCHA_TIMEOUT_MS = 5000;
const RECAPTCHA_MIN_TIMEOUT_MS = 1000;
const rateLimitStore = new Map<string, number[]>();
let lastRateLimitCleanupAt = 0;

const parseBoolean = (value: string | undefined, fallback: boolean) => {
    if (value === undefined) {
        return fallback;
    }

    if (/^(true|1|yes|on)$/i.test(value)) {
        return true;
    }

    if (/^(false|0|no|off)$/i.test(value)) {
        return false;
    }

    return fallback;
};

const parseNumber = (value: string | undefined, fallback: number) => {
    if (!value) {
        return fallback;
    }

    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : fallback;
};

const parseMinimumNumber = (
    value: string | undefined,
    fallback: number,
    minimum: number
) => {
    return Math.max(parseNumber(value, fallback), minimum);
};

const isSelfSignedCertificateError = (error: unknown) => {
    if (!(error instanceof Error)) {
        return false;
    }

    const message = error.message.toLowerCase();

    return (
        message.includes("self-signed certificate") ||
        message.includes("unable to verify the first certificate")
    );
};

const isTimeoutError = (error: unknown) => {
    if (!(error instanceof Error || error instanceof DOMException)) {
        return false;
    }

    return error.name === "AbortError" || error.name === "TimeoutError";
};

const jsonError = (
    error: string,
    status: number,
    fields?: Record<string, string>
) => {
    return NextResponse.json(
        {
            error,
            ...(fields ? { fields } : {}),
        },
        { status }
    );
};

const normalizeString = (value: unknown) => {
    return typeof value === "string" ? value.trim() : "";
};

const validateContactRequest = (
    body: ContactRequestBody
):
    | { ok: true; data: ValidatedContactRequest }
    | { ok: false; fields: Record<string, string> } => {
    const name = normalizeString(body.name);
    const email = normalizeString(body.email);
    const content = normalizeString(body.content);
    const recaptchaToken = normalizeString(body.recaptchaToken);
    const fields: Record<string, string> = {};

    if (!name) {
        fields.name = "お名前を入力してください。";
    } else if (name.length > MAX_NAME_LENGTH) {
        fields.name = `お名前は${MAX_NAME_LENGTH}文字以内で入力してください。`;
    }

    if (!email) {
        fields.email = "メールアドレスを入力してください。";
    } else if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
        fields.email = "有効なメールアドレスを入力してください。";
    }

    if (!content) {
        fields.content = "お問い合わせ内容を入力してください。";
    } else if (content.length > MAX_CONTENT_LENGTH) {
        fields.content = `お問い合わせ内容は${MAX_CONTENT_LENGTH}文字以内で入力してください。`;
    }

    if (!recaptchaToken) {
        fields.recaptchaToken = "reCAPTCHA認証を完了してください。";
    }

    if (Object.keys(fields).length > 0) {
        return { ok: false, fields };
    }

    return {
        ok: true,
        data: {
            name,
            email,
            content,
            recaptchaToken,
        },
    };
};

const shouldTrustForwardedIpHeaders = () => {
    return parseBoolean(
        process.env.TRUST_FORWARDED_IP_HEADERS,
        process.env.VERCEL === "1"
    );
};

const normalizeIpAddressCandidate = (value: string | null | undefined) => {
    const candidate = value?.trim();

    if (!candidate) {
        return null;
    }

    const bracketedAddress = candidate.match(/^\[([^\]]+)\](?::\d+)?$/)?.[1];

    if (bracketedAddress) {
        return bracketedAddress;
    }

    const ipv4WithPort = candidate.match(/^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/)?.[1];

    return ipv4WithPort ?? candidate;
};

const sanitizeIpAddress = (value: string | null | undefined) => {
    const candidate = normalizeIpAddressCandidate(value);

    if (!candidate || !isIP(candidate)) {
        return null;
    }

    return candidate;
};

const getClientIp = (request: Request): string | null => {
    if (!shouldTrustForwardedIpHeaders()) {
        return null;
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const forwardedIp = sanitizeIpAddress(forwardedFor?.split(",")[0]);

    return (
        sanitizeIpAddress(request.headers.get("cf-connecting-ip")) ||
        sanitizeIpAddress(request.headers.get("x-real-ip")) ||
        forwardedIp
    );
};

const cleanupStaleRateLimitBuckets = (now: number, force = false) => {
    if (!force && now - lastRateLimitCleanupAt < RATE_LIMIT_CLEANUP_INTERVAL_MS) {
        return;
    }

    lastRateLimitCleanupAt = now;

    rateLimitStore.forEach((timestamps, key) => {
        const recentRequests = timestamps.filter(
            (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
        );

        if (recentRequests.length === 0) {
            rateLimitStore.delete(key);
        } else if (recentRequests.length !== timestamps.length) {
            rateLimitStore.set(key, recentRequests);
        }
    });
};

const pruneRateLimitBucketsToMax = () => {
    if (rateLimitStore.size <= RATE_LIMIT_MAX_BUCKETS) {
        return;
    }

    const overflowCount = rateLimitStore.size - RATE_LIMIT_MAX_BUCKETS;
    const oldestBuckets = Array.from(rateLimitStore, ([key, timestamps]) => ({
        key,
        oldestTimestamp: timestamps[0] ?? 0,
    })).sort((left, right) => left.oldestTimestamp - right.oldestTimestamp);

    oldestBuckets.slice(0, overflowCount).forEach(({ key }) => {
        rateLimitStore.delete(key);
    });
};

const getRateLimitKey = (clientIp: string | null) => {
    if (clientIp) {
        return `ip:${clientIp}`;
    }

    return "anonymous:global";
};

const enforceRateLimitStoreCapacity = (now: number) => {
    if (rateLimitStore.size <= RATE_LIMIT_MAX_BUCKETS) {
        return;
    }

    cleanupStaleRateLimitBuckets(now, true);

    if (rateLimitStore.size > RATE_LIMIT_MAX_BUCKETS) {
        pruneRateLimitBucketsToMax();
    }
};

const checkRateLimit = (key: string) => {
    const now = Date.now();
    cleanupStaleRateLimitBuckets(
        now,
        rateLimitStore.size >= RATE_LIMIT_MAX_BUCKETS
    );
    enforceRateLimitStoreCapacity(now);

    const recentRequests = (rateLimitStore.get(key) ?? []).filter(
        (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
    );

    if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
        rateLimitStore.set(key, recentRequests);
        enforceRateLimitStoreCapacity(now);
        return false;
    }

    recentRequests.push(now);
    rateLimitStore.set(key, recentRequests);
    enforceRateLimitStoreCapacity(now);

    return true;
};

const verifyRecaptcha = async (
    token: string,
    clientIp: string | null
): Promise<RecaptchaVerificationResult> => {
    const secret =
        process.env.RECAPTCHA_SECRET_KEY ?? process.env.RECAPTCHA_SECRET;

    if (!secret) {
        console.error("Missing reCAPTCHA secret key.");
        return {
            ok: false,
            status: 500,
            error: "reCAPTCHA設定が不足しています。",
        };
    }

    const params = new URLSearchParams({
        secret,
        response: token,
    });

    if (clientIp) {
        params.set("remoteip", clientIp);
    }

    const timeoutMs = parseMinimumNumber(
        process.env.RECAPTCHA_VERIFY_TIMEOUT_MS,
        RECAPTCHA_TIMEOUT_MS,
        RECAPTCHA_MIN_TIMEOUT_MS
    );
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort(new DOMException("Timed out", "TimeoutError"));
    }, timeoutMs);
    timeoutId.unref?.();

    try {
        const response = await fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: params,
                signal: controller.signal,
            }
        );

        if (!response.ok) {
            console.error("reCAPTCHA verification request failed.", response.status);
            return {
                ok: false,
                status: 502,
                error: "reCAPTCHA認証を確認できませんでした。時間をおいて再度お試しください。",
            };
        }

        const result = (await response.json()) as RecaptchaVerifyResponse;

        if (!result.success) {
            console.warn(
                "reCAPTCHA verification failed.",
                result["error-codes"] ?? []
            );
            return {
                ok: false,
                status: 403,
                error: "reCAPTCHA認証に失敗しました。再度お試しください。",
            };
        }

        return { ok: true };
    } catch (error) {
        if (isTimeoutError(error)) {
            console.error("reCAPTCHA verification timed out.", { timeoutMs });
            return {
                ok: false,
                status: 502,
                error: "reCAPTCHA認証がタイムアウトしました。時間をおいて再度お試しください。",
            };
        }

        console.error("reCAPTCHA verification error.", error);
        return {
            ok: false,
            status: 502,
            error: "reCAPTCHA認証を確認できませんでした。時間をおいて再度お試しください。",
        };
    } finally {
        clearTimeout(timeoutId);
    }
};

export async function POST(request: Request) {
    try {
        let body: ContactRequestBody;

        try {
            const parsedBody = await request.json();

            if (
                !parsedBody ||
                typeof parsedBody !== "object" ||
                Array.isArray(parsedBody)
            ) {
                return jsonError("リクエストの形式が正しくありません。", 400);
            }

            body = parsedBody as ContactRequestBody;
        } catch {
            return jsonError("リクエストの形式が正しくありません。", 400);
        }

        const validation = validateContactRequest(body);

        if (!validation.ok) {
            return jsonError(
                "入力内容を確認してください。",
                400,
                validation.fields
            );
        }

        const clientIp = getClientIp(request);
        const rateLimitKey = getRateLimitKey(clientIp);

        if (!checkRateLimit(rateLimitKey)) {
            return jsonError(
                "送信回数が多すぎます。時間をおいて再度お試しください。",
                429
            );
        }

        const recaptcha = await verifyRecaptcha(
            validation.data.recaptchaToken,
            clientIp
        );

        if (!recaptcha.ok) {
            return jsonError(recaptcha.error, recaptcha.status);
        }

        const smtpUser =
            process.env.MAIL_ACCOUNT ??
            process.env.AUTH_USER ??
            process.env.EMAIL_USER;
        const smtpPass =
            process.env.MAIL_PASSWORD ??
            process.env.AUTH_PASS ??
            process.env.EMAIL_PASS;

        if (!smtpUser || !smtpPass) {
            console.error(
                "Missing SMTP credentials. Please configure MAIL_ACCOUNT/MAIL_PASSWORD, AUTH_USER/AUTH_PASS, or EMAIL_USER/EMAIL_PASS."
            );

            return jsonError(
                "メール設定が行われていないため送信に失敗しました。管理者にお問い合わせください。",
                500
            );
        }

        const fromAddress = process.env.MAIL_FROM ?? smtpUser;
        const ownerAddress =
            process.env.MAIL_TO ??
            process.env.CONTACT_TO ??
            process.env.RECIPIENT_EMAIL ??
            smtpUser;

        const host = process.env.SMTP_HOST ?? process.env.MAIL_HOST ?? "smtp.gmail.com";
        const port = parseNumber(process.env.SMTP_PORT ?? process.env.MAIL_PORT, 465);
        const secure = parseBoolean(
            process.env.SMTP_SECURE ?? process.env.MAIL_SECURE,
            port === 465
        );

        const allowSelfSigned = parseBoolean(
            process.env.SMTP_ALLOW_SELF_SIGNED ?? process.env.MAIL_ALLOW_SELF_SIGNED,
            false
        );
        const rejectUnauthorized = allowSelfSigned
            ? false
            : parseBoolean(
                  process.env.SMTP_REJECT_UNAUTHORIZED ?? process.env.MAIL_REJECT_UNAUTHORIZED,
                  true
              );

        if (!rejectUnauthorized) {
            console.warn(
                "SMTP TLS certificate verification is disabled. Do not use this in production environments."
            );
        }

        const createTransporter = (overrideRejectUnauthorized?: boolean) =>
            nodemailer.createTransport({
                host,
                port,
                secure,
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                },
                tls: {
                    rejectUnauthorized:
                        overrideRejectUnauthorized ?? rejectUnauthorized,
                },
            });

        const mailSubject = "【Portfolio】お問い合わせフォームに新着メッセージ";

        const ownerMail = {
            from: fromAddress,
            to: ownerAddress,
            replyTo: validation.data.email,
            subject: mailSubject,
            text: [
                `お名前: ${validation.data.name}`,
                `メールアドレス: ${validation.data.email}`,
                "",
                "お問い合わせ内容:",
                validation.data.content,
            ].join("\n"),
        } satisfies nodemailer.SendMailOptions;

        let transporter = createTransporter();

        try {
            await transporter.sendMail(ownerMail);
        } catch (error) {
            const allowSelfSignedFallback =
                process.env.NODE_ENV !== "production" &&
                !allowSelfSigned &&
                rejectUnauthorized;

            if (allowSelfSignedFallback && isSelfSignedCertificateError(error)) {
                console.warn(
                    "Detected a self-signed TLS certificate. Retrying mail delivery with relaxed certificate validation because the app is running in development mode. Set SMTP_ALLOW_SELF_SIGNED=true or provide a trusted certificate to avoid this fallback."
                );

                transporter = createTransporter(false);
                await transporter.sendMail(ownerMail);
            } else {
                throw error;
            }
        }

        return NextResponse.json({ message: "メールが送信されました。" });
    } catch (error) {
        console.error(error);
        return jsonError(
            "メールの送信中にエラーが発生しました。",
            500
        );
    }
}

export function GET() {
    return jsonError("POSTメソッドを使用してください。", 405);
}
