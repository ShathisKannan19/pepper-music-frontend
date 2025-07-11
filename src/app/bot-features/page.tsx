import { NextPage } from 'next';
import Image from 'next/image';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Music, Users, Server, Zap, Award, Clock } from 'lucide-react';

interface Props {}

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

const FeaturePage: NextPage<Props> = async ({}) => {

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
							Pepper Discord Music Bot Features
						</h1>
						<p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
							Enhance your Discord servers with high-quality music and powerful bot commands.
						</p>
					</header>

					<section className="mt-12">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<FeatureCard
								icon={<Music className="h-8 w-8 text-purple-500" />}
								title="Voice Channel Music"
								description="Play high-quality music directly in your Discord voice channels with simple commands."
							/>
							<FeatureCard
								icon={<Server className="h-8 w-8 text-purple-500" />}
								title="Multi-Server Support"
								description="Add Pepper to multiple Discord servers and enjoy consistent music experience across all of them."
							/>
							<FeatureCard
								icon={<Users className="h-8 w-8 text-purple-500" />}
								title="Community Playlists"
								description="Let server members add songs to the queue and create collaborative listening sessions."
							/>
							<FeatureCard
								icon={<Zap className="h-8 w-8 text-purple-500" />}
								title="Fast & Reliable"
								description="Lightning-fast song loading and stable 24/7 uptime for uninterrupted music sessions."
							/>
							<FeatureCard
								icon={<Award className="h-8 w-8 text-purple-500" />}
								title="Premium Audio Quality"
								description="Enjoy crystal-clear sound with support for high-bitrate audio streaming."
							/>
							<FeatureCard
								icon={<Clock className="h-8 w-8 text-purple-500" />}
								title="Queue Management"
								description="Easily manage song queues, skip tracks, and loop your favorite songs or playlists."
							/>
						</div>
					</section>

					<section className="mt-12">
						<h2 className="text-2xl font-bold mb-6 text-center">
							Why Choose Pepper for Your Discord Server?
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<Card className="bg-black border-zinc-700 text-white">
								<CardHeader>
									<CardTitle>Easy to Use Commands</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2">
										<li>• Simple slash commands for all music functions</li>
										<li>• Intuitive song search and playlist management</li>
										<li>• Quick setup with minimal configuration required</li>
										<li>• Support for YouTube, Spotify, and SoundCloud</li>
									</ul>
								</CardContent>
							</Card>
							<Card className="bg-black border-zinc-700 text-white">
								<CardHeader>
									<CardTitle>Built for Discord Communities</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2">
										<li>
											• Seamless integration with Discord voice channels
										</li>
										<li>• Permissions system for better server control</li>
										<li>• Real-time music status and now playing updates</li>
										<li>• Stable performance during peak server activity</li>
									</ul>
								</CardContent>
							</Card>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

export const dynamic = 'force-dynamic';
export default FeaturePage;