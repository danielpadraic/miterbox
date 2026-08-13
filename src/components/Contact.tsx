"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { trackAdsConversion } from "@/lib/gtag";
import { formatPhoneUS } from "@/lib/phone";
import {
  contactFormSchema,
  type ContactFormParsed,
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
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues, unknown, ContactFormParsed>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: undefined,
      location: "",
      description: "",
    },
  });

  const phoneField = register("phone");
  const phoneValue = watch("phone");

  const onSubmit = async (data: ContactFormParsed) => {
    setStatus("idle");
    setServerError(null);

    try {
      // Same /api/contact route as the floating modal → Zapier webhook.
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

      trackAdsConversion();
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
      className="scroll-mt-24 border-t border-charcoal/8 bg-[#F3EFE9]/60 px-5 py-16 pb-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12 lg:gap-12">
        <FadeIn className="lg:col-span-5">
          <SectionHeading
            id="contact-heading"
            eyebrow="Inquiries"
            title="Begin a conversation"
            description="I only take on a few projects each year. Tell me about yours."
          />
          <p className="type-prose mt-5 text-sm text-charcoal/60 sm:mt-6">
            Based in Nampa, Idaho
            <span className="mx-2 text-walnut">•</span>
            Serving the Treasure Valley
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
                <p className="font-serif text-2xl leading-snug tracking-tight text-charcoal">
                  Thank you — message received
                </p>
                <p className="type-prose mt-2 text-charcoal/65">
                  I appreciate you reaching out. I&apos;ll review your note
                  carefully and follow up if the project looks like a good fit.
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
              className="contact-form"
              noValidate
            >
              <div className="contact-form__row">
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
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={
                      errors.name ? "name-error" : undefined
                    }
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
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={
                      errors.email ? "email-error" : undefined
                    }
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
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="(208) 555-1234"
                    maxLength={14}
                    className="field-input"
                    name={phoneField.name}
                    ref={phoneField.ref}
                    value={phoneValue ?? ""}
                    onChange={(e) => {
                      setValue("phone", formatPhoneUS(e.target.value), {
                        shouldValidate: errors.phone != null,
                        shouldDirty: true,
                      });
                    }}
                    onBlur={(e) => {
                      setValue("phone", formatPhoneUS(e.target.value), {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      phoneField.onBlur(e);
                    }}
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={
                      errors.phone ? "phone-error" : undefined
                    }
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
                    aria-invalid={errors.projectType ? true : undefined}
                    aria-describedby={
                      errors.projectType ? "projectType-error" : undefined
                    }
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
                  aria-invalid={errors.location ? true : undefined}
                  aria-describedby={
                    errors.location ? "location-error" : undefined
                  }
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
                  className="field-input min-h-[8rem] resize-y"
                  placeholder="Timeline, materials, and anything that matters about the space…"
                  {...register("description")}
                  aria-invalid={errors.description ? true : undefined}
                  aria-describedby={
                    errors.description ? "description-error" : undefined
                  }
                />
              </Field>

              {status === "error" && serverError ? (
                <p role="alert" className="field-error">
                  {serverError}
                </p>
              ) : null}

              <div className="contact-form__actions">
                <button
                  type="submit"
                  className="btn-primary contact-form__submit w-full sm:w-auto"
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
              </div>
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
    <div className="contact-field">
      <label htmlFor={htmlFor} className="type-label text-charcoal/70">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
