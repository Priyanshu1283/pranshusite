import nodemailer from "nodemailer";
import type { ContactPayload } from "@/types/message";

const SUBJECT = "New Portfolio Message";

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Sends a contact form notification to the site owner.
 * Resolves successfully even when SMTP is not configured (no-op).
 */
export async function sendContactNotification(
  payload: ContactPayload
): Promise<{ sent: boolean; error?: string }> {
  const ownerEmail = process.env.CONTACT_OWNER_EMAIL;
  const transporter = getTransporter();

  if (!ownerEmail || !transporter) {
    return { sent: false };
  }

  const { name, email, message } = payload;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to: ownerEmail,
      subject: SUBJECT,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p><pre>${safeMessage}</pre>`,
    });
    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[email] sendContactNotification failed:", message);
    return { sent: false, error: message };
  }
}
