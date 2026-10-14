import { cookies } from 'next/headers';
import { ADMIN_COOKIE, handleAdminStats } from '@/lib/admin';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() { return handleAdminStats((await cookies()).get(ADMIN_COOKIE)?.value); }
