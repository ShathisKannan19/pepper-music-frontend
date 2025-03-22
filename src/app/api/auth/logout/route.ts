import { logout } from '@/actions/auth';

export const GET = async () => {
	await logout();
};
