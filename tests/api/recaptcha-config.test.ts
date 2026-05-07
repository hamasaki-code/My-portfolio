import { afterEach, describe, expect, it } from "vitest";

import { GET } from "../../app/api/recaptcha-config/route";

const ORIGINAL_ENV = {
  NEXT_PUBLIC_RECAPTCHA_BADGE: process.env.NEXT_PUBLIC_RECAPTCHA_BADGE,
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  NEXT_PUBLIC_RECAPTCHA_SIZE: process.env.NEXT_PUBLIC_RECAPTCHA_SIZE,
};

const restoreEnvValue = (key: keyof typeof ORIGINAL_ENV) => {
  const value = ORIGINAL_ENV[key];

  if (value === undefined) {
    delete process.env[key];
    return;
  }

  process.env[key] = value;
};

describe("GET /api/recaptcha-config", () => {
  afterEach(() => {
    restoreEnvValue("NEXT_PUBLIC_RECAPTCHA_BADGE");
    restoreEnvValue("NEXT_PUBLIC_RECAPTCHA_SITE_KEY");
    restoreEnvValue("NEXT_PUBLIC_RECAPTCHA_SIZE");
  });

  it("returns normalized public reCAPTCHA settings without caching", async () => {
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = "  site-key  ";
    process.env.NEXT_PUBLIC_RECAPTCHA_SIZE = "invisible";
    process.env.NEXT_PUBLIC_RECAPTCHA_BADGE = "inline";

    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(payload).toEqual({
      siteKey: "site-key",
      size: "invisible",
      badge: "inline",
    });
  });

  it("falls back to safe defaults for missing or unsupported values", async () => {
    delete process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    process.env.NEXT_PUBLIC_RECAPTCHA_SIZE = "large";
    process.env.NEXT_PUBLIC_RECAPTCHA_BADGE = "top";

    const response = await GET();
    const payload = await response.json();

    expect(payload).toEqual({
      siteKey: null,
      size: "normal",
    });
  });
});
