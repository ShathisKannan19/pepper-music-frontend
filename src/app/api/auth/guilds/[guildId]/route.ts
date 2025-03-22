import { discordOauth2ApiUrl } from '@/constants';

export const GET = async (
	req: Request,
	{ params }: { params: Promise<{ guildId: string }> },
) => {
	const { guildId } = await params;
	if (!guildId) return Response.json('Guild Id not provided', { status: 400 });

	try {
		const response = await fetch(discordOauth2ApiUrl + '/guilds/' + guildId, {
			headers: {
				Authorization: `Bot ${process.env.BOT_TOKEN}`,
			},
		});
		const data = await response.json();

		return Response.json(data, { status: response.status });
	} catch (err) {
		console.log('err', err);
		return Response.json(err);
	}
};
