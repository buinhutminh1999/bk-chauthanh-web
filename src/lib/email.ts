import nodemailer from "nodemailer";
import type { ContactFormInput } from "./contact-schema";

function getSmtpConfig() {
  const user = process.env.GMAIL_SMTP_USER ?? process.env.SMTP_USER;
  const pass = process.env.GMAIL_SMTP_APP_PASSWORD ?? process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = process.env.SMTP_SECURE !== "false";

  if (!user || !pass) {
    return null;
  }

  return { user, pass, host, port, secure };
}

export function isEmailConfigured(): boolean {
  return getSmtpConfig() !== null;
}

export async function sendContactEmail(data: ContactFormInput) {
  const smtp = getSmtpConfig();
  if (!smtp) {
    throw new Error(
      "Chưa cấu hình email. Thêm GMAIL_SMTP_USER và GMAIL_SMTP_APP_PASSWORD vào .env.local",
    );
  }

  const to =
    process.env.CONTACT_TO_EMAIL ?? process.env.GMAIL_SMTP_USER ?? smtp.user;
  const siteName = "Bách Khoa Châu Thành";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
  });

  const html = `
    <h2>Yêu cầu liên hệ từ website ${siteName}</h2>
    <p><strong>Họ tên:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Điện thoại:</strong> ${escapeHtml(data.phone)}</p>
    ${data.email ? `<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>` : ""}
    ${data.product ? `<p><strong>Sản phẩm:</strong> ${escapeHtml(data.product)}</p>` : ""}
    <p><strong>Nội dung:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
    <hr>
    <p style="color:#666;font-size:12px">Gửi từ ${escapeHtml(siteUrl)}</p>
  `;

  const text = [
    `Yêu cầu liên hệ từ website ${siteName}`,
    `Họ tên: ${data.name}`,
    `Điện thoại: ${data.phone}`,
    data.email ? `Email: ${data.email}` : "",
    data.product ? `Sản phẩm: ${data.product}` : "",
    `Nội dung: ${data.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  await transporter.sendMail({
    from: `"Website ${siteName}" <${smtp.user}>`,
    to,
    replyTo: data.email || undefined,
    subject: `[Liên hệ] ${data.name} — ${data.phone}`,
    text,
    html,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
