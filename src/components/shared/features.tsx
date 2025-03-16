import { FeaturesType } from '@/types';
import { NextPage } from 'next';
import Image from 'next/image';

interface Props {
	feature: FeaturesType;
}

const Features: NextPage<Props> = ({ feature }) => {
	return (
		<div className="px-8 py-4 bg-black">
			<div className="text-center">
				<Image
					src={feature.imgSrc}
					alt={feature.name}
					width={300}
					height={200}
					className="object-cover w-[400px] h-[250px] rounded-lg object-top"
				/>
				<h4 className="text-xl font-bold mt-4 text-white">{feature.name}</h4>
				<p className="text-gray-400 mt-2">{feature.value}</p>
			</div>
		</div>
	);
};

export default Features;
