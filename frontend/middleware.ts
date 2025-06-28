import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;


    if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }


    if (!token && request.nextUrl.pathname.startsWith('/models3d/me')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: ['/dashboard', '/models3d/me'],
};
