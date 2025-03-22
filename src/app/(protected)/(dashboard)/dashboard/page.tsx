import { Metadata, NextPage } from 'next';

interface Props {}

export const metadata: Metadata = {
	title: 'Dashboard | Pepper Music Bot',
	description:
		'Control your Pepper Music Bot on Discord. Manage your music experience',
};
const Page: NextPage<Props> = ({}) => {
	return <div className="bg-black"></div>;
};

export default Page;
