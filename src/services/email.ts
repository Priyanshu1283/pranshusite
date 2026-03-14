import nodemailer from "nodemailer";
import type { ContactPayload } from "@/types/message";

const OWNER_SUBJECT = "New Portfolio Message";
const SITE_URL = process.env.SITE_URL ?? "https://pranshusite.vercel.app";
const OWNER_NAME = process.env.SITE_OWNER_NAME ?? "Priyanshu";

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

/** Shared email wrapper styles */
const emailStyles = {
  wrapper:
    "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #e2e8f0; padding: 32px; max-width: 560px; margin: 0 auto;",
  card:
    "background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%); border: 1px solid rgba(34, 211, 238, 0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);",
  header:
    "background: rgba(34, 211, 238, 0.08); border-bottom: 1px solid rgba(34, 211, 238, 0.2); padding: 24px 28px;",
  title: "font-size: 20px; font-weight: 700; color: #22d3ee; margin: 0; letter-spacing: -0.02em;",
  body: "padding: 28px; line-height: 1.65; font-size: 15px; color: #cbd5e1;",
  label: "font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 6px;",
  value: "color: #e2e8f0; margin-bottom: 16px;",
  messageBox:
    "background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px; margin-top: 8px; color: #94a3b8; font-size: 14px; white-space: pre-wrap;",
  button:
    "display: inline-block; background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); color: #0f172a; font-weight: 600; font-size: 14px; padding: 14px 28px; border-radius: 10px; text-decoration: none; margin-top: 20px; box-shadow: 0 4px 14px rgba(34, 211, 238, 0.4);",
  footer: "padding: 20px 28px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #64748b; text-align: center;",
};

/**
 * Sends a professional notification to the site owner when someone submits the contact form.
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
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background:#0f172a;">
  <div style="${emailStyles.wrapper}">
    <div style="${emailStyles.card}">
      <div style="${emailStyles.header}">
        <h1 style="${emailStyles.title}">📬 New message from your portfolio</h1>
      </div>
      <div style="${emailStyles.body}">
        <div style="${emailStyles.label}">From</div>
        <div style="${emailStyles.value}">${safeName} &lt;${safeEmail}&gt;</div>
        <div style="${emailStyles.label}">Message</div>
        <div style="${emailStyles.messageBox}">${safeMessage}</div>
      </div>
      <div style="${emailStyles.footer}">
        Sent via contact form · ${SITE_URL}
      </div>
    </div>
  </div>
</body>
</html>`;

  const text = `New message from your portfolio\n\nFrom: ${name} <${email}>\n\nMessage:\n${message}\n\n---\n${SITE_URL}`;

  try {
    await transporter.sendMail({
      from: `"${OWNER_NAME} Portfolio" <${process.env.SMTP_USER}>`,
      to: ownerEmail,
      subject: OWNER_SUBJECT,
      text,
      html,
    });
    return { sent: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[email] sendContactNotification failed:", msg);
    return { sent: false, error: msg };
  }
}

/**
 * Sends a professional confirmation email to the user who submitted the contact form.
 * Includes link to visit the portfolio again.
 */
export async function sendConfirmationToUser(
  payload: ContactPayload
): Promise<{ sent: boolean; error?: string }> {
  const transporter = getTransporter();
  if (!transporter) return { sent: false };

  const { name, email } = payload;
  const safeName = escapeHtml(name);

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background:#0f172a;">
  <div style="${emailStyles.wrapper}">
    <div style="${emailStyles.card}">
      <div style="${emailStyles.header}">
        <h1 style="${emailStyles.title}">Thanks for reaching out, ${safeName}</h1>
      </div>
      <div style="${emailStyles.body}">
        <p style="margin:0 0 16px 0;">I've received your message and will get back to you as soon as I can.</p>
        <p style="margin:0 0 24px 0;">In the meantime, feel free to explore more of my work:</p>
        <a href="${SITE_URL}" style="${emailStyles.button}">Visit ${OWNER_NAME}'s portfolio again →</a>
        <p style="margin:24px 0 0 0; font-size:13px; color:#64748b;">${SITE_URL}</p>
      </div>
      <div style="${emailStyles.footer}">
        This is an automated confirmation from ${OWNER_NAME}'s portfolio.
      </div>
    </div>
  </div>
</body>
</html>`;

  const text = `Thanks for reaching out, ${name}!\n\nI've received your message and will get back to you soon.\n\nVisit ${OWNER_NAME}'s portfolio again: ${SITE_URL}\n\n— ${OWNER_NAME}`;

  try {
    await transporter.sendMail({
      from: `"${OWNER_NAME} Portfolio" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Message received — ${OWNER_NAME}`,
      text,
      html,
    });
    return { sent: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[email] sendConfirmationToUser failed:", msg);
    return { sent: false, error: msg };
  }
}
