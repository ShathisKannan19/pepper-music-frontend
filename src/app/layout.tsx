import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
	title: 'Pepper | Stream Music Effortlessly on Discord',
	description:
		'Discover Pepper, your ultimate music companion on Discord. Play, manage, and enjoy music seamlessly with our powerful music bot. Add Pepper to your server today!',
	openGraph: {
		images: 'https://pepper.mrbotz.com/images/pepperLogo.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<GoogleAnalytics gaId="G-NCWY5GH7E9" />
			<body className="antialiased">
				<Navbar />
				{children}
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
