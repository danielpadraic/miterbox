import { z } from "zod";

/**
 * Modal / floating CTA inquiry form — intentionally simple.
 */
export const inquiryFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "A short note helps — at least a sentence")
    .max(2000, "Please keep the message under 2000 characters"),
});

export type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

/**
 * Full page contact section — richer fields for builders / homeowners.
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(7, "Please enter a phone number")
    .max(30, "Phone number is too long"),
  projectType: z.enum(["Kitchen", "Built-ins", "Bunk beds", "Other"], {
    message: "Please select a project type",
  }),
  location: z.string().min(2, "Please enter a city"),
  description: z
    .string()
    .min(20, "A brief description helps — at least a sentence or two")
    .max(2000, "Please keep the description under 2000 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Server-side payload accepted by /api/contact.
 * Normalizes both the modal inquiry and the page contact form.
 */
export const contactPayloadSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().max(30).optional().or(z.literal("")),
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

export type ContactPayload = z.infer<typeof contactPayloadSchema>;

/** Shape posted to the Zapier webhook (exact field names). */
export function normalizeContactPayload(data: ContactPayload) {
  const message = (data.message ?? data.description ?? "").trim();
  return {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone?.trim() || "",
    projectType: data.projectType ?? "",
    location: data.location?.trim() || "",
    message,
  };
}
