export const GET = async () => {
	try {
		const response = await fetch(
			process.env.BACKEND_API_ENDPOINT + '/info/stats',
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
		console.error('Error fetching health data:', error);
		return Response.json(
			{ status: 'error', message: 'Failed to fetch stats data' },
			{ status: 500 },
		);
	}
};
