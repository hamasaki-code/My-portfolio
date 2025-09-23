import type { EmailData } from "@/app/server/email";

export async function sendContactEmail(email: EmailData) {
    const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(email),
        headers: {
            "Content-Type": "application/json",
        },
    });

    let data: unknown = null;
    try {
        data = await res.json();
    } catch (error) {
        console.error("Failed to parse response from /api/contact", error);
    }

    if (!res.ok) {
        const message =
            data && typeof data === "object" && "message" in data && typeof data.message === "string"
                ? data.message
                : "メール転送失敗";
        throw new Error(message);
    }

    return data as { message?: string } | null;
}

