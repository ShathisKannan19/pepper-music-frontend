export const GET = async () => {
	try {
		const response = await fetch(
			process.env.BACKEND_API_ENDPOINT + '/stats/?limit=20&debug=false',
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
