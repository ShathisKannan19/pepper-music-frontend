import { NextPage } from 'next';
import Link from 'next/link';
import {
	Github,
	Twitter,
	MessageSquare,
	Music,
	HeartHandshake,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	discordServerLink,
	featursLink,
	githubLink,
	inviteLink,
	pepperLogoLink,
	privacyLink,
	termsLink,
	twitterLink,
} from '@/constants';
import Image from 'next/image';

interface Props {}

const Footer: NextPage<Props> = ({}) => {
	return (
		<footer className="w-full">
			<Separator className="bg-gray-800" />
			<div className="w-full bg-black text-white">
				<div className="container mx-auto px-4 py-12">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Column 1: About */}
						<div className="space-y-4">
							<div className="flex items-center gap-1">
								{/* <Music className="h-6 w-6 mr-2" /> */}
								<Image
									src={pepperLogoLink}
									width={25}
									height={100}
									className="rounded-full"
									alt="Pepper Logo"
								/>
								<h3 className="text-xl font-bold">Pepper</h3>
							</div>
							<p className="text-gray-400">
								Elevate your Discord server with Pepper, the music bot that
								delivers crystal-clear audio, intuitive controls, and a seamless
								listening experience.
							</p>
							<div className="flex space-x-4 pt-2">
								<Link href={githubLink} passHref>
									<Button
										variant="ghost"
										size="icon"
										className="h-9 w-9 rounded-full cursor-pointer"
									>
										<Github className="h-5 w-5" />
										<span className="sr-only">GitHub</span>
									</Button>
								</Link>
								<Link href={twitterLink} passHref>
									<Button
										variant="ghost"
										size="icon"
										className="h-9 w-9 rounded-full cursor-pointer"
									>
										<Twitter className="h-5 w-5" />
										<span className="sr-only">Twitter</span>
									</Button>
								</Link>
								<Link href={discordServerLink} passHref>
									<Button
										variant="ghost"
										size="icon"
										className="h-9 w-9 rounded-full cursor-pointer"
									>
										<MessageSquare className="h-5 w-5" />
										<span className="sr-only">Discord</span>
									</Button>
								</Link>
							</div>
						</div>

						<div className="space-y-4 w-fit ">
							<h3 className="text-lg font-medium">Quick Links</h3>
							<nav className="flex flex-col space-y-2">
								<Link
									href={featursLink}
									className="text-gray-400 hover:text-white transition-colors"
								>
									Features
								</Link>
								<Link
									href="/about-us"
									className="text-gray-400 hover:text-white transition-colors"
								>
									About Us
								</Link>
							</nav>
						</div>

						<div className="space-y-4">
							<h3 className="text-lg font-medium">Legal</h3>
							<nav className="flex flex-col space-y-2">
								<Link
									href={termsLink}
									className="text-gray-400 hover:text-white transition-colors"
								>
									Terms of Service
								</Link>
								<Link
									href={privacyLink}
									className="text-gray-400 hover:text-white transition-colors"
								>
									Privacy Policy
								</Link>
							</nav>

							<div className="pt-4">
								<Link href={inviteLink} passHref target="_blank">
									<Button className="w-full cursor-pointer">
										<HeartHandshake className="mr-2 h-4 w-4 " />
										Add to Discord
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>

				<Separator className="bg-gray-900" />
				<div className="container mx-auto px-4 py-6">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-gray-400 text-sm">
							© 2025 Pepper. All rights reserved.
						</p>
						<div className="flex items-center space-x-2 mt-4 md:mt-0">
							<span className="text-gray-400 text-sm">Made with</span>
							<span className="text-white">♥</span>
							<span className="text-gray-400 text-sm">
								for Discord communities
							</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
