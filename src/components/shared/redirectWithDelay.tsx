'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function RedirectWithDelay({
	title = 'Already signed in!',
	description = 'Redirecting you to your dashboard...',
	redirectUri = '/dashboard',
}) {
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			router.push(redirectUri);
		}, 2000);

		return () => clearTimeout(timer);
	}, [router]);

	return (
		<div className="bg-black text-white flex flex-col items-center justify-center p-4 min-h-screen">
			<Card className="w-full max-w-sm bg-zinc-800 border-zinc-800 text-white">
				<CardContent className="flex flex-col items-center p-6">
					<Image
						src="/images/pepperLogo.png"
						alt="Pepper Logo"
						width={60}
						height={60}
						className="rounded-full mb-4"
					/>
					<h2 className="text-xl font-semibold mb-2">{title}</h2>
					<p className="text-sm text-gray-400 text-center mb-4">
						{description}
					</p>
					<div className="w-8 h-8 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
				</CardContent>
			</Card>
		</div>
	);
}
