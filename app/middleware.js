import { NextResponse } from 'next/server';
import admin from '../firebaseAdmin';

export async function middleware(req) {
  const token = req.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Проверка ролей
    const userRole = decodedToken.role || 'user';
    if (req.nextUrl.pathname.startsWith('/admin') && !['admin', 'superadmin'].includes(userRole)) {
      return NextResponse.redirect(new URL('/not-authorized', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};