export async function GET() {
	try {
		const response = await fetch(
			process.env.BACKEND_API_ENDPOINT + '/commands',
			{
				headers: {
					'x-api-key': `${process.env.BACKEND_API_SECRET}`,
				},
				cache: 'no-store',
			},
		);

		if (!response.ok) {
			throw new Error('Failed to fetch health data');
		}

		const data = await response.json();
		return Response.json(data);
	} catch (error) {
		console.error('Error fetching commands data:', error);
		return Response.json(
			{ status: 'error', message: 'Failed to fetch health data' },
			{ status: 500 },
		);
	}
}
