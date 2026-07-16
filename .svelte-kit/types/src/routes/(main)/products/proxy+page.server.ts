// @ts-nocheck
import type { PageServerLoad } from './$types';
import type { ProductCard } from '$lib/types/product';

// Extended type for mock data to include categories for filtering
type MockProduct = ProductCard & { categories?: string[] };

// --- Static Mock Data Catalog ---
const allProducts: MockProduct[] = [
	{
		id: 'prod_horizon_weekender',
		slug: 'horizon-leather-weekender',
		title: 'The Horizon Leather Weekender',
		categories: ['Bags', 'Travel'],
		images: [
			{
				url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
				alt: 'Weekender'
			}
		],
		price: { amount: 450.0, currency: 'USD', discountedAmount: 395.0 },
		rating: { average: 4.8, count: 124 },
		variantOptions: [
			{
				id: 'opt_color',
				name: 'Color',
				values: [{ id: 'val_cognac', label: 'Cognac', hexColor: '#8B4513' }]
			}
		]
	},
	{
		id: 'prod_voyager_wallet',
		slug: 'voyager-leather-wallet',
		title: 'The Voyager Leather Wallet',
		categories: ['Accessories', 'Wallets'],
		images: [
			{
				url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
				alt: 'Wallet'
			}
		],
		price: { amount: 85.0, currency: 'USD', discountedAmount: 75.0 },
		rating: { average: 4.9, count: 342 },
		variantOptions: [
			{
				id: 'opt_color',
				name: 'Color',
				values: [
					{ id: 'val_cognac', label: 'Cognac', hexColor: '#8B4513' },
					{ id: 'val_black', label: 'Black', hexColor: '#111111' }
				]
			}
		]
	},
	{
		id: 'prod_dopp_kit',
		slug: 'heritage-canvas-dopp-kit',
		title: 'Heritage Canvas Dopp Kit',
		categories: ['Accessories', 'Travel'],
		images: [
			{
				url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
				alt: 'Dopp Kit'
			}
		],
		price: { amount: 65.0, currency: 'USD' },
		rating: { average: 4.7, count: 189 }
	},
	{
		id: 'prod_luggage_tags',
		slug: 'monogrammed-luggage-tags',
		title: 'Monogrammed Leather Luggage Tags (Set of 2)',
		categories: ['Accessories', 'Travel'],
		images: [
			{
				url: 'https://images.unsplash.com/photo-1581557991964-125469da3b8a?w=400&h=400&fit=crop',
				alt: 'Luggage Tags'
			}
		],
		price: { amount: 35.0, currency: 'USD' },
		rating: { average: 4.8, count: 95 }
	},
	{
		id: 'prod_leather_belt',
		slug: 'classic-reversible-leather-belt',
		title: 'Classic Reversible Leather Belt',
		categories: ['Accessories', 'Belts'],
		images: [
			{
				url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=400&fit=crop',
				alt: 'Belt'
			}
		],
		price: { amount: 120.0, currency: 'USD', discountedAmount: 95.0 },
		rating: { average: 4.6, count: 210 },
		variantOptions: [
			{
				id: 'opt_size',
				name: 'Size',
				values: [
					{ id: 'val_32', label: '32"' },
					{ id: 'val_34', label: '34"' }
				]
			}
		]
	},
	{
		id: 'prod_summit_backpack',
		slug: 'summit-hiking-backpack',
		title: 'The Summit Hiking Backpack',
		categories: ['Bags', 'Travel', 'Outdoor'],
		images: [
			{
				url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
				alt: 'Backpack'
			}
		],
		price: { amount: 150.0, currency: 'USD' },
		rating: { average: 4.9, count: 88 }
	},
	{
		id: 'prod_cardholder',
		slug: 'minimalist-leather-cardholder',
		title: 'Minimalist Leather Cardholder',
		categories: ['Accessories', 'Wallets'],
		images: [
			{
				url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
				alt: 'Cardholder'
			}
		],
		price: { amount: 45.0, currency: 'USD' },
		rating: { average: 4.5, count: 150 }
	},
	{
		id: 'prod_canvas_tote',
		slug: 'weekend-canvas-tote',
		title: 'Weekend Canvas Tote',
		categories: ['Bags', 'Travel'],
		images: [
			{
				url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
				alt: 'Tote'
			}
		],
		price: { amount: 85.0, currency: 'USD', discountedAmount: 68.0 },
		rating: { average: 4.4, count: 67 }
	}
];

export const load = async ({ url }: Parameters<PageServerLoad>[0]) => {
	// 1. Extract Query Parameters
	const searchParams = url.searchParams;

	const q = searchParams.get('q')?.toLowerCase() || '';
	const categories = searchParams.getAll('category');

	const minPriceStr = searchParams.get('minPrice');
	const minPrice = minPriceStr ? parseFloat(minPriceStr) : undefined;

	const maxPriceStr = searchParams.get('maxPrice');
	const maxPrice = maxPriceStr ? parseFloat(maxPriceStr) : undefined;

	const minRatingStr = searchParams.get('minRating');
	const minRating = minRatingStr ? parseFloat(minRatingStr) : undefined;

	const sort = searchParams.get('sort') || 'featured';

	// 2. Filter Products
	let filteredProducts = allProducts.filter((product) => {
		// Search filter
		if (q && !product.title.toLowerCase().includes(q)) {
			return false;
		}

		// Category filter
		if (categories.length > 0) {
			const hasMatchingCategory = product.categories?.some((c) => categories.includes(c));
			if (!hasMatchingCategory) return false;
		}

		// Price filter (use discounted price if available, otherwise base price)
		const effectivePrice = product.price.discountedAmount ?? product.price.amount;
		if (minPrice !== undefined && effectivePrice < minPrice) {
			return false;
		}
		if (maxPrice !== undefined && effectivePrice > maxPrice) {
			return false;
		}

		// Rating filter
		if (minRating !== undefined && (product.rating?.average ?? 0) < minRating) {
			return false;
		}

		return true;
	});

	// 3. Sort Products
	filteredProducts = [...filteredProducts].sort((a, b) => {
		const priceA = a.price.discountedAmount ?? a.price.amount;
		const priceB = b.price.discountedAmount ?? b.price.amount;

		switch (sort) {
			case 'price_asc':
				return priceA - priceB;
			case 'price_desc':
				return priceB - priceA;
			case 'name_asc':
				return a.title.localeCompare(b.title);
			case 'name_desc':
				return b.title.localeCompare(a.title);
			case 'rating_desc':
				return (b.rating?.average ?? 0) - (a.rating?.average ?? 0);
			case 'featured':
			default:
				return 0; // Maintain original mock order for "featured"
		}
	});

	// 4. Derive available categories for the sidebar filter
	const allCategories = Array.from(new Set(allProducts.flatMap((p) => p.categories || []))).sort();

	return {
		products: filteredProducts,
		allCategories,
		// Optional: Pass back the active filters so the frontend can pre-populate inputs without parsing the URL again
		activeFilters: {
			q,
			categories,
			minPrice,
			maxPrice,
			minRating,
			sort
		}
	};
};
