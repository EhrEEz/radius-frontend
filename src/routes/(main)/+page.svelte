<script lang="ts">
	import BannerSection from '$lib/components/layout/BannerSection.svelte';
	import DynamicCard from '$lib/components/layout/DynamicCard.svelte';
	import CollectionSlider, {
		type CollectionItem
	} from '$lib/components/sections/CollectionSlider.svelte';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import { Button } from '$lib/components/ui/Button';
	import {
		ArrowRight,
		Sparkles,
		ShieldCheck,
		Truck,
		RefreshCw,
		Flame,
		Star,
		ChevronRight,
	} from '@lucide/svelte';
	import type { ProductCard as ProductCardType } from '$lib/types/product';

	// --- Quick Category Navigation ---
	const quickCategories = [
		{
			name: 'Bags & Packs',
			href: '/categories/bags',
			image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
			count: '42 items'
		},
		{
			name: 'Apparel',
			href: '/categories/fashion',
			image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&fit=crop',
			count: '68 items'
		},
		{
			name: 'Wallets & Carry',
			href: '/categories/accessories',
			image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop',
			count: '35 items'
		},
		{
			name: 'Footwear',
			href: '/categories/footwear',
			image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop',
			count: '24 items'
		},
		{
			name: 'Travel Gear',
			href: '/categories/travel',
			image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=200&h=200&fit=crop',
			count: '51 items'
		},
		{
			name: 'Tech Sleeves',
			href: '/categories/electronics',
			image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200&h=200&fit=crop',
			count: '19 items'
		},
		{
			name: 'Home & Living',
			href: '/categories/home',
			image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&h=200&fit=crop',
			count: '30 items'
		},
		{
			name: 'Botanical Care',
			href: '/categories/beauty',
			image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop',
			count: '16 items'
		}
	];

	// --- Mock Products ---
	const featuredProducts: ProductCardType[] = [
		{
			id: '1',
			slug: 'horizon-weekender',
			title: 'The Horizon Leather Weekender',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
					alt: 'Horizon Leather Weekender'
				},
				{
					url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
					alt: 'Horizon Leather Weekender inside'
				}
			],
			price: { amount: 450.0, currency: 'USD', discountedAmount: 395.0 },
			rating: { average: 4.9, count: 142 },
			variantOptions: [
				{
					id: 'color',
					name: 'Color',
					values: [
						{ id: 'cognac', label: 'Cognac', hexColor: '#8B4513' },
						{ id: 'obsidian', label: 'Obsidian', hexColor: '#1A1A1A' }
					]
				}
			]
		},
		{
			id: '2',
			slug: 'summit-backpack',
			title: 'The Summit All-Weather Backpack',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=600&fit=crop',
					alt: 'Summit Backpack'
				}
			],
			price: { amount: 185.0, currency: 'USD' },
			rating: { average: 4.8, count: 98 },
			variantOptions: [
				{
					id: 'color',
					name: 'Color',
					values: [
						{ id: 'olive', label: 'Olive Drab', hexColor: '#556B2F' },
						{ id: 'charcoal', label: 'Charcoal', hexColor: '#333333' }
					]
				}
			]
		},
		{
			id: '3',
			slug: 'voyager-wallet',
			title: 'The Voyager Minimal Bifold Wallet',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop',
					alt: 'Voyager Wallet'
				}
			],
			price: { amount: 85.0, currency: 'USD', discountedAmount: 72.0 },
			rating: { average: 5.0, count: 310 }
		},
		{
			id: '4',
			slug: 'classic-leather-sneakers',
			title: 'Minimalist Artisan Leather Low-Tops',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop',
					alt: 'Artisan Sneakers'
				}
			],
			price: { amount: 165.0, currency: 'USD', discountedAmount: 140.0 },
			rating: { average: 4.7, count: 215 }
		},
		{
			id: '5',
			slug: 'heritage-chore-coat',
			title: 'Waxed Canvas Heavyweight Chore Coat',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop',
					alt: 'Chore Coat'
				}
			],
			price: { amount: 210.0, currency: 'USD' },
			rating: { average: 4.9, count: 87 }
		},
		{
			id: '6',
			slug: 'urban-laptop-sleeve',
			title: 'Merino Wool Felt & Leather Sleeve 15"',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop',
					alt: 'Laptop Sleeve'
				}
			],
			price: { amount: 65.0, currency: 'USD', discountedAmount: 55.0 },
			rating: { average: 4.8, count: 174 }
		}
	];

	const trendingProducts: ProductCardType[] = [
		{
			id: '7',
			slug: 'compression-packing-cubes',
			title: 'Waterproof Compression Packing Cubes (Set of 3)',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
					alt: 'Packing Cubes'
				}
			],
			price: { amount: 55.0, currency: 'USD' },
			rating: { average: 4.9, count: 420 }
		},
		{
			id: '8',
			slug: 'classic-belt',
			title: 'Full-Grain English Bridle Leather Belt',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&h=600&fit=crop',
					alt: 'Bridle Leather Belt'
				}
			],
			price: { amount: 95.0, currency: 'USD', discountedAmount: 85.0 },
			rating: { average: 4.6, count: 180 }
		},
		{
			id: '9',
			slug: 'merino-wool-sweater',
			title: 'Ultra-Fine Merino Wool Crewneck Sweater',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop',
					alt: 'Merino Wool Sweater'
				}
			],
			price: { amount: 135.0, currency: 'USD', discountedAmount: 110.0 },
			rating: { average: 4.9, count: 260 }
		},
		{
			id: '10',
			slug: 'artisan-leather-clutch',
			title: 'Hand-Stitched Italian Leather Clutch',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
					alt: 'Artisan Clutch'
				}
			],
			price: { amount: 95.0, currency: 'USD' },
			rating: { average: 4.8, count: 95 }
		}
	];

	// --- Curated Collections for Carousel ---
	const curatedCollections: CollectionItem[] = [
		{
			id: 'col-1',
			title: 'The Weekend Escape',
			subtitle: 'Weekenders, dopp kits, and packing systems built for effortless getaways.',
			badge: 'Bestseller',
			itemCount: '18 items',
			image:
				'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&h=600&fit=crop',
			href: '/collections/weekend-escape'
		},
		{
			id: 'col-2',
			title: 'Minimal Desk Setup',
			subtitle: 'Hand-stitched leather desk pads, cable trays, and tech organizers.',
			badge: 'Curated',
			itemCount: '12 items',
			image:
				'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
			href: '/collections/minimal-desk'
		},
		{
			id: 'col-3',
			title: 'Artisan Leather Craft',
			subtitle: 'Vegetable-tanned full grain pieces that age with a rich, unique patina.',
			badge: 'Handmade',
			itemCount: '24 items',
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
			href: '/collections/artisan-leather'
		},
		{
			id: 'col-4',
			title: 'Weather-Proof Commuter',
			subtitle: 'Durable waxed canvas and seam-sealed nylon for all-season transit.',
			badge: 'New Release',
			itemCount: '15 items',
			image:
				'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=600&fit=crop',
			href: '/collections/weather-proof'
		},
		{
			id: 'col-5',
			title: 'Mindful Home & Living',
			subtitle: 'Tactile ceramics, organic linens, and slow-crafted home rituals.',
			badge: 'Staff Pick',
			itemCount: '30 items',
			image:
				'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop',
			href: '/collections/mindful-home'
		}
	];

	let favorites = $state<Record<string, boolean>>({});

	function toggleFavorite(id: string) {
		favorites[id] = !favorites[id];
	}
</script>

<svelte:head>
	<title>Radius | Thoughtfully Designed Goods & Artisan Craftsmanship</title>
	<meta
		name="description"
		content="Radius is a curated marketplace for timeless leather goods, apparel, travel gear, and everyday essentials crafted by independent makers."
	/>
</svelte:head>

<div class="space-y-16 sm:space-y-24 py-6 sm:py-8">
	<!-- 1. HERO SLOTTED DYNAMIC CARD -->
	<section>
		<DynamicCard
			bgImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=800&fit=crop"
			overlayOpacity="bg-gray-950/45"
			aspectRatio="min-h-[480px] sm:min-h-[560px] lg:min-h-[620px]"
			class="shadow-2xl"
		>
			<div class="flex items-center justify-between">
				<span
					class="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-white tracking-wide uppercase"
				>
					<Sparkles class="h-3.5 w-3.5 text-amber-300" />
					Spring / Summer 2026 Collection
				</span>
				<span class="hidden sm:inline-block text-xs font-medium text-white/80 tracking-widest uppercase">
					Crafted with Intention
				</span>
			</div>

			<div class="max-w-4xl mt-auto pt-16">
				<h2
					class="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-white tracking-tight text-balance"
				>
					Objects of Lasting Purpose & Quiet Elegance.
				</h2>
				<p class="mt-4 text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
					Discover hand-finished leather carry, organic merino knits, and weather-resistant travel
					systems engineered for everyday journeys.
				</p>

				<div class="mt-8 flex flex-wrap items-center gap-4">
					<Button variant="white" href="/collections/new-arrivals" class="gap-2 text-sm font-semibold">
						<span>Explore New Arrivals</span>
						<ArrowRight class="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						href="/categories"
						class="text-white bg-white/10 border-white/5 hover:bg-white/15 backdrop-blur-sm"
					>
						Browse All Categories
					</Button>
				</div>
			</div>
		</DynamicCard>
	</section>

	<!-- 2. QUICK CATEGORY CIRCLES -->
	<section>
		<div class="flex items-center justify-between mb-6">
			<div>
				<h2 class="text-2xl sm:text-3xl font-serif font-semibold text-gray-900 tracking-tight">
					Explore by Category
				</h2>
				<p class="text-sm text-gray-500 mt-0.5">Explore masterfully curated collections.</p>
			</div>
			<a
				href="/categories"
				class="group inline-flex items-center gap-1.5 text-sm font-semibold text-violet-900 hover:text-violet-700 transition-colors"
			>
				<span>View All</span>
				<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
			</a>
		</div>

		<div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
			{#each quickCategories as cat}
				<a
					href={cat.href}
					class="group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 hover:bg-gray-50/80"
				>
					<div
						class="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border-2 border-gray-200 group-hover:border-violet-600 transition-all duration-300 shadow-sm group-hover:shadow-md"
					>
						<img
							src={cat.image}
							alt={cat.name}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							loading="lazy"
						/>
					</div>
					<span
						class="mt-3 text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-violet-900 transition-colors line-clamp-1"
					>
						{cat.name}
					</span>
					<span class="text-[11px] text-gray-500 font-medium">{cat.count}</span>
				</a>
			{/each}
		</div>
	</section>

	<!-- 3. FEATURED PRODUCTS GRID WITH LIVE FAVORITES -->
	<section>
		<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
			<div>
				<div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-700">
					<Flame class="h-3.5 w-3.5 text-amber-500" />
					<span>Staff Picks & Essentials</span>
				</div>
				<h2 class="mt-1 text-3xl sm:text-4xl font-serif font-semibold text-gray-900 tracking-tight">
					Featured Products
				</h2>
			</div>
			<div class="flex items-center gap-3">
				<a
					href="/categories/bags"
					class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-950 transition-colors"
				>
					<span>Shop Bags</span>
					<ChevronRight class="h-4 w-4" />
				</a>
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
			{#each featuredProducts as product (product.id)}
				<ProductCard
					{product}
					isOnSale={product.price.discountedAmount !== undefined &&
						product.price.discountedAmount < product.price.amount}
					isFavorite={Boolean(favorites[product.id])}
					ontogglefavorite={() => toggleFavorite(product.id)}
				/>
			{/each}
		</div>
	</section>

	<!-- 4. SLOTTED DYNAMIC CARDS: SPLIT DUET PROMO -->
	<section class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
		<!-- Card 1: Leather Heritage -->
		<DynamicCard
			bgImage="https://images.unsplash.com/photo-1524679813234-66a389fe1a42?w=1000&h=700&fit=crop"
			overlayOpacity="bg-gray-950/50"
			aspectRatio="min-h-[420px]"
			class="shadow-xl"
		>
			<div class="flex items-center justify-between">
				<span
					class="rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white uppercase tracking-wider"
				>
					Italian Full-Grain
				</span>
				<span class="text-xs text-white/80 font-mono">Series № 04</span>
			</div>

			<div class="mt-auto pt-10">
				<h3 class="text-3xl sm:text-4xl font-serif font-semibold text-white tracking-tight">
					The Horizon Leather Series
				</h3>
				<p class="mt-2 text-sm text-gray-200 max-w-md leading-relaxed">
					Hand-buffed with organic wax and vegetable oils. Develops a lustrous, deeply personal
					patina over decades of use.
				</p>
				<div class="mt-6">
					<Button variant="white" href="/categories/bags" class="gap-2">
						<span>Explore Leather Carry</span>
						<ArrowRight class="h-4 w-4" />
					</Button>
				</div>
			</div>
		</DynamicCard>

		<!-- Card 2: Travel Essentials -->
		<DynamicCard
			bgImage="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1000&h=700&fit=crop"
			overlayOpacity="bg-gray-950/50"
			aspectRatio="min-h-[420px]"
			class="shadow-xl"
		>
			<div class="flex items-center justify-between">
				<span
					class="rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white uppercase tracking-wider"
				>
					Weather-Resistant
				</span>
				<span class="text-xs text-white/80 font-mono">Modular Carry</span>
			</div>

			<div class="mt-auto pt-10">
				<h3 class="text-3xl sm:text-4xl font-serif font-semibold text-white tracking-tight">
					Travel & Expedition Systems
				</h3>
				<p class="mt-2 text-sm text-gray-200 max-w-md leading-relaxed">
					Compressible packing modules, waterproof stormproof bags, and lightweight merino travel
					wear built for the open road.
				</p>
				<div class="mt-6">
					<Button variant="white" href="/categories/travel" class="gap-2">
						<span>Shop Travel Gear</span>
						<ArrowRight class="h-4 w-4" />
					</Button>
				</div>
			</div>
		</DynamicCard>
	</section>

	<!-- 5. INTERACTIVE CURATED COLLECTION SLIDER -->
	<CollectionSlider
		title="Curated Collection Edits"
		subtitle="Discover themed capsules designed by our studio artisans for intentional living and daily routines."
		collections={curatedCollections}
	/>

	<!-- 6. FULL-WIDTH BANNER SECTION -->
	<section>
		<BannerSection
			title="Built for a Lifetime. Guaranteed."
			subtitle="We stand behind the integrity of every stitch, rivet, and zipper. Free repairs for life on all core handcrafted pieces."
			bgImage="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1600&h=700&fit=crop"
			textColor="text-white"
			overlayOpacity="bg-gray-950/55"
			align="left"
			aspectRatio="aspect-[21/9] sm:aspect-[4/1] min-h-[320px]"
			class="my-0 shadow-xl"
		>
			<div class="flex flex-wrap items-center gap-4">
				<Button variant="white" href="/about" class="gap-2">
					<span>Our Craftsmanship Pledge</span>
					<ArrowRight class="h-4 w-4" />
				</Button>
				<div class="flex items-center gap-2 text-xs text-white/90 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-full">
					<ShieldCheck class="h-4 w-4 text-emerald-400" />
					<span>10-Year Repair Warranty</span>
				</div>
			</div>
		</BannerSection>
	</section>

	<!-- 7. ASYMMETRIC SECTION: TALL SPOTLIGHT DYNAMIC CARD + BEST SELLERS -->
	<section>
		<div class="flex items-center justify-between mb-8">
			<div>
				<div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-700">
					<Star class="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
					<span>Community Favorites</span>
				</div>
				<h2 class="mt-1 text-3xl sm:text-4xl font-serif font-semibold text-gray-900 tracking-tight">
					Trending & Most Loved
				</h2>
			</div>
			<a
				href="/collections/best-sellers"
				class="group inline-flex items-center gap-1.5 text-sm font-semibold text-violet-900 hover:text-violet-700 transition-colors"
			>
				<span>View All Best Sellers</span>
				<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
			</a>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
			<!-- Tall Slotted Dynamic Card (5 Cols) -->
			<div class="lg:col-span-5 flex">
				<DynamicCard
					bgImage="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1100&fit=crop"
					overlayOpacity="bg-gray-950/50"
					aspectRatio="min-h-[440px] lg:min-h-full w-full"
					class="shadow-xl"
				>
					<div class="flex items-center justify-between">
						<span
							class="rounded-full bg-amber-400/90 text-gray-950 px-3 py-1 text-xs font-bold uppercase tracking-wider"
						>
							Award Winner
						</span>
						<div class="flex items-center gap-1 text-amber-300 text-xs font-semibold">
							<Star class="h-3.5 w-3.5 fill-current" />
							<span>4.9 / 5.0 (300+ reviews)</span>
						</div>
					</div>

					<div class="mt-auto pt-16">
						<h3 class="text-3xl sm:text-4xl font-serif font-semibold text-white tracking-tight">
							The Executive Messenger
						</h3>
						<p class="mt-2 text-sm text-gray-200 leading-relaxed">
							Structured silhouette designed with quick-access magnetic clasps, dedicated 16" laptop
							cradle, and pass-through luggage sleeve.
						</p>

						<div class="mt-6 flex items-center justify-between">
							<span class="text-2xl font-serif font-bold text-white">$220.00</span>
							<Button variant="white" href="/products/executive-messenger" class="gap-2 text-xs">
								<span>Shop Now</span>
								<ArrowRight class="h-3.5 w-3.5" />
							</Button>
						</div>
					</div>
				</DynamicCard>
			</div>

			<!-- Product Grid (7 Cols: 4 items) -->
			<div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
				{#each trendingProducts as product (product.id)}
					<ProductCard
						{product}
						isOnSale={product.price.discountedAmount !== undefined &&
							product.price.discountedAmount < product.price.amount}
						isFavorite={Boolean(favorites[product.id])}
						ontogglefavorite={() => toggleFavorite(product.id)}
					/>
				{/each}
			</div>
		</div>
	</section>

	<!-- 8. RECOMMENDED CATEGORY GRIDS (4 DYNAMIC CARDS) -->
	<section>
		<div class="text-center max-w-2xl mx-auto mb-10">
			<span class="text-xs font-semibold uppercase tracking-wider text-violet-700">
				Studio Specialties
			</span>
			<h2 class="mt-1 text-3xl sm:text-4xl font-serif font-semibold text-gray-900 tracking-tight">
				Discover More Collections
			</h2>
			<p class="mt-2 text-sm text-gray-600">
				Explore specialized gear handcrafted for creative professionals, commuters, and travelers.
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			<!-- Category Card 1 -->
			<DynamicCard
				bgImage="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop"
				overlayOpacity="bg-gray-950/45"
				aspectRatio="min-h-[320px]"
				class="shadow-md hover:shadow-xl"
			>
				<div>
					<span class="text-xs font-semibold text-white/80 uppercase tracking-wider">01</span>
				</div>
				<div class="mt-auto">
					<h3 class="text-2xl font-serif font-semibold text-white">Apparel & Coats</h3>
					<p class="mt-1 text-xs text-gray-300">Waxed chore coats & wool knits</p>
					<div class="mt-4">
						<Button variant="white" size="xs" href="/categories/fashion" class="gap-1">
							<span>Browse Apparel</span>
							<ArrowRight class="h-3 w-3" />
						</Button>
					</div>
				</div>
			</DynamicCard>

			<!-- Category Card 2 -->
			<DynamicCard
				bgImage="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop"
				overlayOpacity="bg-gray-950/45"
				aspectRatio="min-h-[320px]"
				class="shadow-md hover:shadow-xl"
			>
				<div>
					<span class="text-xs font-semibold text-white/80 uppercase tracking-wider">02</span>
				</div>
				<div class="mt-auto">
					<h3 class="text-2xl font-serif font-semibold text-white">Artisan Footwear</h3>
					<p class="mt-1 text-xs text-gray-300">Minimal low-tops & boots</p>
					<div class="mt-4">
						<Button variant="white" size="xs" href="/categories/footwear" class="gap-1">
							<span>Browse Shoes</span>
							<ArrowRight class="h-3 w-3" />
						</Button>
					</div>
				</div>
			</DynamicCard>

			<!-- Category Card 3 -->
			<DynamicCard
				bgImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=600&fit=crop"
				overlayOpacity="bg-gray-950/45"
				aspectRatio="min-h-[320px]"
				class="shadow-md hover:shadow-xl"
			>
				<div>
					<span class="text-xs font-semibold text-white/80 uppercase tracking-wider">03</span>
				</div>
				<div class="mt-auto">
					<h3 class="text-2xl font-serif font-semibold text-white">Desk & Tech</h3>
					<p class="mt-1 text-xs text-gray-300">Sleeves, pads & organizers</p>
					<div class="mt-4">
						<Button variant="white" size="xs" href="/categories/electronics" class="gap-1">
							<span>Browse Tech</span>
							<ArrowRight class="h-3 w-3" />
						</Button>
					</div>
				</div>
			</DynamicCard>

			<!-- Category Card 4 -->
			<DynamicCard
				bgImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=600&fit=crop"
				overlayOpacity="bg-gray-950/45"
				aspectRatio="min-h-[320px]"
				class="shadow-md hover:shadow-xl"
			>
				<div>
					<span class="text-xs font-semibold text-white/80 uppercase tracking-wider">04</span>
				</div>
				<div class="mt-auto">
					<h3 class="text-2xl font-serif font-semibold text-white">Home & Ritual</h3>
					<p class="mt-1 text-xs text-gray-300">Ceramics & linen textiles</p>
					<div class="mt-4">
						<Button variant="white" size="xs" href="/categories/home" class="gap-1">
							<span>Browse Home</span>
							<ArrowRight class="h-3 w-3" />
						</Button>
					</div>
				</div>
			</DynamicCard>
		</div>
	</section>

	<!-- 9. VALUE PROPOSITIONS & TRUST BAR -->
	<section class="rounded-3xl bg-neutral-100 p-8 sm:p-12 border border-neutral-200/80">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
			<div class="flex items-start gap-4">
				<div class="rounded-2xl bg-white p-3 shadow-sm text-violet-900 shrink-0">
					<Truck class="h-6 w-6" />
				</div>
				<div>
					<h4 class="text-base font-semibold text-gray-900 font-sans">Free Global Delivery</h4>
					<p class="mt-1 text-xs text-gray-600 leading-relaxed">
						Complimentary standard shipping on all qualifying orders above $75.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div class="rounded-2xl bg-white p-3 shadow-sm text-violet-900 shrink-0">
					<ShieldCheck class="h-6 w-6" />
				</div>
				<div>
					<h4 class="text-base font-semibold text-gray-900 font-sans">Lifetime Stitch Warranty</h4>
					<p class="mt-1 text-xs text-gray-600 leading-relaxed">
						Free repairs on all hardware, seams, and zippers throughout the product's life.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div class="rounded-2xl bg-white p-3 shadow-sm text-violet-900 shrink-0">
					<RefreshCw class="h-6 w-6" />
				</div>
				<div>
					<h4 class="text-base font-semibold text-gray-900 font-sans">30-Day Hassle-Free Returns</h4>
					<p class="mt-1 text-xs text-gray-600 leading-relaxed">
						Test out your piece at home. If it's not a perfect match, return it for a full refund.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div class="rounded-2xl bg-white p-3 shadow-sm text-violet-900 shrink-0">
					<Sparkles class="h-6 w-6" />
				</div>
				<div>
					<h4 class="text-base font-semibold text-gray-900 font-sans">Carbon-Neutral Commerce</h4>
					<p class="mt-1 text-xs text-gray-600 leading-relaxed">
						100% of carbon emissions from shipping are verified and offset via certified projects.
					</p>
				</div>
			</div>
		</div>
	</section>
</div>
