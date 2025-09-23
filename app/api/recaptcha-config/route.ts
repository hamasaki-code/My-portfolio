import { NextResponse } from "next/server"

import { createRecaptchaConfig } from "@/lib/recaptcha"

export async function GET() {
    const config = createRecaptchaConfig({
        siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        size: process.env.NEXT_PUBLIC_RECAPTCHA_SIZE,
        badge: process.env.NEXT_PUBLIC_RECAPTCHA_BADGE,
    })

    return NextResponse.json(config, {
        headers: {
            "Cache-Control": "no-store",
        },
    })
}
