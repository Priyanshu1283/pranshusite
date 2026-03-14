import { NextRequest, NextResponse } from "next/server";
import { validateContactPayload } from "@/validations/contactSchema";
import { getClientIp, rateLimit } from "@/utils/rateLimiter";
import { createMessage } from "@/services/messageService";
import { sendContactNotification, sendConfirmationToUser } from "@/services/email";

/**
 * POST /api/contact
 * Validates input, persists to MongoDB, sends email notification.
 * Lightweight handler — business logic lives in services.
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const validation = validateContactPayload(body);
  if (!validation.success) {
    return NextResponse.json(
      { success: false, error: validation.error },
      { status: 400 }
    );
  }

  const { data } = validation;

  try {
    await createMessage(data);
    await sendContactNotification(data);
    await sendConfirmationToUser(data);
    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (err) {
    console.error("[api/contact] Error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
