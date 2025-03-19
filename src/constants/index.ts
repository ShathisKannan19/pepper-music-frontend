import { MenuItemType } from '@/types';

export const menuItems: MenuItemType[] = [
	{ name: 'Commands', value: '/commands' },
	{ name: 'Stats', value: '/stats' },
	{ name: 'About Us', value: '/about-us' },
	{ name: 'Terms of Service', value: '/terms-of-service' },
	{ name: 'Privacy Policy', value: '/privacy-policy' },
];

export const inviteLink: string =
	'https://discord.com/api/oauth2/authorize?client_id=871808444502540379&permissions=275443600464&scope=bot%20applications.commands';
export const githubLink: string =
	'https://github.com/muralianand12345/Pepper-Bot';
export const twitterLink: string = 'https://twitter.com';
export const discordServerLink: string = 'https://discord.gg/XzE9hSbsNb';

export const commandsLink = '/commands';
export const termsLink = '/terms-of-service';
export const privacyLink = '/privacy-policy';
export const pepperLogoLink = '/images/pepperLogo.png';
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
