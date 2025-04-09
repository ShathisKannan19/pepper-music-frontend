import { Metadata, NextPage } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Props {}

export const metadata: Metadata = {
	title: 'Terms of Service | Use Guidelines for Pepper Music Bot',
	description:
		'Review the Terms of Service for Pepper Music Bot. Understand the rules for using Pepper, including user conduct, data usage, intellectual property, and compliance with Discord’s guidelines.',
	keywords: [
		'Pepper Terms of Service',
		'Pepper bot TOS',
		'Discord bot terms',
		'Pepper user agreement',
		'Pepper bot rules',
		'Discord bot usage policy',
		'intellectual property Pepper bot',
		'user conduct Pepper Music Bot',
		'Pepper Discord compliance',
	],
};

const TermsOfService: NextPage<Props> = ({}) => {
	return (
		<section className="bg-black">
			<div className="container mx-auto px-4 py-8 bg-black text-white">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<div className="mb-8 text-center">
						<h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
						<p className="text-gray-400">Last updated: April 2, 2025</p>
					</div>

					<Card className="shadow-lg bg-black py-0 my-6">
						<CardContent className="p-0">
							{/* Introduction Card */}
							<div className="bg-white text-black p-6 rounded-t-lg border-b border-gray-800">
								<p className="text-lg">
									These Terms of Service govern your use of the{' '}
									<span className="font-bold text-black">Pepper music bot</span>
									. By using the Bot, you agree to comply with these Terms. If
									you do not agree with any part of these Terms, please refrain
									from using the Bot.
								</p>
							</div>

							<ScrollArea className="p-6 h-[600px] bg-black">
								{/* Section 1 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											1
										</span>
										Use of the Bot
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											The Bot is provided for personal, non-commercial use only.
											You may use the Bot on Discord servers that you own or
											have appropriate permissions to use it on.
										</p>
										<p>
											You must comply with all applicable laws and regulations
											while using the Bot. You shall not use the Bot for any
											unlawful or unauthorized purposes, including but not
											limited to copyright infringement or spreading harmful or
											offensive content.
										</p>
										<p>
											The Bot may periodically undergo maintenance or updates,
											which may result in temporary unavailability. We strive to
											minimize disruptions and will provide notice when
											feasible.
										</p>
										<p>
											The Bot now includes an autoplay feature that recommends
											and plays music based on users’ past listening activity
											from Spotify and Pepper.
										</p>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 2 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											2
										</span>
										User Conduct
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											You are solely responsible for your actions and content
											when using the Bot. You shall not engage in any behavior
											that may cause harm, harass others, violate their privacy,
											or disrupt the functionality of the Bot.
										</p>
										<p>
											You shall not attempt to gain unauthorized access to the
											Bot, its systems, or any user data. You shall not probe,
											scan, or test the security vulnerabilities of the Bot or
											any associated networks.
										</p>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 3 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											3
										</span>
										Privacy
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											We respect your privacy and handle your personal
											information in accordance with applicable privacy laws and
											our Privacy Policy. By using the Bot, you consent to the
											collection, use, and disclosure of your personal
											information as described in the Privacy Policy.
										</p>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 4 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											4
										</span>
										Intellectual Property
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											The Bot, including its software, content, and associated
											intellectual property, is owned or licensed by us. You
											acknowledge that you have no ownership rights to the Bot
											or its intellectual property.
										</p>
										<p>
											You shall not reproduce, modify, distribute, sell, or
											exploit any part of the Bot without prior written
											permission from us.
										</p>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 5 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											5
										</span>
										Limitation of Liability
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											The Bot is provided on an "as-is" basis, without
											warranties or guarantees of any kind, whether express or
											implied.
										</p>
										<p>
											We shall not be liable for any direct, indirect,
											incidental, consequential, or punitive damages arising out
											of or in connection with the use of the Bot, including but
											not limited to loss of data, revenue, or profits.
										</p>
										<p>
											We do not share user data with Lavalink or any third-party
											music services. Instead, we have developed our own custom
											music algorithm for the autoplay feature, ensuring
											complete control over data privacy.
										</p>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 6 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											6
										</span>
										Termination
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											We reserve the right to suspend, terminate, or restrict
											your access to the Bot at any time, without prior notice
											or liability, if you breach these Terms or engage in any
											misuse or unauthorized activities.
										</p>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 7 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											7
										</span>
										Modifications to the Terms
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											We may update or revise these Terms at any time. Any
											changes will be effective immediately upon posting on our
											website or notifying users through other means.
										</p>
										<p>
											It is your responsibility to review the Terms
											periodically. By continuing to use the Bot after the
											revised Terms have been posted, you agree to be bound by
											the updated Terms.
										</p>
									</div>
								</div>

								<Separator className="my-8 bg-gray-800" />

								{/* Section 8 */}
								<div className="mb-8">
									<h2 className="text-xl font-bold mb-4 flex items-center text-white">
										<span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-3">
											8
										</span>
										Governing Law and Jurisdiction
									</h2>
									<div className="pl-11 space-y-3 text-gray-300">
										<p>
											These Terms shall be governed by and construed in
											accordance with the laws of India.
										</p>
										<p>
											Any legal actions or disputes arising out of these Terms
											shall be subject to the exclusive jurisdiction of the
											courts located in Tamil Nadu.
										</p>
									</div>
								</div>
							</ScrollArea>

							{/* Agreement Footer */}
							<div className="bg-white p-6 rounded-b-lg border-t border-gray-800">
								<p className="text-sm text-black text-center">
									By using Pepper, you acknowledge that you have read,
									understood, and agree to be bound by these Terms of Service.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
};

export default TermsOfService;
