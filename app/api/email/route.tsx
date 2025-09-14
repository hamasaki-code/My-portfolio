import { NextResponse } from "next/server"
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    try {
        const { email, message } = await req.json()

        if (!email || !message) {
            return NextResponse.json(
                { success: false, message: "All fields are required." },
                { status: 400 }
            )
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
            text: `
                From: ${email}
                Message: ${message}
            `
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
