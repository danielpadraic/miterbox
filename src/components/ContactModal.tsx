"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, X } from "lucide-react";
import {
  inquiryFormSchema,
  type InquiryFormValues,
} from "@/lib/validations";
import { useInquiry } from "@/components/InquiryProvider";

const AUTO_CLOSE_MS = 3200;

export function ContactModal() {
  const { isOpen, closeInquiry } = useInquiry();
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    // Defer focus so the dialog is in the DOM
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeInquiry();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    };
  }, [isOpen, closeInquiry]);

  useEffect(() => {
    if (!isOpen) {
      // Reset after exit animation
      const t = window.setTimeout(() => {
        setStatus("idle");
        setServerError(null);
        reset();
      }, 280);
      return () => window.clearTimeout(t);
    }
  }, [isOpen, reset]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const onSubmit = async (data: InquiryFormValues) => {
    setStatus("idle");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!res.ok) {
        throw new Error(payload?.error ?? "Unable to send message");
      }

      setStatus("success");
      reset();

      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => {
        closeInquiry();
      }, AUTO_CLOSE_MS);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-charcoal/55 backdrop-blur-[3px]"
            onClick={closeInquiry}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={
              reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.98 }
            }
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[92svh] w-full max-w-lg flex-col overflow-hidden rounded-t-md bg-ivory shadow-2xl sm:rounded-sm"
          >
            <div className="flex items-start justify-between gap-4 border-b border-charcoal/8 px-5 py-5 sm:px-7 sm:py-6">
              <div className="pr-2">
                <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-walnut">
                  Inquiry
                </p>
                <h2
                  id={titleId}
                  className="font-serif text-2xl tracking-tight text-charcoal sm:text-[1.75rem]"
                >
                  Start a Conversation
                </h2>
                <p
                  id={descId}
                  className="mt-3 text-sm leading-relaxed text-charcoal/65 sm:text-[0.95rem]"
                >
                  Tell Phil a little about your project. He only takes a limited
                  number of commissions each year, but he’d still love to hear
                  from you.
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={closeInquiry}
                className="shrink-0 rounded-sm p-2 text-charcoal/70 transition-colors hover:bg-charcoal/5 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-walnut"
                aria-label="Close"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
              {status === "success" ? (
                <div
                  role="status"
                  className="flex flex-col items-start gap-3 py-6"
                >
                  <CheckCircle2
                    className="text-walnut"
                    size={28}
                    strokeWidth={1.5}
                  />
                  <p className="font-serif text-2xl text-charcoal">
                    Message sent
                  </p>
                  <p className="text-charcoal/65">
                    Thank you. Phil will review your message and be in touch
                    soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <Field
                    label="Full Name"
                    htmlFor="inquiry-name"
                    error={errors.name?.message}
                    required
                  >
                    <input
                      id="inquiry-name"
                      type="text"
                      autoComplete="name"
                      className="field-input"
                      {...register("name")}
                    />
                  </Field>

                  <Field
                    label="Email"
                    htmlFor="inquiry-email"
                    error={errors.email?.message}
                    required
                  >
                    <input
                      id="inquiry-email"
                      type="email"
                      autoComplete="email"
                      className="field-input"
                      {...register("email")}
                    />
                  </Field>

                  <Field
                    label="Phone"
                    htmlFor="inquiry-phone"
                    error={errors.phone?.message}
                    hint="Optional, but recommended"
                  >
                    <input
                      id="inquiry-phone"
                      type="tel"
                      autoComplete="tel"
                      className="field-input"
                      {...register("phone")}
                    />
                  </Field>

                  <Field
                    label="Project details"
                    htmlFor="inquiry-message"
                    error={errors.message?.message}
                    required
                  >
                    <textarea
                      id="inquiry-message"
                      rows={5}
                      className="field-input min-h-[7.5rem] resize-y"
                      placeholder="A few words about the space, timeline, or materials…"
                      {...register("message")}
                    />
                  </Field>

                  {status === "error" && serverError ? (
                    <p role="alert" className="text-sm text-red-800">
                      {serverError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="animate-spin" size={16} />
                        Sending…
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-charcoal/70"
        >
          {label}
          {required ? (
            <span className="ml-1 text-walnut" aria-hidden>
              *
            </span>
          ) : null}
        </label>
        {hint ? (
          <span className="text-[0.7rem] text-charcoal/45">{hint}</span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p className="mt-1.5 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
