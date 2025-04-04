import { discordOauth2ApiUrl } from '@/constants';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
	const { token } = await req.json();
	if (!token) return Response.json('Session Not found', { status: 400 });

	try {
		const response = await fetch(discordOauth2ApiUrl + '/oauth2/@me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();
		return Response.json(data, {
			status: response.status,
		});
	} catch (err) {
		return Response.json('Internal Server Error', { status: 500 });
	}
};
