import { deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function logout(redirectUrl?: string) {
	await deleteSession();
	redirect(redirectUrl ? redirectUrl : '/');
}
