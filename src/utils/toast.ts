// src/utils/toast.ts
import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ShowToastOptions {
	type?: ToastType;
}

export const showToast = (
	title: string,
	description?: string,
	options: ShowToastOptions = {},
) => {
	const { type = 'success', ...restOptions } = options;

	switch (type) {
		case 'success':
			toast.success(title, { description, ...restOptions });
			break;
		case 'error':
			toast.error(title, { description, ...restOptions });
			break;
		case 'info':
			toast.info(title, { description, ...restOptions });
			break;
		case 'warning':
			toast.warning(title, { description, ...restOptions });
			break;
		default:
			toast(title, { description, ...restOptions });
	}
};
