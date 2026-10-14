import { handleAdminLogin } from '@/lib/admin';
export const runtime = 'nodejs';
export async function POST(request: Request) { return handleAdminLogin(request); }
