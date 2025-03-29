import { Session } from '@/types';

const GetUserData = async (token: string) => {
	try {
		if (!token) throw new Error('Token not Provided');

		const userData = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/user',
			{
				method: 'POST',
				body: JSON.stringify({ token }),
				cache: 'no-store',
			},
		);
		const userDataJson = await userData.json();
		return userDataJson;
	} catch (error) {
		return { message: 'Error Occured', error };
	}
};

export default GetUserData;
