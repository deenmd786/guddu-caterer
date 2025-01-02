import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = ['/auth/login', '/auth/signup', '/auth/verifyemail'].includes(path);

    const token = request.cookies.get('token')?.value || '';

    // If accessing a public path and already logged in, redirect to the home page
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow access to public paths and authenticated dashboard paths
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/auth/login',
        '/auth/signup',
        '/auth/verifyemail',
    ],
};