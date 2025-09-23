import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name, email, subject, content } = (await request.json()) as {
            name?: string;
            email?: string;
            subject?: string;
            content?: string;
        };

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_ACCOUNT,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_ACCOUNT,
            to: email,
            subject: subject,
            text: `${name}様\n\nお問い合わせありがとうございました。\n\n返信までしばらくお待ちください。\n\nお問い合わせ内容\n\n${content}`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);

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
