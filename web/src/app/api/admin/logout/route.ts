import { ADMIN_COOKIE, adminConfiguration, privateReply } from '@/lib/admin';
export async function POST(request: Request) {
  const config = adminConfiguration();
  if (!config || request.headers.get('origin') !== config.origin) return privateReply(403, { error: 'Invalid request origin.' });
  const response = privateReply(200, { success: true });
  response.headers.set('Set-Cookie', `${ADMIN_COOKIE}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
  return response;
}
