import { client_id, discordOauth2ApiUrl, oauth2RedirectUrl } from '@/constants';
import { DiscordOauthGrantTypeEnum } from '@/enums';
import { createSession } from '@/lib/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
	const params = request.nextUrl.searchParams;
	const code = params.get('code');

	const options = {
		grant_type: DiscordOauthGrantTypeEnum.AUTHORIZATION_CODE,
		client_id: client_id,
		client_secret: `${process.env.CLIENT_SECRET}`,
		redirect_uri: oauth2RedirectUrl,
		code: `${code}`,
	};

	const response = await fetch(discordOauth2ApiUrl + '/oauth2/token', {
		method: 'POST',
		body: new URLSearchParams(options),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	const data = await response.json();
	await createSession(data);

	return redirect('/dashboard');
};
