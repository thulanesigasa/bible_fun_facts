import { NextRequest, NextResponse } from 'next/server';
const CANONICAL_HOST = 'exegeomai.app';
export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || request.nextUrl.host).split(':')[0];
  const protocol = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() || request.nextUrl.protocol.replace(':', '');
  // Restrict host canonicalisation to the public domain; local and preview hosts remain testable.
  if (host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`) {
    if (protocol !== 'https' || host !== CANONICAL_HOST) {
      return NextResponse.redirect(new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, `https://${CANONICAL_HOST}`), 308);
    }
  }
  return NextResponse.next();
}
export const config = { matcher: ['/((?!_next/).*)'] };
