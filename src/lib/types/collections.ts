import type { Image } from './product';

export interface Categories {
	name: string;
	slug: string;
	thumbnail?: Image;
	label?: string;
}
