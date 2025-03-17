import { NextPage } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Music,
	Heart,
	MessageSquare,
	ExternalLink,
	Star,
	Users,
	Zap,
	Code,
	Music2,
} from 'lucide-react';
import Link from 'next/link';
import { discordServerLink, inviteLink } from '@/constants';

interface Props {}

const AboutUs: NextPage<Props> = ({}) => {
	return (
		<div className="container mx-auto px-4 py-8 bg-black text-white">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="mb-12 text-center">
					<div className="flex justify-center mb-4">
						<Music className="h-20 w-20 text-white" />
					</div>
					<h1 className="text-5xl font-bold mb-4">About Pepper</h1>
					<p className="text-gray-400 text-xl max-w-2xl mx-auto">
						The ultimate music companion for your Discord server
					</p>
				</div>

				{/* Main Content */}
				<div className="space-y-12">
					{/* Introduction */}
					<Card className="bg-black overflow-hidden">
						<CardContent className="p-8">
							<p className="text-lg text-white leading-relaxed">
								We're thrilled to have you on board.{' '}
								<span className="font-bold text-white">Pepper</span> is here to
								bring the power of music to your Discord server. Get ready to
								immerse yourself in a world of melodies, beats, and rhythm that
								will elevate your community interactions.
							</p>
						</CardContent>
					</Card>

					{/* Feature Sections */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card className="bg-black h-full">
							<CardContent className="p-8 h-full flex flex-col">
								<div className="mb-4 ">
									<Music2 className="h-10 w-10 text-black p-2 bg-white rounded-lg" />
								</div>
								<h3 className="text-xl font-bold mb-4 text-white">
									Rich Music Experience
								</h3>
								<p className="text-white flex-grow">
									With Pepper, you can effortlessly play music from popular
									sources like YouTube, Spotify, SoundCloud, and more. Create
									personalized playlists, explore a vast music library, and
									share your favorite tunes with friends and fellow community
									members.
								</p>
							</CardContent>
						</Card>

						<Card className="bg-white border-0 h-full">
							<CardContent className="p-8 h-full flex flex-col">
								<div className="mb-4">
									<Users className="h-10 w-10 text-white p-2 bg-gray-800 rounded-lg" />
								</div>
								<h3 className="text-xl font-bold mb-4">Community First</h3>
								<p className="text-black flex-grow">
									Pepper is not just about playing music—it's about fostering a
									vibrant and lively community. Connect with your members
									through shared playlists, let them request their favorite
									songs, and create a harmonious environment that resonates with
									everyone.
								</p>
							</CardContent>
						</Card>

						<Card className="bg-white border-0 h-full">
							<CardContent className="p-8 h-full flex flex-col">
								<div className="mb-4">
									<Star className="h-10 w-10 text-white p-2 bg-gray-800 rounded-lg" />
								</div>
								<h3 className="text-xl font-bold mb-4">
									Perfect For Any Occasion
								</h3>
								<p className="text-black flex-grow">
									Whether you're hosting a gaming session, throwing a party, or
									simply relaxing with friends, Pepper is your trusty companion
									for an unforgettable musical journey. Summon Pepper to your
									voice channel, and watch as it fills the air with your chosen
									tracks, keeping the vibes alive.
								</p>
							</CardContent>
						</Card>

						<Card className="bg-black h-full">
							<CardContent className="p-8 h-full flex flex-col">
								<div className="mb-4">
									<Zap className="h-10 w-10 text-black p-2 bg-white rounded-lg" />
								</div>
								<h3 className="text-xl font-bold mb-4 text-white">
									Continuous Innovation
								</h3>
								<p className="text-white flex-grow">
									We're continuously improving Pepper, ensuring a seamless
									experience for all users. Our dedicated team is committed to
									delivering regular updates, introducing exciting new features,
									and providing top-notch support to meet your music needs.
								</p>
							</CardContent>
						</Card>
					</div>

					{/* Call to Action */}
					<Card className="bg-black border border-gray-800 overflow-hidden">
						<CardContent className="p-8 text-center">
							<h3 className="text-2xl font-bold mb-4 text-white">
								Ready to Elevate Your Server?
							</h3>
							<p className="text-gray-300 mb-6">
								Add Pepper to your Discord server now, and let the music take
								center stage in your community. Get ready for an extraordinary
								music bot experience with Pepper!
							</p>
							<div className="flex justify-center">
								<Link href={inviteLink} passHref target="_blank">
									<Button
										size="lg"
										className="bg-white text-black hover:bg-gray-200 cursor-pointer"
									>
										<Heart className="mr-2 h-5 w-5" />
										Add to Discord
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>

					{/* Support Server */}
					<Card className="bg-black overflow-hidden">
						<CardContent className="p-8">
							<div className="flex items-center mb-4">
								<MessageSquare className="h-8 w-8 text-white mr-3" />
								<h3 className="text-2xl font-bold text-white">
									Support Server
								</h3>
							</div>

							<div className="text-gray-300 space-y-4">
								<p>Join our Support Server and Get Assistance with Pepper!</p>
								<p>
									Need help or have questions about Pepper? Join our dedicated
									support server, where our friendly community and knowledgeable
									staff are ready to assist you.
								</p>
								<p>
									Whether you're facing technical issues, seeking guidance on
									bot configuration, or simply looking for tips and tricks to
									enhance your Pepper experience, our support server is the
									perfect place to find answers.
								</p>

								<div className="bg-black p-4 rounded-lg border border-gray-800 flex items-center justify-between">
									<span className="font-mono text-white">
										{discordServerLink}
									</span>
									<Link
										href="https://discord.gg/XzE9hSbsNb"
										passHref
										target="_blank"
										rel="noopener noreferrer"
									>
										<Button
											variant="secondary"
											size="sm"
											className="whitespace-nowrap cursor-pointer text-black"
										>
											<ExternalLink className="h-4 w-4 mr-2" />
											Join Now
										</Button>
									</Link>
								</div>

								<p>
									Connect with fellow Pepper users, engage in discussions, and
									stay updated with the latest news and announcements. We're
									here to ensure that your journey with Pepper is smooth and
									enjoyable.
								</p>
								<p>
									Don't hesitate to hop in and say hello! We look forward to
									seeing you in our support server and providing you with the
									assistance you need.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
