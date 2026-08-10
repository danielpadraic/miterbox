import { NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";
import {
  contactPayloadSchema,
  normalizeContactPayload,
} from "@/lib/validations";

/**
 * POST /api/contact
 *
 * Sends:
 *  1. A formatted email to miterbox@gmail.com via Resend
 *  2. A short SMS summary to Phil via Twilio
 *
 * Required env vars (add these to `.env.local` — never commit secrets):
 *   RESEND_API_KEY=re_xxxxxxxx
 *   RESEND_FROM_EMAIL="MITERBOX <onboarding@resend.dev>"  // replace with your verified domain later
 *   TWILIO_ACCOUNT_SID=ACxxxxxxxx
 *   TWILIO_AUTH_TOKEN=xxxxxxxx
 *   TWILIO_PHONE_NUMBER=+1XXXXXXXXXX   // Twilio sender number
 *   PHIL_PHONE_NUMBER=+1XXXXXXXXXX     // Phil’s destination mobile
 *
 * Optional:
 *   CONTACT_TO_EMAIL=miterbox@gmail.com
 */
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = contactPayloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form submission", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = normalizeContactPayload(parsed.data);

    const missing = getMissingEnv();
    if (missing.length > 0) {
      console.error(
        "[MITERBOX contact] Missing environment variables:",
        missing.join(", "),
      );
      // In development without keys, still log so local UI testing works
      if (process.env.NODE_ENV === "development") {
        console.log("[MITERBOX contact — dev fallback]", data);
        return NextResponse.json({
          ok: true,
          warning: "Delivered to console only — configure env vars for email/SMS",
        });
      }
      return NextResponse.json(
        {
          error:
            "Messaging is not configured yet. Please try again later or email miterbox@gmail.com.",
        },
        { status: 503 },
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL ?? "miterbox@gmail.com";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? "MITERBOX <onboarding@resend.dev>";

    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email,
      subject: `New Project Inquiry from ${data.name}`,
      text: formatEmailText(data),
      html: formatEmailHtml(data),
    });

    if (emailResult.error) {
      console.error("[MITERBOX contact] Resend error", emailResult.error);
      return NextResponse.json(
        { error: "Unable to send your message right now. Please try again." },
        { status: 502 },
      );
    }

    // SMS is best-effort after email succeeds — don’t fail the inquiry if SMS hiccups
    try {
      const twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
      );

      const snippet =
        data.message.length > 100
          ? `${data.message.slice(0, 100).trim()}…`
          : data.message;

      const smsBody = `New MITERBOX inquiry from ${data.name}: ${snippet} Reply or check email.`;

      await twilioClient.messages.create({
        body: smsBody,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.PHIL_PHONE_NUMBER as string,
      });
    } catch (smsError) {
      console.error("[MITERBOX contact] Twilio SMS error", smsError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[MITERBOX contact] Unexpected error", error);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 },
    );
  }
}

function getMissingEnv() {
  const required = [
    "RESEND_API_KEY",
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_PHONE_NUMBER",
    "PHIL_PHONE_NUMBER",
  ] as const;

  return required.filter((key) => !process.env[key]?.trim());
}

type Normalized = ReturnType<typeof normalizeContactPayload>;

function formatEmailText(data: Normalized) {
  const lines = [
    "New project inquiry from the MITERBOX website",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
  ];

  if (data.projectType) lines.push(`Project type: ${data.projectType}`);
  if (data.location) lines.push(`Location: ${data.location}`);

  lines.push("", "Message:", data.message, "", "—", "Sent via miterbox.com contact form");

  return lines.join("\n");
}

function formatEmailHtml(data: Normalized) {
  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:8px 0;color:#8B7355;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:8px 0;color:#1C1C1A;font-size:15px;">${escapeHtml(value)}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#F9F7F4;font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:560px;margin:32px auto;padding:32px;background:#fff;border:1px solid #e8e2d9;">
      <p style="margin:0 0 8px;color:#8B7355;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:system-ui,sans-serif;">MITERBOX</p>
      <h1 style="margin:0 0 24px;font-size:24px;font-weight:400;color:#1C1C1A;">New Project Inquiry</h1>
      <table style="width:100%;border-collapse:collapse;font-family:system-ui,-apple-system,sans-serif;">
        ${row("Name", data.name)}
        ${row("Email", data.email)}
        ${row("Phone", data.phone || "Not provided")}
        ${data.projectType ? row("Project type", data.projectType) : ""}
        ${data.location ? row("Location", data.location) : ""}
      </table>
      <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e8e2d9;">
        <p style="margin:0 0 8px;color:#8B7355;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-family:system-ui,sans-serif;">Message</p>
        <p style="margin:0;color:#1C1C1A;font-size:15px;line-height:1.6;white-space:pre-wrap;font-family:system-ui,-apple-system,sans-serif;">${escapeHtml(data.message)}</p>
      </div>
    </div>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
