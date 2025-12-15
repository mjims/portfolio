
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

    if (isDashboard && !token) {
        const returnUrl = encodeURIComponent(request.nextUrl.pathname);
        return NextResponse.redirect(new URL(`/auth/login?returnUrl=${returnUrl}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
