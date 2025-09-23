import { NextResponse } from "next/server"
import nodemailer from 'nodemailer'

const rateLimitMap = new Map<string, number>()

export async function POST(req: Request) {
    try {
        const { name, email, message, captcha } = await req.json()
        const captchaSecret = process.env.RECAPTCHA_SECRET_KEY
        const captchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

        if (!captchaSecret || !captchaSiteKey) {
            console.error(
                "reCAPTCHA environment variables are not fully configured. Ensure both NEXT_PUBLIC_RECAPTCHA_SITE_KEY and RECAPTCHA_SECRET_KEY are set."
            )
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "reCAPTCHA is not configured correctly. Please contact the site administrator.",
                },
                { status: 500 }
            )
        }

        const requireCaptcha = true

        if (!name || !email || !message || (requireCaptcha && !captcha)) {
            return NextResponse.json(
                { success: false, message: "All fields are required." },
                { status: 400 }
            )
        }

        const ip = req.headers.get('x-forwarded-for') || 'unknown'
        const now = Date.now()
        const last = rateLimitMap.get(ip) || 0
        if (now - last < 60_000) {
            return NextResponse.json(
                { success: false, message: "Too many requests. Please try again later." },
                { status: 429 }
            )
        }
        rateLimitMap.set(ip, now)

        if (requireCaptcha) {
            const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `secret=${captchaSecret}&response=${captcha}`,
            })
            const captchaData = await captchaRes.json()
            if (!captchaData.success) {
                const errorCodes: unknown = captchaData["error-codes"]
                const reportedHostname = typeof captchaData.hostname === "string" ? captchaData.hostname : null
                const requestHostHeader = req.headers.get("host")
                const expectedHostname = requestHostHeader ? requestHostHeader.split(":")[0] : null
                let message = "Captcha verification failed."

                if (reportedHostname && expectedHostname && reportedHostname !== expectedHostname) {
                    message = `Captcha verification failed because the token was issued for "${reportedHostname}" but the current domain is "${expectedHostname}". Update the reCAPTCHA allowed domains or use the correct site key.`
                } else if (Array.isArray(errorCodes) && errorCodes.length > 0) {
                    message = `Captcha verification failed (${errorCodes.join(", ")}).`
                }

                console.error("reCAPTCHA verification failed", {
                    errorCodes,
                    reportedHostname,
                    expectedHostname,
                })

                return NextResponse.json(
                    { success: false, message },
                    { status: 400 }
                )
            }
        }

        // メール送信の設定を修正
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false // 自己署名証明書を許可
            }
        })

        // メール送信
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL,
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        })

        return NextResponse.json(
            { success: true, message: "Message sent successfully!" },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error in /api/email:", error)
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
