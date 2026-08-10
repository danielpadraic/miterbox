import { z } from "zod";
import { digitsOnlyPhone, toFormattedPhoneUS } from "@/lib/phone";

const EMAIL_MESSAGE = "Please enter a valid email address";

/**
 * Zod email (requires domain + alphabetic TLD ≥2 chars) plus length guards.
 * Format-only — no third-party mailbox verification.
 */
export const emailSchema = z
  .string()
  .trim()
  .min(1, EMAIL_MESSAGE)
  .max(254, EMAIL_MESSAGE)
  .email(EMAIL_MESSAGE)
  .refine((value) => {
    const at = value.lastIndexOf("@");
    const local = value.slice(0, at);
    const domain = value.slice(at + 1);
    return (
      local.length > 0 &&
      local.length <= 64 &&
      domain.includes(".") &&
      /^[a-zA-Z]{2,63}$/.test(domain.split(".").pop() ?? "")
    );
  }, EMAIL_MESSAGE);const PHONE_REQUIRED_MESSAGE = "Please enter a 10-digit phone number";
const PHONE_INVALID_MESSAGE = "Please enter a valid 10-digit phone number";

/** Required US phone — accepts formatted or digits; normalizes to `(XXX) XXX-XXXX`. */
export const phoneRequiredSchema = z
  .string()
  .trim()
  .min(1, PHONE_REQUIRED_MESSAGE)
  .transform((value) => digitsOnlyPhone(value))
  .refine((digits) => digits.length === 10, PHONE_INVALID_MESSAGE)
  .transform((digits) => toFormattedPhoneUS(digits));

/** Optional US phone — empty/undefined stays empty; otherwise must be 10 digits. */
export const phoneOptionalSchema = z
  .union([z.string(), z.undefined()])
  .transform((value) => {
    const digits = digitsOnlyPhone(value ?? "");
    return digits.length === 0 ? "" : digits;
  })
  .refine(
    (digits) => digits === "" || digits.length === 10,
    PHONE_INVALID_MESSAGE,
  )
  .transform((digits) => (digits === "" ? "" : toFormattedPhoneUS(digits)));

/**
 * Modal / floating CTA inquiry form — intentionally simple.
 */
export const inquiryFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: emailSchema,
  phone: phoneOptionalSchema,
  message: z
    .string()
    .min(10, "A short note helps — at least a sentence")
    .max(2000, "Please keep the message under 2000 characters"),
});

export type InquiryFormValues = z.input<typeof inquiryFormSchema>;
export type InquiryFormParsed = z.output<typeof inquiryFormSchema>;

/**
 * Full page contact section — richer fields for builders / homeowners.
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: emailSchema,
  phone: phoneRequiredSchema,
  projectType: z.enum(["Kitchen", "Built-ins", "Bunk beds", "Other"], {
    message: "Please select a project type",
  }),
  location: z.string().min(2, "Please enter a city"),
  description: z
    .string()
    .min(20, "A brief description helps — at least a sentence or two")
    .max(2000, "Please keep the description under 2000 characters"),
});

export type ContactFormValues = z.input<typeof contactFormSchema>;
export type ContactFormParsed = z.output<typeof contactFormSchema>;

/**
 * Server-side payload accepted by /api/contact.
 * Normalizes both the modal inquiry and the page contact form.
 */
export const contactPayloadSchema = z
  .object({
    name: z.string().min(2),
    email: emailSchema,
    phone: phoneOptionalSchema,
    message: z.string().min(10).max(2000).optional(),
    description: z.string().min(10).max(2000).optional(),
    projectType: z
      .enum(["Kitchen", "Built-ins", "Bunk beds", "Other"])
      .optional(),
    location: z.string().optional(),
  })
  .refine((data) => Boolean(data.message?.trim() || data.description?.trim()), {
    message: "A project message is required",
    path: ["message"],
  });

export type ContactPayload = z.output<typeof contactPayloadSchema>;

/** Shape posted to the Zapier webhook (exact field names). */
export function normalizeContactPayload(data: ContactPayload) {
  const message = (data.message ?? data.description ?? "").trim();
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone || "",
    projectType: data.projectType ?? "",
    location: data.location?.trim() || "",
    message,
  };
}
