import { NextPage } from 'next';
import { Button } from '../ui/button';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	variant?:
		| 'link'
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| null;
	size?: 'sm' | 'lg';
	children: React.ReactNode;
}

const GlobalButton: NextPage<Props> = ({
	children,
	variant,
	className,
	size,
	...props
}) => {
	return (
		<Button
			variant={variant}
			className={`bg-white text-black hover:bg-gray-200 cursor-pointer ${className}`}
			size={size ? size : 'lg'}
			{...props}
		>
			{children}
		</Button>
	);
};

export default GlobalButton;
