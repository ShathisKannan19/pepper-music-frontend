import 'server-only';
import { cookies } from 'next/headers';
import { OauthToken } from '@/types';

export const createSession = async (data: OauthToken) => {
	const cookieStore = await cookies();

	const expires = Date.now() + data.expires_in * 1000;

	return cookieStore.set('session', `${data.access_token}`, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		expires,
		path: '/',
	});
};

export async function deleteSession() {
	const cookieStore = await cookies();

	cookieStore.delete('session');
}

export async function getSession() {
	const cookieStore = await cookies();

	return cookieStore.get('session');
}
