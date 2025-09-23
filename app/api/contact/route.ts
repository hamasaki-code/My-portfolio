import { sendEmail, type EmailData } from "@/app/server/email";
import { ValidationError, object, string } from "yup";

const bodySchema = object({
    from: string().email().required(),
    subject: string().required(),
    message: string().required(),
});

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as unknown;
        const data = (await bodySchema.validate(body, { abortEarly: false })) as EmailData;

        await sendEmail(data);

        return new Response(JSON.stringify({ message: "メール転送成功" }), {
            status: 200,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return new Response(JSON.stringify({ message: "メール転送失敗" }), {
                status: 400,
            });
        }

        console.error(error);
        return new Response(JSON.stringify({ message: "メール転送失敗" }), {
            status: 500,
        });
    }
}

