'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import GlobalButton from '../shared/globalButton';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Music, Users, Server, Zap, Award, Clock } from 'lucide-react';

export default function DashboardSEO() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Check if user is logged in (this is just for the demo)
		const checkLoginStatus = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(checkLoginStatus);
	}, []);

	const handleLogin = () => {
		router.push('/auth/login');
	};

	if (isLoading) {
		return (
			<div className="bg-black text-white flex items-center justify-center min-h-screen">
				<div className="w-8 h-8 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<div className="bg-black text-white min-h-screen">
			<div className="container mx-auto px-4 py-10">
				<div className="flex flex-col gap-8">
					<header className="text-center">
						<Image
							src="/images/pepperLogo.png"
							alt="Pepper Discord Music Bot"
							width={100}
							height={100}
							className="rounded-full mx-auto mb-6"
						/>
						<h1 className="text-3xl md:text-4xl font-bold mb-4">
							Pepper Discord Music Bot Dashboard
						</h1>
						<p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
							Control your music seamlessly across all your Discord servers with
							our powerful dashboard.
						</p>
						<GlobalButton
							onClick={handleLogin}
							className=" hover:bg-zinc-900 hover:text-white cursor-pointer"
						>
							Login to Access Your Dashboard
						</GlobalButton>
					</header>

					<section className="mt-12">
						<h2 className="text-2xl font-bold mb-6 text-center">
							Dashboard Features
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<FeatureCard
								icon={<Music className="h-8 w-8 text-purple-500" />}
								title="Music Controls"
								description="Play, pause, skip, and queue songs directly from your dashboard."
							/>
							<FeatureCard
								icon={<Server className="h-8 w-8 text-purple-500" />}
								title="Server Management"
								description="Manage Pepper's settings across all your Discord servers from one place."
							/>
							<FeatureCard
								icon={<Users className="h-8 w-8 text-purple-500" />}
								title="Collaborative Playlists"
								description="Create and share music playlists with your server members."
							/>
							<FeatureCard
								icon={<Zap className="h-8 w-8 text-purple-500" />}
								title="Performance Stats"
								description="View detailed analytics about your music usage and preferences."
							/>
							<FeatureCard
								icon={<Award className="h-8 w-8 text-purple-500" />}
								title="Premium Features"
								description="Access exclusive features like higher audio quality and extended playlists."
							/>
							<FeatureCard
								icon={<Clock className="h-8 w-8 text-purple-500" />}
								title="Scheduled Playback"
								description="Schedule music sessions for events and gatherings in advance."
							/>
						</div>
					</section>

					<section className="mt-12">
						<h2 className="text-2xl font-bold mb-6 text-center">
							Why Use Pepper Dashboard?
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<Card className="bg-black border-zinc-700 text-white">
								<CardHeader>
									<CardTitle>For Discord Server Owners</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2">
										<li>• Centralized control for all your servers</li>
										<li>• Customizable music preferences and permissions</li>
										<li>• Track user engagement with music features</li>
										<li>• Set server-specific playlists and favorites</li>
									</ul>
								</CardContent>
							</Card>
							<Card className="bg-black border-zinc-700 text-white">
								<CardHeader>
									<CardTitle>For Discord Music Enthusiasts</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2">
										<li>
											• Create personal playlists accessible across servers
										</li>
										<li>• Discover trending music among your communities</li>
										<li>• Request songs without interrupting conversations</li>
										<li>• Access your listening history and favorites</li>
									</ul>
								</CardContent>
							</Card>
						</div>
					</section>

					<section className="mt-12 text-center">
						<Card className="bg-black border-zinc-700 text-white max-w-2xl mx-auto">
							<CardHeader>
								<CardTitle>
									Ready to take control of your Discord music experience?
								</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col items-center">
								<p className="mb-6">
									Login to access your personalized Pepper dashboard and start
									managing your music across all your Discord servers.
								</p>
								<GlobalButton
									onClick={handleLogin}
									className=" hover:bg-zinc-900 hover:text-white cursor-pointer"
								>
									Login to Dashboard
								</GlobalButton>
							</CardContent>
						</Card>
					</section>
				</div>
			</div>
		</div>
	);
}

function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<Card className="bg-black border-zinc-700 text-white">
			<CardContent className="pt-6">
				<div className="flex flex-col items-center text-center">
					<div className="mb-4">{icon}</div>
					<CardTitle className="mb-2">{title}</CardTitle>
					<CardDescription className="text-gray-400">
						{description}
					</CardDescription>
				</div>
			</CardContent>
		</Card>
	);
}
