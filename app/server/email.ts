import nodemailer from "nodemailer";

export type EmailData = {
    from: string;
    subject: string;
    message: string;
};

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
    if (cachedTransporter) {
        return cachedTransporter;
    }

    const user = process.env.AUTH_USER;
    const pass = process.env.AUTH_PASS;

    if (!user || !pass) {
        throw new Error("Email authentication environment variables are not configured.");
    }

    cachedTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST ?? "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT ?? 465),
        secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
        auth: {
            user,
            pass,
        },
    });

    return cachedTransporter;
}

export async function sendEmail({ subject, from, message }: EmailData) {
    const transporter = getTransporter();
    const to = process.env.AUTH_USER;

    if (!to) {
        throw new Error("Email recipient is not configured.");
    }

    const mailData = {
        to,
        subject: `[PORTFOLIO] ${subject}`,
        from,
        replyTo: from,
        text: `${message}\n\n送信元: ${from}`,
        html: `
    <h1>${subject}</h1>
    <div>${message.replace(/\n/g, "<br/>")}</div>
    <br/>
    <p>送信元: ${from}</p>`.
            trim(),
    };

    return transporter.sendMail(mailData);
}

