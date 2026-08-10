import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Site-visit enquiry capture.
 *
 * The contact form previously flipped a local `sent` boolean and posted
 * nowhere, so every enquiry submitted on the live site was lost silently. This
 * forwards the enquiry server-side to whatever endpoint the client configures.
 *
 * Set CONTACT_WEBHOOK_URL in the deployment environment. It accepts any service
 * that takes a JSON POST — Formspree, a CRM webhook, a serverless mailer.
 * Until it is set the handler fails loudly rather than reporting a false
 * success, and the form falls back to the phone and email on screen.
 */
const EnquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  phone: z.string().trim().min(6, "Phone is required").max(32),
  email: z.string().trim().email("Enter a valid email").max(200),
  message: z.string().trim().max(2000).optional(),
});

export type Enquiry = z.infer<typeof EnquirySchema>;

export class EnquiryNotConfiguredError extends Error {
  constructor() {
    super("CONTACT_WEBHOOK_URL is not configured");
    this.name = "EnquiryNotConfiguredError";
  }
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => EnquirySchema.parse(data))
  .handler(async ({ data }) => {
    const endpoint = process.env["CONTACT_WEBHOOK_URL"];

    if (!endpoint) {
      // Surfaced in the server log so an unconfigured deploy is noticed rather
      // than quietly dropping leads.
      console.error(
        "[enquiry] CONTACT_WEBHOOK_URL is not set — enquiry not delivered:",
        JSON.stringify({ ...data, receivedAt: new Date().toISOString() }),
      );
      throw new EnquiryNotConfiguredError();
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        source: "mandhara.website.contact",
        receivedAt: new Date().toISOString(),
        ...data,
      }),
    });

    if (!response.ok) {
      console.error(
        `[enquiry] endpoint returned ${response.status}:`,
        await response.text().catch(() => ""),
      );
      throw new Error(`Enquiry endpoint returned ${response.status}`);
    }

    return { ok: true as const };
  });
