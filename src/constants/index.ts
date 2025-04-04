import { MenuItemType, SidebarItemType } from '@/types';
import { ChartArea, Home, HomeIcon, List, Settings } from 'lucide-react';

export const menuItems: MenuItemType[] = [
	{ name: 'Commands', value: '/commands' },
	{ name: 'Stats', value: '/stats' },
	{ name: 'About Us', value: '/about-us' },
	{ name: 'Terms of Service', value: '/terms-of-service' },
	{ name: 'Privacy Policy', value: '/privacy-policy' },
];

export const SidebarServerItems: SidebarItemType[] = [
	{
		name: 'Overview',
		value: '/dashboard',
		icon: List,
		children: [
			{
				name: 'Dashboard Home',
				value: '/',
				icon: Home,
			},
		],
	},
	{
		name: 'Server Management',
		value: '/server-management',
		icon: List,
		children: [
			{
				name: 'server list',
				value: '/server-list',
				icon: List,
			},
		],
	},
];
export const commonRoutes = ['/auth', '/public', '/images'];

export const client_id =
	process.env.NODE_ENV === 'development'
		? '1302023614735847597'
		: '871808444502540379';

export const inviteLink: string = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=275443600464&scope=bot%20applications.commands`;
export const githubLink: string =
	'https://github.com/muralianand12345/Pepper-Bot';
export const twitterLink: string = 'https://twitter.com';
export const discordServerLink: string = 'https://discord.gg/XzE9hSbsNb';

export const commandsLink = '/commands';
export const termsLink = '/terms-of-service';
export const privacyLink = '/privacy-policy';
export const pepperLogoLink = '/images/pepperLogo.png';

export const oauth2RedirectUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000/api/callback'
		: 'https://pepper.mrbotz.com/api/callback';
export const discordOauth2Scopes = 'identify+guilds+guilds.join+email';
export const discordOauth2Url = `https://discord.com/oauth2/authorize?client_id=${client_id}&response_type=code&redirect_uri=${oauth2RedirectUrl}&scope=${discordOauth2Scopes}`;

export const features = [
	{
		name: 'High Quality Audio',
		value: 'Experience crystal-clear sound for all your favorite tracks.',
		imgSrc: '/images/high_quality_audio.jpg',
	},
	{
		name: 'Custom Playlists',
		value: 'Create and manage playlists directly on Discord.',
		imgSrc: '/images/custom_playlists.jpg',
	},
	{
		name: '24/7 Availability',
		value: 'Keep the music going anytime, anywhere.',
		imgSrc: '/images/247.jpg',
	},
];

export const discordOauth2ApiUrl = 'https://discord.com/api/v10';
