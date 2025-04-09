import { Metadata, NextPage } from 'next';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import GlobalButton from '@/components/shared/globalButton';
import Link from 'next/link';
import { features, inviteLink } from '@/constants';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Features from '@/components/shared/features';
import Uptime from '@/components/shared/uptime';

export const metadata: Metadata = {
	title: 'Pepper | Best Discord Music Bot for Seamless Streaming',
	description:
		'Add Pepper to your Discord server for high-quality music streaming from Spotify, YouTube, and more. Enjoy lag-free playback, playlist control, and an intuitive dashboard.',
	keywords: [
		'Discord music bot',
		'Pepper music bot',
		'Lavalink music bot',
		'Spotify Discord bot',
		'YouTube music bot',
		'high quality Discord music',
		'Discord bot with dashboard',
		'playlist management Discord bot',
		'Discord audio streaming bot',
	],
};

const Page: NextPage = () => {
	return (
		<div className="min-h-screen bg-black text-white">
			<section className="flex flex-col items-center justify-center text-center px-4 md:px-8 py-8 bg-black">
				<h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">
					Stream Music Effortlessly with Pepper
				</h2>
				<p className="text-base md:text-lg text-gray-400 mb-6">
					Your ultimate music companion on Discord with zero command. Play,
					manage, and enjoy music seamlessly on our{' '}
					<Link
						href="/dashboard"
						className="text-zinc-300 hover:text-zinc-200 hover:underline"
					>
						{' '}
						Dashboard{' '}
					</Link>
					.
				</p>
				<Link href={inviteLink} target="_blank">
					<GlobalButton>Add Pepper to Discord</GlobalButton>{' '}
				</Link>
				<div className="mt-10 flex flex-col lg:flex-row justify-center">
					<Image
						src="/images/pepper.png"
						alt="Music Streaming"
						width={600}
						height={400}
						className="rounded-l-lg rounded-r-none shadow-lg"
					/>
					<Card className="max-w-2xl bg-[var(--color-accent)] text-white border-0 rounded-lg lg:rounded-r-lg lg:rounded-l-none mt-0 lg:mt-0">
						<CardContent className="text-justify my-auto p-6 md:p-10">
							Pepper is a premium music bot powered by high-performance Lavalink
							nodes strategically positioned across Asia and the US for
							lag-free, high-quality music streaming worldwide.
							<br /> <br />
							Enjoy seamless playback from Spotify, Deezer, YouTube, and more
							with our comprehensive dashboard and advanced features including
							soundboard, volume control, queueing, and playlist management.
							Experience crystal-clear audio quality with minimal buffering
							thanks to our distributed node architecture, making Pepper the
							perfect music companion for any Discord server.
						</CardContent>
					</Card>
				</div>
			</section>
			<section className="py-8 px-4 md:px-8">
				<h3 className="text-2xl md:text-3xl font-bold text-center text-white">
					Why Choose Pepper?
				</h3>
				<div className="flex flex-wrap justify-center py-6">
					{features.map((feature) => (
						<Features feature={feature} key={feature.value} />
					))}
				</div>
			</section>
			<section className="pb-8 px-4 md:px-8">
				<Uptime />
			</section>
		</div>
	);
};

export const dynamic = 'force-dynamic';
export default Page;
