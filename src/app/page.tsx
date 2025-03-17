import { NextPage } from 'next';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import GlobalButton from '@/components/shared/globalButton';
import Link from 'next/link';
import { features, inviteLink } from '@/constants';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Features from '@/components/shared/features';
import Uptime from '@/components/shared/uptime';

const Page: NextPage = () => {
	return (
		<div className="min-h-screen bg-black text-white">
			<section className="flex flex-col items-center justify-center text-center px-8 py-8 bg-black">
				<h2 className="text-5xl font-extrabold mb-4 text-white">
					Stream Music Effortlessly with Pepper
				</h2>
				<p className="text-lg text-gray-400 mb-6">
					Your ultimate music companion on Discord. Play, manage, and enjoy
					music seamlessly.
				</p>
				<Link href={inviteLink} target="_blank">
					<GlobalButton>Add Pepper to Discord</GlobalButton>{' '}
				</Link>
				<div className="mt-10 flex justify-center">
					<Image
						src="/images/pepper.png"
						alt="Music Streaming"
						width={600}
						height={400}
						className="rounded-l-lg rounded-r-none shadow-lg"
					/>
					<Card className="max-w-2xl bg-[var(--color-accent)] text-white border-0 rounded-r-lg rounded-l-none">
						<CardContent className="text-justify my-auto p-10">
							We're thrilled to have you on board. Pepper is here to bring the
							power of music to your Discord server. Get ready to immerse
							yourself in a world of melodies, beats, and rhythm that will
							elevate your community interactions.
							<br /> <br />
							With Pepper, you can effortlessly play music from popular sources
							like YouTube, Spotify, SoundCloud, and more. Create personalized
							playlists, explore a vast music library, and share your favorite
							tunes with friends and fellow community members.
						</CardContent>
					</Card>
				</div>
			</section>
			<section className="py-8">
				<h3 className="text-3xl font-bold text-center text-white">
					Why Choose Pepper?
				</h3>
				<div className="flex flex-wrap justify-center py-6">
					{features.map((feature) => (
						<Features feature={feature} key={feature.value} />
					))}
				</div>
			</section>
			<section className="pb-8 px-8">
				<Uptime />
			</section>
		</div>
	);
};

export default Page;
