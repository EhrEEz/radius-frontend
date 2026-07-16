// src/routes/products/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';
import type { Product, ProductCard, RelatedSearch } from '$lib/types/product';

// Define the type matching your RelatedSearches.svelte component

export const load: PageServerLoad = async ({ params }) => {
	const relatedProducts: ProductCard[] = [
		{
			id: 'prod_leather_wallet',
			slug: 'voyager-leather-wallet',
			title: 'The Voyager Leather Wallet',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
					alt: 'Voyager Leather Wallet front view'
				}
			],
			price: {
				amount: 85.0,
				currency: 'USD',
				discountedAmount: 75.0
			},
			rating: {
				average: 4.9,
				count: 342
			},
			variantOptions: [
				{
					id: 'opt_color',
					name: 'Color',
					values: [
						{ id: 'val_cognac', label: 'Cognac', hexColor: '#8B4513' },
						{ id: 'val_obsidian', label: 'Obsidian Black', hexColor: '#111111' }
					]
				}
			]
		},
		{
			id: 'prod_canvas_dopp_kit',
			slug: 'heritage-canvas-dopp-kit',
			title: 'Heritage Canvas Dopp Kit',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
					alt: 'Canvas Dopp Kit with leather trim'
				}
			],
			price: {
				amount: 65.0,
				currency: 'USD'
			},
			rating: {
				average: 4.7,
				count: 189
			},
			variantOptions: [
				{
					id: 'opt_color',
					name: 'Color',
					values: [
						{ id: 'val_olive', label: 'Olive Green', hexColor: '#556B2F' },
						{ id: 'val_navy', label: 'Navy Blue', hexColor: '#000080' }
					]
				}
			]
		},
		{
			id: 'prod_luggage_tag_set',
			slug: 'monogrammed-luggage-tags',
			title: 'Monogrammed Leather Luggage Tags (Set of 2)',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1581557991964-125469da3b8a?w=400&h=400&fit=crop',
					alt: 'Leather luggage tags with brass hardware'
				}
			],
			price: {
				amount: 35.0,
				currency: 'USD'
			},
			rating: {
				average: 4.8,
				count: 95
			}
		},
		{
			id: 'prod_leather_belt',
			slug: 'classic-reversible-leather-belt',
			title: 'Classic Reversible Leather Belt',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=400&fit=crop',
					alt: 'Reversible leather belt with rotating buckle'
				}
			],
			price: {
				amount: 120.0,
				currency: 'USD',
				discountedAmount: 95.0
			},
			rating: {
				average: 4.6,
				count: 210
			},
			variantOptions: [
				{
					id: 'opt_size',
					name: 'Size',
					values: [
						{ id: 'val_32', label: '32"' },
						{ id: 'val_34', label: '34"' },
						{ id: 'val_36', label: '36"' }
					]
				},
				{
					id: 'opt_hardware',
					name: 'Buckle Finish',
					values: [
						{ id: 'val_brass', label: 'Antique Brass' },
						{ id: 'val_silver', label: 'Brushed Silver' }
					]
				}
			]
		}
	];
	const mockProduct: Product = {
		id: 'prod_horizon_weekender',
		slug: params.slug,
		title: 'The Horizon Leather Weekender',
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
		variants: [
			{
				id: 'var_cog_brass',
				sku: 'HW-COG-BRS',
				optionValueIds: ['val_cognac', 'val_brass'],
				stock: 15,
				images: [
					{
						url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop',
						alt: 'Cognac Horizon Bag'
					},
					{
						url: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800&h=800&fit=crop',
						alt: 'Cognac Horizon Bag Brown'
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
			{
				id: 'var_for_brass',
				sku: 'HW-FOR-BRS',
				optionValueIds: ['val_forest', 'val_brass'],
				stock: 3,
				price: { amount: 475.0, currency: 'USD' }
			},
			{
				id: 'var_for_matte',
				sku: 'HW-FOR-MAT',
				optionValueIds: ['val_forest', 'val_matte'],
				stock: 0
			}
		],
		relatedProducts: relatedProducts,
		similarKeywords: ['Handmade', 'Gift', 'Wedding', 'Personalized', 'Custom'],
		frequentlyBoughtTogether: relatedProducts,
		seo: {
			title: 'The Horizon Leather Weekender | Premium Travel Bags',
			description:
				'Shop the Horizon Leather Weekender. Crafted from full-grain Italian leather with solid brass hardware. The ultimate luxury travel bag.',
			keywords: ['leather weekender', 'luxury travel bag', 'mens leather bag', 'italian leather']
		}
	};

	// Mock data for Related Searches (matches your RelatedSearches.svelte interface)
	const relatedSearches: RelatedSearch[] = [
		{
			title: 'Premium Leather Dopp Kits',
			imageUrl: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=400&fit=crop',
			href: '/search?q=leather+dopp+kit'
		},
		{
			title: 'Canvas Travel Backpacks',
			imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
			href: '/search?q=canvas+travel+backpack'
		},
		{
			title: 'Leather Care & Conditioning Kits',
			imageUrl: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400&h=400&fit=crop',
			href: '/search?q=leather+care+kit'
		},
		{
			title: 'Minimalist Leather Wallets',
			imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
			href: '/search?q=leather+wallet'
		},
		{
			title: 'Weekender Bags for Men',
			imageUrl: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=400&fit=crop',
			href: '/search?q=weekender+bag+men'
		},
		{
			title: 'Leather Luggage Tags',
			imageUrl: 'https://images.unsplash.com/photo-1581557991964-125469da3b8a?w=400&h=400&fit=crop',
			href: '/search?q=leather+luggage+tags'
		},

		{
			title: 'Travel Toiletry Bags',
			imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
			href: '/search?q=toiletry+bag'
		},
		{
			title: 'Leather Belt Collections',
			imageUrl: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=400&fit=crop',
			href: '/search?q=leather+belt'
		}
	];

	return {
		product: mockProduct,
		relatedSearches // <-- Return the mock data here
	};
};
