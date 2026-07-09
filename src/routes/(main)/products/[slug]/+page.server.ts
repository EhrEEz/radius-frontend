// src/routes/products/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';
import type { Product } from '$lib/types/product';

export const load: PageServerLoad = async ({ params }) => {
	// In a real app, you would fetch this from your database using params.slug
	// const product = await db.query.products.findFirst({ where: eq(products.slug, params.slug) });

	const mockProduct: Product = {
		id: 'prod_horizon_weekender',
		slug: params.slug, // Matches the URL parameter
		title: 'The Horizon Leather Weekender',

		// Base product images (used when no variant-specific images are available)
		images: [
			{
				url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
				alt: 'Horizon Weekender Bag front view'
			},
			{
				url: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&h=800&fit=crop',
				alt: 'Horizon Weekender Bag side profile'
			},
			{
				url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
				alt: 'Horizon Weekender Bag interior lining'
			},
			{
				url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop',
				alt: 'Horizon Weekender Bag detail shot'
			}
		],

		// Base price with a discount applied
		price: {
			amount: 450.0,
			currency: 'USD',
			discountedAmount: 395.0
		},

		rating: {
			average: 4.8,
			count: 124
		},

		description: `
			<p>Crafted for the modern traveler, the <strong>Horizon Leather Weekender</strong> bridges the gap between rugged durability and refined elegance.
			Made from full-grain Italian leather that develops a rich patina over time, this bag is designed to be your lifelong companion.</p>
		`,

		specifications: {
			Material: 'Full-Grain Italian Leather',
			Lining: 'Water-Resistant Cotton Twill',
			Hardware: 'Solid Brass / Matte Black Steel',
			Dimensions: '22" L x 12" H x 9" D',
			Capacity: '45 Liters',
			Weight: '3.2 lbs (empty)',
			Warranty: 'Lifetime Repair Guarantee'
		},

		categories: ['Bags', 'Travel', 'Accessories'],
		tags: ['leather', 'weekender', 'travel', 'mens', 'premium', 'carry-on'],

		// Variant Options (The "Filters")
		variantOptions: [
			{
				id: 'opt_color',
				name: 'Color',
				values: [
					{
						id: 'val_cognac',
						label: 'Cognac',
						hexColor: '#8B4513',
						thumbnailUrl:
							'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop'
					},
					{
						id: 'val_obsidian',
						label: 'Obsidian Black',
						hexColor: '#111111'
					},
					{
						id: 'val_forest',
						label: 'Forest Green',
						hexColor: '#228B22'
					}
				]
			},
			{
				id: 'opt_hardware',
				name: 'Hardware Finish',
				values: [
					{ id: 'val_brass', label: 'Antique Brass' },
					{ id: 'val_matte', label: 'Matte Black' }
				]
			}
		],

		// Variants (The actual purchasable SKUs)
		variants: [
			// --- COGNAC ---
			{
				id: 'var_cog_brass',
				sku: 'HW-COG-BRS',
				optionValueIds: ['val_cognac', 'val_brass'],
				stock: 15,
				// Variant-specific images! When Cognac is selected, the gallery will filter to these.
				images: [
					{
						url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop',
						alt: 'Cognac Horizon Bag'
					},
					{
						url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
						alt: 'Cognac Horizon Bag interior'
					}
				]
			},
			{
				id: 'var_cog_matte',
				sku: 'HW-COG-MAT',
				optionValueIds: ['val_cognac', 'val_matte'],
				stock: 8
			},

			// --- OBSIDIAN ---
			{
				id: 'var_obs_brass',
				sku: 'HW-OBS-BRS',
				optionValueIds: ['val_obsidian', 'val_brass'],
				stock: 12
			},
			{
				id: 'var_obs_matte',
				sku: 'HW-OBS-MAT',
				optionValueIds: ['val_obsidian', 'val_matte'],
				stock: 20
			},

			// --- FOREST GREEN ---
			{
				id: 'var_for_brass',
				sku: 'HW-FOR-BRS',
				optionValueIds: ['val_forest', 'val_brass'],
				stock: 3, // Low stock! Will trigger "Only 3 left!" warning
				price: { amount: 475.0, currency: 'USD' } // Slight price override for this specific variant
			},
			{
				id: 'var_for_matte',
				sku: 'HW-FOR-MAT',
				optionValueIds: ['val_forest', 'val_matte'],
				stock: 0 // OUT OF STOCK! Will disable the "Matte Black" button when "Forest Green" is selected.
			}
		],

		relatedProductIds: ['prod_leather_wallet', 'prod_canvas_dopp_kit', 'prod_luggage_tag_set'],

		seo: {
			title: 'The Horizon Leather Weekender | Premium Travel Bags',
			description:
				'Shop the Horizon Leather Weekender. Crafted from full-grain Italian leather with solid brass hardware. The ultimate luxury travel bag.',
			keywords: ['leather weekender', 'luxury travel bag', 'mens leather bag', 'italian leather']
		}
	};

	return {
		product: mockProduct
	};
};
