import { logout } from '@/app/actions/auth';

export const GET = async () => {
	await logout();
};
