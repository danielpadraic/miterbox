"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";

const projectTypes = ["Kitchen", "Built-ins", "Bunk beds", "Other"] as const;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: undefined,
      location: "",
      description: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("idle");
    setServerError(null);

    try {
      /**
       * Same /api/contact route as the floating modal.
       * Delivers email (Resend) + SMS (Twilio) when env vars are set —
       * see `.env.example` for RESEND_* and TWILIO_* keys.
       */
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error ?? "Unable to send message");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 border-t border-charcoal/8 bg-[#F3EFE9]/60 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-5">
          <SectionHeading
            id="contact-heading"
            eyebrow="Inquiries"
            title="Begin a conversation"
            description="I accept a very limited number of projects each year. Tell me about your project."
          />
          <p className="mt-8 text-sm leading-relaxed text-charcoal/60">
            Based in Nampa, Idaho
            <span className="mx-2 text-walnut">•</span>
            Serving Ada &amp; Canyon Counties
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:col-span-7">
          {status === "success" ? (
            <div
              role="status"
              className="flex flex-col items-start gap-4 border border-charcoal/10 bg-ivory px-6 py-10 sm:px-8"
            >
              <CheckCircle2 className="text-walnut" size={28} strokeWidth={1.5} />
              <div>
                <p className="font-serif text-2xl text-charcoal">Message received</p>
                <p className="mt-2 text-charcoal/65">
                  Thank you. I will review your note and respond if the project
                  looks like a fit.
                </p>
              </div>
              <button
                type="button"
                className="btn-secondary mt-2"
                onClick={() => setStatus("idle")}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Name"
                  error={errors.name?.message}
                  htmlFor="name"
                >
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    className="field-input"
                    {...register("name")}
                  />
                </Field>

                <Field
                  label="Email"
                  error={errors.email?.message}
                  htmlFor="email"
                >
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="field-input"
                    {...register("email")}
                  />
                </Field>

                <Field
                  label="Phone"
                  error={errors.phone?.message}
                  htmlFor="phone"
                >
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className="field-input"
                    {...register("phone")}
                  />
                </Field>

                <Field
                  label="Project type"
                  error={errors.projectType?.message}
                  htmlFor="projectType"
                >
                  <select
                    id="projectType"
                    className="field-input field-select"
                    defaultValue=""
                    {...register("projectType")}
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field
                label="Location (city)"
                error={errors.location?.message}
                htmlFor="location"
              >
                <input
                  id="location"
                  type="text"
                  autoComplete="address-level2"
                  className="field-input"
                  placeholder="e.g. Eagle"
                  {...register("location")}
                />
              </Field>

              <Field
                label="Brief project description"
                error={errors.description?.message}
                htmlFor="description"
              >
                <textarea
                  id="description"
                  rows={5}
                  className="field-input resize-y min-h-[8rem]"
                  placeholder="Timeline, materials, and anything that matters about the space…"
                  {...register("description")}
                />
              </Field>

              {status === "error" && serverError ? (
                <p role="alert" className="text-sm text-red-800">
                  {serverError}
                </p>
              ) : null}

              <button
                type="submit"
                className="btn-primary w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    Sending…
                  </span>
                ) : (
                  "Submit inquiry"
                )}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-charcoal/70"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
