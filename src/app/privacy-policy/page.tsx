import { Metadata, NextPage } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Shield,
	Eye,
	Database,
	Clock,
	Lock,
	Share2,
	Baby,
	Trash2,
	Bell,
	MessageSquare,
} from 'lucide-react';

interface Props {}

export const metadata: Metadata = {
	title: 'Privacy Policy | Pepper Music Bot',
	description:
		'Read the privacy policy for Pepper Music Bot to understand how we collect, use, and protect your personal information.',
};

const PrivacyPolicy: NextPage<Props> = ({}) => {
	return (
		<section className="bg-black">
			<div className="container mx-auto px-4 py-8 text-white">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<div className="mb-8 text-center">
						<h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
						<p className="text-gray-400">Last updated: March 16, 2025</p>
					</div>

					<Card className="shadow-lg bg-black py-0 my-6">
						<CardContent className="p-0">
							{/* Introduction Card */}
							<div className="bg-white text-black p-6 rounded-t-lg border-b border-gray-800">
								<p className="text-lg">
									This Privacy Policy outlines how we collect, use, and handle
									personal information when you use the
									<span className="font-bold text-black">
										{' '}
										Pepper music bot
									</span>
									. By using the Bot, you consent to the practices described in
									this Policy.
								</p>
							</div>

							<ScrollArea className="p-6 h-[600px] ">
								{/* Section 1 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											<Eye className="w-4 h-4" />
										</div>
										Information Collection
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											Personal Information: When you interact with the Bot, we
											may collect certain personal information, such as:
										</p>
										<ul className="list-disc pl-6 space-y-2">
											<li>
												<span className="font-semibold">User ID:</span> This is
												collected to identify users and provide personalized
												experiences within the bot.
											</li>
											<li>
												<span className="font-semibold">
													Music Playback Data:
												</span>{' '}
												The Bot may collect information about the music tracks
												played, such as the title, artist, and duration. This
												data helps improve the user experience and is used for
												statistical purposes.
											</li>
											<li>
												<span className="font-semibold">
													Command Usage Data:
												</span>{' '}
												The Bot may collect information about the commands used
												by individual users for bug fixing, troubleshooting, and
												improving the functionality of the Bot.
											</li>
											<li>
												<span className="font-semibold">Guild ID:</span> We
												collect the Guild ID to associate user activity with
												specific Discord servers and provide server-specific
												features and functionality.
											</li>
											<li>
												<span className="font-semibold">User Statistics:</span>{' '}
												The Bot may track statistics related to individual
												users, such as the number of tracks played, total listen
												time, and overall command usage count. These statistics
												help in understanding user engagement and enhancing the
												bot's features.
											</li>
											<li>
												<span className="font-semibold">
													Channel ID (Setup Command):
												</span>{' '}
												The Bot may collect the channel ID provided during setup
												commands to enable specific functionality or designate
												preferred channels for certain actions.
											</li>
											<li>
												<span className="font-semibold">Server Data:</span> We
												may collect data related to the server such as ID,
												server name, owner ID and total members when bot is
												added to a guild. The data we collect here is solely
												used for debugging and upgrade purposes.
											</li>
										</ul>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 2 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											<Database className="w-4 h-4" />
										</div>
										Use of Information
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											We may use the collected information for the following
											purposes:
										</p>
										<ul className="list-disc pl-6 space-y-2">
											<li>
												Providing and improving the functionality of the Bot.
											</li>
											<li>Personalizing user experiences within the Bot.</li>
											<li>
												Analyzing usage patterns to enhance the Bot's features
												and performance.
											</li>
											<li>
												Troubleshooting and fixing bugs reported by users.
											</li>
											<li>Complying with legal obligations.</li>
										</ul>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 3 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											<Clock className="w-4 h-4" />
										</div>
										Data Retention
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											We retain personal information only for as long as
											necessary to fulfill the purposes outlined in this Policy,
											unless a longer retention period is required by law.
										</p>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 4 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											<Lock className="w-4 h-4" />
										</div>
										Data Security
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											We take reasonable measures to protect the security of
											your personal information against unauthorized access,
											loss, or alteration. However, please note that no method
											of transmission over the internet or electronic storage is
											100% secure, and we cannot guarantee absolute security.
										</p>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 5 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											<Share2 className="w-4 h-4" />
										</div>
										Data Sharing and Disclosure
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											We do not sell, trade, or otherwise transfer your personal
											information to third parties without your consent, except
											in the following circumstances:
										</p>
										<ul className="list-disc pl-6 space-y-2">
											<li>
												Trusted service providers who assist us in operating the
												Bot and providing services to you, subject to their
												agreement to keep the information confidential.
											</li>
											<li>
												Compliance with applicable laws, regulations, or legal
												processes.
											</li>
										</ul>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 6 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											<Baby className="w-4 h-4" />
										</div>
										Children's Privacy
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											The Bot is not intended for individuals under the age of
											13. We do not knowingly collect or solicit personal
											information from children. If we become aware that we have
											collected personal information from a child without
											parental consent, we will take steps to promptly delete
											the information.
										</p>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 7 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											<Trash2 className="w-4 h-4" />
										</div>
										Data Deletion Request
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											You have the right to request the deletion of your
											personal information collected by the Bot. To submit a
											data deletion request, please contact us through our{' '}
											<span className="font-semibold">
												official discord server
											</span>
											. We will review and respond to your request in accordance
											with applicable laws and regulations.
										</p>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 8 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											<Bell className="w-4 h-4" />
										</div>
										Changes to the Privacy Policy
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											We reserve the right to modify or update this Privacy
											Policy from time to time. Any changes will be effective
											upon posting the revised Policy on our website. We
											encourage you to review this Policy periodically.
										</p>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 9 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											<MessageSquare className="w-4 h-4" />
										</div>
										Contact Us
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											If you have any questions, concerns, or requests regarding
											this Privacy Policy or the handling of your personal
											information, please contact us through our{' '}
											<span className="font-semibold">
												official discord server
											</span>
											.
										</p>
									</div>
								</div>
							</ScrollArea>

							{/* Agreement Footer */}
							<div className="bg-white p-6 rounded-b-lg border-t border-gray-800">
								<p className="text-sm text-black text-center">
									By using Pepper, you acknowledge that you have read,
									understood, and agree to this Privacy Policy.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
};

export default PrivacyPolicy;
