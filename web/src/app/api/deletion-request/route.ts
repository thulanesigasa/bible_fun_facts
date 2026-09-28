import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface DeletionPayload {
  email: string;
  reason?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body: DeletionPayload = await req.json();
    const { email, reason } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const referenceId = `DEL-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString();
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

    // Log the request (in production: store in Supabase or send to email service)
    console.log('[DeletionRequest]', {
      referenceId,
      email,
      reason: reason?.trim() ?? '',
      timestamp,
      ip,
    });

    // In production, you would:
    // 1. Store in Supabase: await supabase.from('deletion_requests').insert({ email, reason, reference_id, timestamp })
    // 2. Send confirmation email via Resend/SendGrid
    // 3. Trigger internal Slack/email notification to ops team

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: `Deletion request received for ${email}. You will receive a confirmation email within 24 hours. Data will be purged within 30 days.`,
      },
      {
        status: 200,
        headers: {
          'Content-Security-Policy': "default-src 'none'",
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload.' },
      { status: 400 }
    );
  }
}

// Block non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
