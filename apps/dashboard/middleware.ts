import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const ticket = request.cookies.get('ticket');
  if (!ticket?.value) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}

export const config = {
  matcher: '/',
};
