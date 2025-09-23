import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactRequestBody = {
    name?: string;
    email?: string;
    subject?: string;
    content?: string;
};

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

export async function POST(request: Request) {
    try {
        const { name, email, subject, content }: ContactRequestBody = await request.json();

        const smtpUser = process.env.MAIL_ACCOUNT ?? process.env.AUTH_USER;
        const smtpPass = process.env.MAIL_PASSWORD ?? process.env.AUTH_PASS;

        if (!smtpUser || !smtpPass) {
            console.error("Missing SMTP credentials. Please configure MAIL_ACCOUNT/MAIL_PASSWORD or AUTH_USER/AUTH_PASS.");

            return NextResponse.json(
                { error: "メール設定が行われていないため送信に失敗しました。管理者にお問い合わせください。" },
                { status: 500 }
            );
        }

        const fromAddress = process.env.MAIL_FROM ?? smtpUser;
        const ownerAddress = process.env.MAIL_TO ?? process.env.CONTACT_TO ?? smtpUser;

        const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
        const port = parseNumber(process.env.SMTP_PORT, 465);
        const secure = parseBoolean(process.env.SMTP_SECURE, port === 465);

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        const senderName = name?.trim() || "匿名";
        const senderEmail = email?.trim();
        const mailSubject = subject?.trim() || "お問い合わせ";
        const message = content?.trim() || "(本文なし)";

        const ownerMail = {
            from: fromAddress,
            to: ownerAddress,
            replyTo: senderEmail,
            subject: `【お問い合わせ】${mailSubject}`,
            text: [
                `お名前: ${senderName}`,
                senderEmail ? `メールアドレス: ${senderEmail}` : null,
                "",
                "お問い合わせ内容:",
                message,
            ]
                .filter((line): line is string => Boolean(line))
                .join("\n"),
        } satisfies nodemailer.SendMailOptions;

        const acknowledgementMail = senderEmail
            ? ({
                  from: fromAddress,
                  to: senderEmail,
                  subject: "お問い合わせありがとうございます",
                  text: [
                      `${senderName} 様`,
                      "",
                      "お問い合わせありがとうございます。以下の内容で受け付けました。",
                      "",
                      `件名: ${mailSubject}`,
                      "",
                      message,
                      "",
                      "担当者より折り返しご連絡いたしますので、今しばらくお待ちください。",
                  ].join("\n"),
              } satisfies nodemailer.SendMailOptions)
            : null;

        await Promise.all([transporter.sendMail(ownerMail), acknowledgementMail ? transporter.sendMail(acknowledgementMail) : Promise.resolve()]);

        return NextResponse.json({ message: "メールが送信されました。" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "メールの送信中にエラーが発生しました。" },
            { status: 500 }
        );
    }
}

export function GET() {
    return NextResponse.json(
        { error: "POSTメソッドを使用してください。" },
        { status: 405 }
    );
}
