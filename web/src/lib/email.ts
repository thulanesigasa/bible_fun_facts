import { Resend } from "resend";

export interface WaitlistEmailOptions {
  subscriberEmail: string;
  resendApiKey?: string;
  fromEmail?: string;
  adminNotifyEmail?: string;
  appName?: string;
  fetcher?: typeof fetch;
}

export interface WaitlistEmailResult {
  subscriberEmailSent: boolean;
  adminNotificationSent: boolean;
  errors?: string[];
}

/**
 * Sends a welcome confirmation email to the subscriber and notifies the team.
 * Domain: exégeomai.co.za (Punycode: xn--exgeomai-c1a.co.za or configured from address)
 * Free tier: Resend offers 3,000 emails/month free.
 */
export async function sendWaitlistEmails(
  options: WaitlistEmailOptions,
): Promise<WaitlistEmailResult> {
  const {
    subscriberEmail,
    resendApiKey = process.env.RESEND_API_KEY,
    fromEmail = process.env.RESEND_FROM_EMAIL || "exégeomai <noreply@exegeomai.co.za>",
    adminNotifyEmail = process.env.RESEND_ADMIN_EMAIL || "joinus@exegeomai.co.za",
    appName = "exégeomai",
  } = options;

  if (!resendApiKey) {
    // If Resend API key is not yet configured, return gracefully without failing waitlist registration
    return {
      subscriberEmailSent: false,
      adminNotificationSent: false,
      errors: ["RESEND_API_KEY is not configured"],
    };
  }

  const resend = new Resend(resendApiKey);
  const errors: string[] = [];
  let subscriberSent = false;
  let adminSent = false;

  // 1. Send confirmation to the subscriber
  try {
    const confirmationHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Welcome to the ${appName} Family</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 24px; color: #0F172A; }
    .container { max-width: 580px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; padding: 36px 32px; border: 1px solid rgba(15, 23, 42, 0.08); }
    .badge { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #B45309; background-color: #FEF3C7; padding: 4px 10px; border-radius: 9999px; margin-bottom: 20px; }
    h1 { font-size: 24px; font-weight: 800; color: #0F172A; margin: 0 0 16px; line-height: 1.25; }
    p { font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 16px; }
    .highlight-card { background: #FFFBEB; border-left: 4px solid #FDD223; padding: 16px 20px; border-radius: 8px; margin: 24px 0; }
    .highlight-card p { margin: 0; color: #78350F; font-size: 14px; line-height: 1.5; font-weight: 500; }
    .footer { font-size: 12px; color: #94A3B8; text-align: center; margin-top: 32px; border-top: 1px solid #E2E8F0; padding-top: 20px; }
    .footer a { color: #64748B; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">Waitlist Confirmed</span>
    <h1>Welcome to the ${appName} family!</h1>
    <p>Hi there,</p>
    <p>We are delighted to confirm that we have received your request to join the <strong>${appName}</strong> waiting list.</p>
    <p>Scripture has depths, and you are now officially at the forefront of uncovering them with us.</p>
    
    <div class="highlight-card">
      <p>We are putting the finishing touches on our interactive Biblical Greek and Hebrew study tools, daily streaks, and scripture discoveries. We will notify you here the moment the app goes live!</p>
    </div>

    <p>Thank you for embarking on this journey with us.</p>
    <p>Warm regards,<br><strong>The ${appName} Team</strong></p>

    <div class="footer">
      <p>You received this email because you signed up for early access at exegeomai.co.za.</p>
      <p>To unsubscribe or remove your email, reply to this email or contact joinus@exegeomai.co.za with subject "Unsubscribe from waitlist".</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    const subscriberRes = await resend.emails.send({
      from: fromEmail,
      to: [subscriberEmail],
      subject: `Welcome to the ${appName} family - You're on the list!`,
      html: confirmationHtml,
    });

    if (subscriberRes.error) {
      errors.push(`Subscriber email error: ${subscriberRes.error.message}`);
    } else {
      subscriberSent = true;
    }
  } catch (err: any) {
    errors.push(`Subscriber send exception: ${err?.message || String(err)}`);
  }

  // 2. Send notification to the internal team (joinus@exégeomai.co.za)
  try {
    const adminNotificationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Waitlist Sign-up</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; color: #0F172A;">
  <h2 style="color: #0F172A; margin-top: 0;">New Early Access Registration</h2>
  <p>A new believer has joined the ${appName} waitlist:</p>
  <div style="background: #F1F5F9; padding: 14px 18px; border-radius: 8px; font-family: monospace; font-size: 14px; margin: 16px 0;">
    <strong>Subscriber:</strong> ${subscriberEmail}<br>
    <strong>Timestamp:</strong> ${new Date().toISOString()}
  </div>
  <p style="font-size: 13px; color: #64748B;">This notification was automatically dispatched via Resend.</p>
</body>
</html>
    `.trim();

    const adminRes = await resend.emails.send({
      from: fromEmail,
      to: [adminNotifyEmail],
      subject: `[${appName} Waitlist] New sign-up: ${subscriberEmail}`,
      html: adminNotificationHtml,
    });

    if (adminRes.error) {
      errors.push(`Admin notify error: ${adminRes.error.message}`);
    } else {
      adminSent = true;
    }
  } catch (err: any) {
    errors.push(`Admin notify exception: ${err?.message || String(err)}`);
  }

  return {
    subscriberEmailSent: subscriberSent,
    adminNotificationSent: adminSent,
    errors: errors.length > 0 ? errors : undefined,
  };
}
