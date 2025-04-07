import { NextRequest } from 'next/server';

export const GET = async (
	req: NextRequest,
	{ params }: { params: Promise<{ userId: string }> },
) => {
	const { userId } = await params;
	const searchParams = req.nextUrl.searchParams;

	const page = searchParams.get('page');
	const pageSize = searchParams.get('pageSize');
	if (!userId) return Response.json('User Id not provided', { status: 400 });

	try {
		const response = await fetch(
			process.env.BACKEND_API_ENDPOINT +
				'/music/history/guilds/' +
				userId +
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
