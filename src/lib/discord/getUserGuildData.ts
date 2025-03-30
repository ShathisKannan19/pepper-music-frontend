import { UserGuildData } from '@/types';

const GetUserGuildData = async (token: string) => {
	try {
		if (!token) throw new Error('Token not Provided');

		const userGuildData = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/user/guilds',
			{
				method: 'POST',
				body: JSON.stringify({ token }),
				cache: 'no-store',
			},
		);

		const userGuildDataJson = await userGuildData.json();
		return userGuildDataJson;
	} catch (error) {
		return { message: 'Error Occured', error };
	}
};

export default GetUserGuildData;
