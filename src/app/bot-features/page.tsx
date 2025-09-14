import FeatureComponent from '@/components/shared/feature/featureComponent';
import { NextPage, Metadata } from 'next';
interface Props {}

export const metadata: Metadata = {
	title: 'Features | How Pepper Enhances Your Discord Experience',
	description: 'Explore Pepper\'s features including voice channel music, multi-lingual support, and more.',
	keywords: [
		'Discord music bot features',
		'Pepper music bot',
		'Discord voice channel music',
		'multi-server music bot',
		'community playlists',
		'fast reliable music bot',
		'premium audio quality',
		'queue management',
	],
}

const FeaturePage: NextPage<Props> = async ({}) => {

	return (
		<div className="bg-black text-white min-h-screen">
			<div className="container mx-auto px-4 py-10">
				<FeatureComponent />
			</div>
		</div>
	);
}

export const dynamic = 'force-dynamic';
export default FeaturePage;