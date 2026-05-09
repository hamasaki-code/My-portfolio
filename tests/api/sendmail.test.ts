import { describe, expect, it } from "vitest";

import { POST } from "../../app/api/sendmail/route";

const createJsonRequest = (body: unknown) =>
  new Request("http://localhost/api/sendmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

describe("POST /api/sendmail", () => {
  it("returns field errors for an empty contact request", async () => {
    const response = await POST(createJsonRequest({}));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.fields).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      content: expect.any(String),
      recaptchaToken: expect.any(String),
    });
  });

  it("rejects an invalid email address before external verification", async () => {
    const response = await POST(
      createJsonRequest({
        name: "Test User",
        email: "not-an-email",
        content: "Please contact me.",
        recaptchaToken: "token",
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.fields).toMatchObject({
      email: expect.any(String),
    });
    expect(payload.fields).not.toHaveProperty("name");
    expect(payload.fields).not.toHaveProperty("content");
    expect(payload.fields).not.toHaveProperty("recaptchaToken");
  });
});
