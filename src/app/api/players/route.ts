import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const response = await fetch(
			process.env.BACKEND_API_ENDPOINT + '/music/players',
			{
				headers: {
					'x-api-key': `${process.env.BACKEND_API_SECRET}`,
				},
				cache: 'no-store',
			},
		);

		if (!response.ok) {
			throw new Error('Failed to fetch players data');
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching players data:', error);
		return NextResponse.json(
			{ status: 'error', message: 'Failed to fetch players data' },
			{ status: 500 },
		);
	}
}
