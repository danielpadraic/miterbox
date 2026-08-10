import { NextResponse } from "next/server";
import {
  contactPayloadSchema,
  normalizeContactPayload,
} from "@/lib/validations";

/**
 * POST /api/contact
 *
 * Forwards validated inquiry data to a Zapier webhook as JSON.
 *
 * Required env vars (add to `.env.local` — never commit secrets):
 *   ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
 *
 * Payload fields: name, email, phone, projectType, location, message
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
    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL?.trim();

    if (!webhookUrl) {
      console.error(
        "[MITERBOX contact] Missing environment variable: ZAPIER_WEBHOOK_URL",
      );
      if (process.env.NODE_ENV === "development") {
        console.log("[MITERBOX contact — would send to Zapier]", data);
      }
      return NextResponse.json(
        {
          error:
            "Contact form is not configured. Please try again later or email miterbox@gmail.com.",
        },
        { status: 503 },
      );
    }

    const zapierRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!zapierRes.ok) {
      const detail = await zapierRes.text().catch(() => "");
      console.error(
        "[MITERBOX contact] Zapier webhook error",
        zapierRes.status,
        detail,
      );
      return NextResponse.json(
        { error: "Unable to send your message right now. Please try again." },
        { status: 502 },
      );
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
