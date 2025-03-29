import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { commonRoutes, menuItems } from './constants';

const menuRoutes = menuItems.map((item) => item.value);
const publicRoutes = commonRoutes.concat(menuRoutes);

export async function middleware(request: NextRequest) {
	const { pathname } = new URL(request.url);

	const isPublicRoute = publicRoutes.some(
		(route) => pathname.startsWith(route) || pathname === '/',
	);

	if (isPublicRoute) {
		return NextResponse.next();
	}

	const token = request.cookies.get('session')?.value;

	if (!token) {
		return NextResponse.redirect(new URL('/auth/login', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/health|api/stats|api/commands|api/callback|api/auth/user|api/auth/logout|api/auth/user/guilds|api/auth/guilds|api/guild|api/players).*)',
	],
};
