import { NextRequest } from 'next/server';

export const GET = async (
	req: NextRequest,
	{ params }: { params: Promise<{ guildId: string }> },
) => {
	const { guildId } = await params;
	const searchParams = req.nextUrl.searchParams;

	const page = searchParams.get('page');
	const pageSize = searchParams.get('pageSize');
	if (!guildId) return Response.json('Guild Id not provided', { status: 400 });

	try {
		const response = await fetch(
			process.env.BACKEND_API_ENDPOINT +
				'/music/history/guild/' +
				guildId +
				`?page=${page}&pageSize=${pageSize}`,
			{
				headers: {
					'x-api-key': `${process.env.BACKEND_API_SECRET}`,
				},
				cache: 'no-store',
			},
		);
		const data = await response.json();

		return Response.json(data, { status: response.status });
	} catch (err) {
		return Response.json(err, { status: 500 });
	}
};
