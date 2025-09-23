export type RecaptchaSize = "compact" | "normal" | "invisible"

export type RecaptchaBadge = "bottomright" | "bottomleft" | "inline"

export interface RecaptchaConfig {
    siteKey: string | null
    size: RecaptchaSize
    badge?: RecaptchaBadge
}

export const sanitizeRecaptchaSiteKey = (value: unknown): string | null => {
    if (typeof value !== "string") {
        return null
    }

    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
}

export const parseRecaptchaSize = (value: unknown): RecaptchaSize => {
    return value === "compact" || value === "invisible" ? value : "normal"
}

export const parseRecaptchaBadge = (value: unknown): RecaptchaBadge | undefined => {
    if (value === "bottomleft" || value === "inline") {
        return value
    }

    return value === "bottomright" ? "bottomright" : undefined
}

export const createRecaptchaConfig = (input?: {
    siteKey?: unknown
    size?: unknown
    badge?: unknown
}): RecaptchaConfig => {
    return {
        siteKey: sanitizeRecaptchaSiteKey(input?.siteKey ?? null),
        size: parseRecaptchaSize(input?.size),
        badge: parseRecaptchaBadge(input?.badge),
    }
}
