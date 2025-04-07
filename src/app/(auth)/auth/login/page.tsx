import { Metadata, NextPage } from 'next';
import { Button } from '@/components/ui/button';
import { discordOauth2Url } from '@/constants';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaDiscord } from 'react-icons/fa';
import Image from 'next/image';
import GlobalButton from '@/components/shared/globalButton';
import { getSession } from '@/lib/session';
import RedirectWithDelay from '@/components/shared/redirectWithDelay';

export const metadata: Metadata = {
	title: 'Sign In | Pepper Music Bot',
	description:
		'Sign in to your Pepper account to manage your music experience on Discord.',
};

const checkSession = async () => {
	const data = await getSession();
	return data;
};

const Page = async ({
	searchParams,
}: {
	searchParams: Promise<{ redirect?: string }>;
}) => {
	const data = await checkSession();
	const searchParamsData = await searchParams;
	const redirectPath = searchParamsData.redirect || '/dashboard';

	if (data) {
		return <RedirectWithDelay redirectUri={redirectPath} />;
	}

	const enhancedDiscordUrl = `${discordOauth2Url}${
		discordOauth2Url.includes('?') ? '&' : '?'
	}redirect_after_login=${encodeURIComponent(redirectPath)}`;

	return (
		<div className="bg-black text-white flex justify-center p-4 py-24 min-h-screen">
			<Card className="w-full max-w-sm bg-zinc-800 border-zinc-800 text-white h-fit">
				<CardHeader className="text-center pb-2">
					<div className="flex justify-center mb-">
						<Image
							src="/images/pepperLogo.png"
							alt="Pepper Logo"
							width={80}
							height={80}
							className="rounded-full"
						/>
					</div>
					<CardTitle className="text-2xl font-bold text-white">
						Welcome Back
					</CardTitle>
					<p className="text-sm text-gray-400 mt-2">
						Sign in to your account to continue your music journey
					</p>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<Link href={enhancedDiscordUrl} className="w-full block">
							<GlobalButton
								className="cursor-pointer w-full bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center justify-center gap-2"
								size="sm"
							>
								<FaDiscord className="w-5 h-5" />
								Sign in with Discord
							</GlobalButton>
						</Link>

						<p className="text-xs text-center text-zinc-500 mt-6 text-balance leading-snug">
							By signing in, you agree to our{' '}
							<Link
								href="/terms-of-service"
								className="text-white hover:underline"
							>
								Terms of Service
							</Link>{' '}
							and{' '}
							<Link
								href="/privacy-policy"
								className="text-white hover:underline"
							>
								Privacy Policy
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Page;
