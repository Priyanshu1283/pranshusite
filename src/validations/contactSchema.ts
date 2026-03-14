import type { ContactPayload, ContactValidationResult } from "@/types/message";

const NAME_MIN = 2;
const NAME_MAX = 100;
const EMAIL_MAX = 254;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(str: string, maxLen: number): string {
  return str.trim().slice(0, maxLen);
}

/**
 * Validates and sanitizes contact form input.
 * Returns either validated payload or a single error (first failure).
 */
export function validateContactPayload(body: unknown): ContactValidationResult {
  if (body === null || typeof body !== "object") {
    return { success: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;
  const rawName = typeof raw.name === "string" ? raw.name : "";
  const rawEmail = typeof raw.email === "string" ? raw.email : "";
  const rawMessage = typeof raw.message === "string" ? raw.message : "";

  const name = sanitize(rawName, NAME_MAX);
  const email = sanitize(rawEmail, EMAIL_MAX).toLowerCase();
  const message = sanitize(rawMessage, MESSAGE_MAX);

  if (!name || name.length < NAME_MIN) {
    return {
      success: false,
      error: "Name must be at least 2 characters.",
      field: "name",
    };
  }

  if (!EMAIL_REGEX.test(email) || email.length > EMAIL_MAX) {
    return {
      success: false,
      error: "Please provide a valid email address.",
      field: "email",
    };
  }

  if (!message || message.length < MESSAGE_MIN) {
    return {
      success: false,
      error: "Message must be at least 10 characters.",
      field: "message",
    };
  }

  const data: ContactPayload = { name, email, message };
  return { success: true, data };
}

/**
 * Client-side validation for immediate feedback (same rules as server).
 */
export function getClientValidationErrors(
  name: string,
  email: string,
  message: string
): Record<string, string> {
  const errors: Record<string, string> = {};
  const n = name.trim();
  const e = email.trim().toLowerCase();
  const m = message.trim();

  if (!n) errors.name = "Name is required.";
  else if (n.length < NAME_MIN) errors.name = "Name must be at least 2 characters.";

  if (!e) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(e)) errors.email = "Please enter a valid email.";

  if (!m) errors.message = "Message is required.";
  else if (m.length < MESSAGE_MIN) errors.message = "Message must be at least 10 characters.";

  return errors;
}
