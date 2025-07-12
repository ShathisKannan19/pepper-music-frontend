import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const response = await fetch(process.env.BACKEND_API_ENDPOINT + '/health');

		if (!response.ok) {
			throw new Error('Failed to fetch health data');
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching health data:', error);
		return NextResponse.json(
			{ status: 'error', message: 'Failed to fetch health data' },
			{ status: 500 },
		);
	}
}
