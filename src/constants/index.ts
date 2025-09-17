import { MenuItemType } from '@/types';

export const menuItems: MenuItemType[] = [
	{ name: 'Stats', value: '/stats' },
	{ name: 'Features', value: '/bot-features' },
	{ name: 'About Us', value: '/about-us' },
	{ name: 'Terms of Service', value: '/terms-of-service' },
	{ name: 'Privacy Policy', value: '/privacy-policy' },
];

export const commonRoutes = ['/auth', '/public', '/images', '/dashboard'];

export const client_id =
	process.env.NODE_ENV === 'development'
		? '1302023614735847597'
		: '871808444502540379';

export const inviteLink: string = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=275443600464&scope=bot%20applications.commands`;
export const githubLink: string =
	'https://github.com/muralianand12345/Pepper-Bot';
export const twitterLink: string = 'https://twitter.com';
export const discordServerLink: string = 'https://discord.gg/XzE9hSbsNb';

export const featursLink = '/bot-features';
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
		name: 'DJ Support',
		value: 'Give DJ roles the power to manage music controls.',
		imgSrc: '/images/dj_for_discord.png',
	},
	{
		name: '24/7 Availability',
		value: 'Keep the music going anytime, anywhere.',
		imgSrc: '/images/247.jpg',
	},
];

export const MusicQuotes = [
  "“Where words fail, music speaks.” – Hans Christian Andersen",
  "“Music can change the world because it can change people.” – Bono",
  "“Without music, life would be a mistake.” – Friedrich Nietzsche",
  "“One good thing about music, when it hits you, you feel no pain.” – Bob Marley",
  "“Music is the shorthand of emotion.” – Leo Tolstoy",
  "“Music is the divine way to tell beautiful, poetic things to the heart.” – Pablo Casals",
  "“After silence, that which comes nearest to expressing the inexpressible is music.” – Aldous Huxley",
  "“To play a wrong note is insignificant; to play without passion is inexcusable.” – Ludwig van Beethoven",
  "“Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything.” – Plato",
  "“Music is a world within itself, it’s a language we all understand.” – Stevie Wonder",
  "“If something happened where I couldn’t write music anymore, it would kill me. It’s not just a job. It’s not just a hobby. It’s why I get up in the morning.” – Hans Zimmer",
  "“Your inner voice is the voice of divinity. To hear it, we need to be in solitude, even in crowded places.” – A. R. Rahman"
];