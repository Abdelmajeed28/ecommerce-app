import { Resend } from "resend";

export const sendResetPasswordEmail = async (toEmail, resetUrl) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "onboarding@resend.dev", //العنوان الافتراضي بتاع Resend للحسابات الغير موثقة بدومين
    to: toEmail,
    subject: "Reset Your Password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password. Click the button below to set a new one. This link will expire in 15 minutes.</p>
        <a href="${resetUrl}" style="display:inline-block; padding: 12px 24px; background:#2563EB; color:#fff; text-decoration:none; border-radius:8px; margin-top:12px;">
          Reset Password
        </a>
        <p style="margin-top:16px; color:#6b7280; font-size:13px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
};
