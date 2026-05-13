import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  service?: string;
}) {
  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "hello@thunderhouse.io",
    to: process.env.RESEND_FROM_EMAIL ?? "hello@thunderhouse.io",
    subject: `New Contact from ${data.name}`,
    text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone ?? "—"}
Company: ${data.company ?? "—"}
Service Interest: ${data.service ?? "—"}

Message:
${data.message}
    `.trim(),
  });
}
