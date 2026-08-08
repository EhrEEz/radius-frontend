<script lang="ts">
	import BannerSection from '$lib/components/layout/BannerSection.svelte';
	import DynamicCard from '$lib/components/layout/DynamicCard.svelte';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import { Button } from '$lib/components/ui/Button';
	import {
		ArrowRight,
		Sparkles,
		Compass,

		Flame,
		Search,
		Grid,
		LayoutGrid,
		MapPin,
		X,
		ChevronRight,
	} from '@lucide/svelte';
	import type { ProductCard as ProductCardType } from '$lib/types/product';

	// =========================================================================
	// 1. DATA MODEL FOR DYNAMIC CONTENT LOADING
	// =========================================================================
	interface CollectionItem {
		id: string;
		slug: string;
		title: string;
		tagline: string;
		description: string;
		category: string;
		season: string;
		badge?: string;
		itemCount: number;
		rating: number;
		reviewCount: number;
		image: string;
		secondaryImage?: string;
		artisan: {
			workshop: string;
			location: string;
			specialty: string;
		};
		materials: string[];
		featured?: boolean;
	}

	const allCollections: CollectionItem[] = [
		{
			id: 'col-1',
			slug: 'weekend-escape',
			title: 'The Weekend Escape Capsule',
			tagline: '72-Hour Travel & Modular Packing',
			description:
				'Durable water-repellent canvas weekender bags, compression packing cubes, and heritage dopp kits engineered for effortless transition from runway to cabin.',
			category: 'Travel & Carry',
			season: 'Spring / Summer 2026',
			badge: 'Bestseller',
			itemCount: 18,
			rating: 4.9,
			reviewCount: 340,
			image:
				'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200&h=800&fit=crop',
			secondaryImage:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
			artisan: {
				workshop: 'Studio Bellini',
				location: 'Florence, Italy',
				specialty: 'Saddle-Stitched Canvas & Hide'
			},
			materials: ['18oz Waxed Cotton', 'Full-Grain Vachetta Leather', 'Solid Brass Hardware'],
			featured: true
		},
		{
			id: 'col-2',
			slug: 'artisan-leather',
			title: 'Tuscan Leather Craft Series',
			tagline: 'Vegetable-Tanned Heirloom Carry',
			description:
				'Hand-buffed with organic plant waxes and vegetable oils. Develops a lustrous, deeply personal patina over decades of daily use.',
			category: 'Leather & Heritage',
			season: 'Permanent Collection',
			badge: 'Masterwork',
			itemCount: 24,
			rating: 4.9,
			reviewCount: 512,
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=800&fit=crop',
			secondaryImage:
				'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop',
			artisan: {
				workshop: 'Conceria Santa Croce',
				location: 'Pisa, Italy',
				specialty: 'Slow Pit Tanning'
			},
			materials: ['Italian Tuscan Calfskin', 'Beeswax Finish', 'Solid Cast Brass'],
			featured: true
		},
		{
			id: 'col-3',
			slug: 'minimal-desk',
			title: 'Minimal Workspace & Tech Suite',
			tagline: 'Precision Organization for Modern Workflows',
			description:
				'German wool felt laptop sleeves, vegetable-tanned desk blotters, and aluminum cable docks designed to declutter your creative desk space.',
			category: 'Work & Tech',
			season: 'Year-Round Edition',
			badge: 'Curator Choice',
			itemCount: 14,
			rating: 4.8,
			reviewCount: 210,
			image:
				'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop',
			secondaryImage:
				'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop',
			artisan: {
				workshop: 'Atelier Kanto',
				location: 'Tokyo, Japan',
				specialty: 'Precision Edge Finishing'
			},
			materials: ['Bavarian Merino Felt', 'Anodized 6061 Aluminum', 'Horween Leather']
		},
		{
			id: 'col-4',
			slug: 'weather-proof',
			title: 'All-Weather Transit & Outerwear',
			tagline: 'Waxed Chore Coats & Technical Shells',
			description:
				'Heavyweight paraffin-dipped chore jackets, seam-sealed nylon shells, and merino wool midlayers built for unpredictable coastal weather.',
			category: 'Apparel & Transit',
			season: 'Autumn / Winter',
			badge: 'Stormproof',
			itemCount: 16,
			rating: 4.9,
			reviewCount: 188,
			image:
				'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&h=800&fit=crop',
			secondaryImage:
				'https://images.unsplash.com/photo-1544923246-77307dd628b9?w=600&h=600&fit=crop',
			artisan: {
				workshop: 'Clyde Maritime Mills',
				location: 'Dundee, Scotland',
				specialty: 'Waxed Canvas Milling'
			},
			materials: ['Halley Stevensons Waxed Cotton', 'YKK Aquaguard Zippers']
		},
		{
			id: 'col-5',
			slug: 'mindful-home',
			title: 'Mindful Home & Tactile Rituals',
			tagline: 'Wheel-Thrown Stoneware & Organic Linens',
			description:
				'Handmade ceramic pour-overs, hand-loomed flax linen throws, and cold-pressed botanical amber candles designed for intentional spaces.',
			category: 'Mindful Home',
			season: 'Spring / Summer',
			badge: 'Studio Batch',
			itemCount: 22,
			rating: 4.8,
			reviewCount: 145,
			image:
				'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop',
			secondaryImage:
				'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&h=600&fit=crop',
			artisan: {
				workshop: 'Kura Pottery Studio',
				location: 'Kyoto, Japan',
				specialty: 'High-Fire Wood Kiln'
			},
			materials: ['Shigaraki Clay', 'French Flax Linen', 'Wild Soy Wax']
		},
		{
			id: 'col-6',
			slug: 'obsidian-capsule',
			title: 'The Obsidian Matte Capsule',
			tagline: 'Monochrome Tactical Carry Edition',
			description:
				'Limited release 1000D Cordura, matte black PVD-coated zinc hardware, and low-profile magnetic closures for urban transit.',
			category: 'Archive Releases',
			season: 'Limited Edition (250 Units)',
			badge: 'Limited Drop',
			itemCount: 8,
			rating: 5.0,
			reviewCount: 94,
			image:
				'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&h=800&fit=crop',
			secondaryImage:
				'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
			artisan: {
				workshop: 'Forge & Thread Lab',
				location: 'Portland, USA',
				specialty: 'Ultralight Ballistic Assembly'
			},
			materials: ['1000D Ballistic Cordura', 'Fidlock V-Buckles', 'Matte PVD Coating']
		},
		{
			id: 'col-7',
			slug: 'alpine-kit',
			title: 'Alpine Expedition Systems',
			tagline: 'High-Altitude Technical Travel Gear',
			description:
				'Ultralight ripstop packing cubes, titanium money clips, and temperature-regulating merino wool travel blankets tested down to -20°C.',
			category: 'Travel & Carry',
			season: 'Winter Expedition',
			badge: 'Alpine Grade',
			itemCount: 15,
			rating: 4.9,
			reviewCount: 230,
			image:
				'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1200&h=800&fit=crop',
			secondaryImage:
				'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&h=600&fit=crop',
			artisan: {
				workshop: 'Valais Alpine Works',
				location: 'Zermatt, Switzerland',
				specialty: 'Cold-Climate Performance'
			},
			materials: ['Dyneema Composite Fabric', 'Aerospace Titanium', 'Australian Merino Wool']
		},
		{
			id: 'col-8',
			slug: 'artisan-footwear',
			title: 'Artisan Minimal Footwear',
			tagline: 'Handcrafted Italian Sneaker Line',
			description:
				'Margom rubber soles stitched to supple Italian calf leather. Designed to be resoled repeatedly for lifelong durability.',
			category: 'Apparel & Transit',
			season: 'Permanent Collection',
			badge: 'Hand-Lasted',
			itemCount: 12,
			rating: 4.7,
			reviewCount: 310,
			image:
				'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1200&h=800&fit=crop',
			secondaryImage:
				'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=600&fit=crop',
			artisan: {
				workshop: 'Calzaturificio Rossi',
				location: 'Civitanova Marche, Italy',
				specialty: 'Strobel Stitching & Lasting'
			},
			materials: ['Calf Nappa Leather', 'Margom Cupsole', 'Vegetable Tanned Insole']
		}
	];

	// Sample spotlight products for in-section previews
	const spotlightProducts: ProductCardType[] = [
		{
			id: 'sp-1',
			slug: 'horizon-weekender',
			title: 'The Horizon Leather Weekender',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
					alt: 'Weekender'
				}
			],
			price: { amount: 450.0, currency: 'USD', discountedAmount: 395.0 },
			rating: { average: 4.9, count: 142 }
		},
		{
			id: 'sp-2',
			slug: 'compression-packing-cubes',
			title: 'Compression Packing Cubes (Set of 3)',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
					alt: 'Packing Cubes'
				}
			],
			price: { amount: 55.0, currency: 'USD' },
			rating: { average: 4.9, count: 420 }
		},
		{
			id: 'sp-3',
			slug: 'heritage-dopp-kit',
			title: 'Heritage Canvas Dopp Kit',
			images: [
				{
					url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
					alt: 'Dopp Kit'
				}
			],
			price: { amount: 65.0, currency: 'USD' },
			rating: { average: 4.7, count: 189 }
		}
	];

	// Material taxonomy entries
	const materialTaxonomies = [
		{
			name: 'Italian Vachetta Leather',
			origin: 'Tuscany, Italy',
			tag: 'Vegetable Tanned',
			desc: 'Tanned with bark extracts over 60 days. Develops a rich amber patina.',
			collections: 'Horizon, Tuscan Series',
			href: '/materials/vachetta'
		},
		{
			name: 'Scottish Waxed Canvas',
			origin: 'Dundee, Scotland',
			tag: 'Weatherproof',
			desc: '18oz tightly woven cotton dipped in paraffin wax. Repels wind and torrential rain.',
			collections: 'Chore Coats, Field Bags',
			href: '/materials/waxed-canvas'
		},
		{
			name: '18.5µ Australian Merino',
			origin: 'New South Wales, Australia',
			tag: 'Thermoregulating',
			desc: 'Ultra-fine non-scratch wool that regulates body heat and resists odors naturally.',
			collections: 'Knitwear, Blankets',
			href: '/materials/merino-wool'
		},
		{
			name: 'Grade 5 Aerospace Titanium',
			origin: 'Sendai, Japan',
			tag: 'Ultralight Metal',
			desc: 'High strength-to-weight ratio with hypoallergenic matte bead-blasted finish.',
			collections: 'Hardware, Money Clips',
			href: '/materials/titanium'
		}
	];

	// =========================================================================
	// 2. REACTIVE FILTERING & DYNAMIC STATE
	// =========================================================================
	let searchQuery = $state('');
	let selectedCategory = $state('All');
	let sortBy = $state<'featured' | 'pieces' | 'rating' | 'name'>('featured');
	let viewLayout = $state<'curated' | 'compact'>('curated');

	const categories = [
		'All',
		'Travel & Carry',
		'Leather & Heritage',
		'Work & Tech',
		'Apparel & Transit',
		'Mindful Home',
		'Archive Releases'
	];

	let filteredCollections = $derived.by(() => {
		let result = allCollections;

		if (selectedCategory !== 'All') {
			result = result.filter((c) => c.category === selectedCategory);
		}

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			result = result.filter(
				(c) =>
					c.title.toLowerCase().includes(q) ||
					c.tagline.toLowerCase().includes(q) ||
					c.description.toLowerCase().includes(q) ||
					c.materials.some((m) => m.toLowerCase().includes(q))
			);
		}

		return [...result].sort((a, b) => {
			switch (sortBy) {
				case 'pieces':
					return b.itemCount - a.itemCount;
				case 'rating':
					return b.rating - a.rating;
				case 'name':
					return a.title.localeCompare(b.title);
				default:
					return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
			}
		});
	});

	function resetFilters() {
		searchQuery = '';
		selectedCategory = 'All';
		sortBy = 'featured';
	}
</script>

<svelte:head>
	<title>Curated Collections & Capsules | Radius</title>
	<meta
		name="description"
		content="Explore curated edits and capsule collections of handcrafted leather goods, modular travel gear, apparel, and design objects."
	/>
</svelte:head>

<div class="space-y-16 sm:space-y-24 py-6 sm:py-8 md:py-16">
	<!-- 1. PAGE HEADER & INTRO -->
	<header class="space-y-4">
		<div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-700">
			<Compass class="h-3.5 w-3.5 text-violet-600" />
			<span>Curated Capsules & Edits</span>
		</div>
		<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
			<div>
				<h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-gray-900 tracking-tight">
					Curated Collections
				</h1>
				<p class="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
					Each capsule represents a focused study in material integrity, maker traditions, and
					functional design. Explore seasonal releases, permanent studio anchors, and limited
					collaborations.
				</p>
			</div>

			<!-- Dynamic stats summary -->
			<div class="flex items-center gap-6 rounded-2xl bg-gray-50 border border-gray-200/80 px-6 py-4 shrink-0">
				<div>
					<span class="text-2xl font-serif font-bold text-gray-950">{allCollections.length}</span>
					<p class="text-xs text-gray-500 font-medium">Curated Capsules</p>
				</div>
				<div class="h-8 w-px bg-gray-200"></div>
				<div>
					<span class="text-2xl font-serif font-bold text-gray-950">140+</span>
					<p class="text-xs text-gray-500 font-medium">Handcrafted Pieces</p>
				</div>
				<div class="h-8 w-px bg-gray-200"></div>
				<div>
					<span class="text-2xl font-serif font-bold text-gray-950">100%</span>
					<p class="text-xs text-gray-500 font-medium">Traceable Materials</p>
				</div>
			</div>
		</div>
	</header>

	<!-- 2. INTERACTIVE CONTROL BAR (SEARCH, CATEGORY TABS, SORT & VIEW SWITCH) -->
	<section class="rounded-3xl bg-neutral-900 text-white p-5 sm:p-6 shadow-xl space-y-5">
		<div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
			<!-- Search bar -->
			<div class="relative flex-1 max-w-md">
				<Search class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search capsules by name, material, or keyword..."
					class="w-full rounded-full border border-gray-700 bg-neutral-800 py-2.5 pl-10 pr-10 text-sm text-white placeholder-gray-400 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
				/>
				{#if searchQuery}
					<button
						onclick={() => (searchQuery = '')}
						class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
					>
						<X class="h-4 w-4" />
					</button>
				{/if}
			</div>

			<!-- Sort & View Controls -->
			<div class="flex items-center gap-3 self-end md:self-auto">
				<!-- Sort dropdown -->
				<select
					bind:value={sortBy}
					class="rounded-full border border-gray-700 bg-neutral-800 px-4 py-2 text-xs font-medium text-gray-200 hover:bg-neutral-700 cursor-pointer focus:outline-none focus:border-white"
				>
					<option value="featured">Sort: Featured</option>
					<option value="pieces">Sort: Most Pieces</option>
					<option value="rating">Sort: Highest Rated</option>
					<option value="name">Sort: Name (A-Z)</option>
				</select>

				<!-- View Mode Toggle -->
				<div class="flex items-center rounded-full bg-neutral-800 p-1 border border-gray-700">
					<button
						onclick={() => (viewLayout = 'curated')}
						class={[
							'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer',
							viewLayout === 'curated' ? 'bg-white text-gray-900 font-semibold' : 'text-gray-400 hover:text-white'
						]}
					>
						<LayoutGrid class="h-3.5 w-3.5" />
						<span>Curated</span>
					</button>
					<button
						onclick={() => (viewLayout = 'compact')}
						class={[
							'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer',
							viewLayout === 'compact' ? 'bg-white text-gray-900 font-semibold' : 'text-gray-400 hover:text-white'
						]}
					>
						<Grid class="h-3.5 w-3.5" />
						<span>Grid</span>
					</button>
				</div>
			</div>
		</div>

		<!-- Category Filter Pills -->
		<div class="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-800">
			{#each categories as cat}
				<button
					onclick={() => (selectedCategory = cat)}
					class={[
						'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer',
						selectedCategory === cat
							? 'bg-white text-neutral-900 font-semibold shadow-sm'
							: 'bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white'
					]}
				>
					{cat}
				</button>
			{/each}

			{#if selectedCategory !== 'All' || searchQuery}
				<button
					onclick={resetFilters}
					class="ml-auto text-xs text-amber-300 hover:text-amber-200 underline underline-offset-4 cursor-pointer"
				>
					Clear filters
				</button>
			{/if}
		</div>
	</section>

	{#if filteredCollections.length === 0}
		<!-- Empty State -->
		<div class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-16 text-center">
			<Compass class="h-10 w-10 text-gray-400 mb-3" />
			<h3 class="text-xl font-serif font-semibold text-gray-900">No collections match your criteria</h3>
			<p class="mt-1 text-sm text-gray-500 max-w-sm">
				Try clearing your search query or selecting another category filter.
			</p>
			<div class="mt-6">
				<Button variant="default" size="sm" onclick={resetFilters}>Reset all filters</Button>
			</div>
		</div>
	{:else if viewLayout === 'compact'}
		<!-- COMPACT GRID VIEW (FOR RAPID SCANNING) -->
		<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
			{#each filteredCollections as col (col.id)}
				<a
					href="/collections/{col.slug}"
					class="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300"
				>
					<div class="relative aspect-16/10 overflow-hidden bg-gray-100">
						<img
							src={col.image}
							alt={col.title}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							loading="lazy"
						/>
						<div class="absolute inset-0 bg-linear-to-t from-gray-950/70 via-transparent to-black/20"></div>

						{#if col.badge}
							<span class="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm">
								{col.badge}
							</span>
						{/if}

						<span class="absolute top-4 right-4 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-0.5 text-xs text-white">
							{col.itemCount} pieces
						</span>
					</div>

					<div class="flex flex-1 flex-col p-6">
						<div class="flex items-center gap-2 text-xs font-semibold text-violet-800 uppercase tracking-wider">
							<span>{col.category}</span>
							<span class="text-gray-300">•</span>
							<span class="text-gray-500 font-normal">{col.season}</span>
						</div>

						<h3 class="mt-2 text-xl font-serif font-semibold text-gray-900 group-hover:text-violet-900 transition-colors">
							{col.title}
						</h3>

						<p class="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
							{col.description}
						</p>

						<div class="mt-auto pt-6 flex items-center justify-between border-t border-gray-100">
							<div class="text-xs text-gray-500">
								<span class="font-medium text-gray-900">{col.artisan.workshop}</span> ({col.artisan.location})
							</div>
							<div class="inline-flex items-center gap-1 text-xs font-semibold text-gray-900 group-hover:text-violet-700">
								<span>Explore</span>
								<ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
							</div>
						</div>
					</div>
				</a>
			{/each}
		</section>
	{:else}
		<!-- CURATED STORY VIEW: ASYMMETRIC COMBINATIONS & SPOTLIGHTS -->

		<!-- SECTION A: 7 / 5 ASYMMETRIC SPLIT (BANNERSECTION + DYNAMIC CARD) -->
		<section class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
			<!-- Left: 7 Cols BannerSection with Custom Children -->
			<div class="lg:col-span-7 flex">
				<BannerSection
					title="The Weekend Escape Capsule"
					subtitle="Durable water-repellent canvas weekender bags, compression packing cubes, and heritage dopp kits engineered for seamless 72-hour getaways."
					bgImage="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200&h=800&fit=crop"
					textColor="text-white"
					overlayOpacity="bg-gray-950/50"
					align="left"
					aspectRatio="min-h-[460px] lg:min-h-full w-full"
					class="my-0 shadow-xl"
				>
					<div class="flex flex-wrap items-center gap-3">
						<Button variant="white" href="/collections/weekend-escape" class="gap-2">
							<span>Shop The Weekend Escape</span>
							<ArrowRight class="h-4 w-4" />
						</Button>
						<span class="rounded-full bg-white/15 backdrop-blur-md px-3.5 py-2 text-xs font-medium text-white">
							18 Curated Pieces • 4.9 Rating
						</span>
					</div>
				</BannerSection>
			</div>

			<!-- Right: 5 Cols DynamicCard with No Full-Width Buttons -->
			<div class="lg:col-span-5 flex">
				<DynamicCard
					bgImage="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop"
					overlayOpacity="bg-gray-950/55"
					aspectRatio="min-h-[460px] lg:min-h-full w-full"
					class="shadow-xl"
				>
					<div class="flex items-center justify-between">
						<span class="rounded-full bg-amber-400/90 text-gray-950 px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
							Artisan Spotlight
						</span>
						<span class="text-xs text-white/80 font-mono">Series № 08</span>
					</div>

					<div class="mt-auto pt-16">
						<h2 class="text-3xl sm:text-4xl font-serif font-semibold text-white tracking-tight">
							Tuscan Leather Craft
						</h2>
						<p class="mt-2 text-sm text-gray-200 leading-relaxed">
							Hand-buffed vegetable-tanned hides from Florence. Each bag and accessory develops an
							unrivaled patina unique to its owner.
						</p>

						<div class="mt-6">
							<Button variant="white" href="/collections/artisan-leather" class="gap-2">
								<span>Explore Leather Archive</span>
								<ArrowRight class="h-4 w-4" />
							</Button>
						</div>
					</div>
				</DynamicCard>
			</div>
		</section>

		<!-- SECTION B: EMBEDDED COLLECTION SPOTLIGHT WITH PRODUCT CARDS -->
		<section class="rounded-3xl bg-gray-50 border border-gray-200/90 p-6 sm:p-10 shadow-sm">
			<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
				<div>
					<div class="flex items-center gap-2 text-xs font-semibold text-violet-800 uppercase tracking-wider">
						<Flame class="h-4 w-4 text-amber-500" />
						<span>Featured In-Collection Preview</span>
					</div>
					<h2 class="mt-1 text-3xl sm:text-4xl font-serif font-semibold text-gray-900 tracking-tight">
						Inside The Weekend Escape Collection
					</h2>
					<p class="mt-2 text-sm text-gray-600 max-w-xl">
						Explore key essentials from our flagship travel capsule, engineered for modularity and seamless carry.
					</p>
				</div>

				<div class="shrink-0">
					<Button variant="outline" href="/collections/weekend-escape" class="gap-2 text-gray-900 border-gray-400 hover:bg-gray-100">
						<span>View Full 18-Piece Capsule</span>
						<ChevronRight class="h-4 w-4" />
					</Button>
				</div>
			</div>

			<!-- Product Showcase Grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each spotlightProducts as product (product.id)}
					<ProductCard
						{product}
						isOnSale={product.price.discountedAmount !== undefined &&
							product.price.discountedAmount < product.price.amount}
					/>
				{/each}
			</div>
		</section>

		<!-- SECTION C: 3-COLUMN EQUAL DYNAMIC CARDS -->
		<section>
			<div class="mb-6 flex items-center justify-between">
				<div>
					<h2 class="text-2xl sm:text-3xl font-serif font-semibold text-gray-900 tracking-tight">
						Workplace & Daily Carry
					</h2>
					<p class="text-sm text-gray-500 mt-1">Tools and organizers designed for focused clarity.</p>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<!-- Card 1 -->
				<DynamicCard
					bgImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=700&fit=crop"
					overlayOpacity="bg-gray-950/50"
					aspectRatio="min-h-[380px]"
					class="shadow-md hover:shadow-xl"
				>
					<div class="flex items-center justify-between">
						<span class="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
							Tech & Workspace
						</span>
						<span class="text-xs text-white/80">14 items</span>
					</div>
					<div class="mt-auto">
						<h3 class="text-2xl font-serif font-semibold text-white">Minimal Desk Setup</h3>
						<p class="mt-1 text-xs sm:text-sm text-gray-200 line-clamp-2">
							Felt laptop sleeves, cable trays, and full-grain leather desk blotters.
						</p>
						<div class="mt-4">
							<Button variant="white" size="xs" href="/collections/minimal-desk" class="gap-1.5">
								<span>Shop Desk</span>
								<ArrowRight class="h-3 w-3" />
							</Button>
						</div>
					</div>
				</DynamicCard>

				<!-- Card 2 -->
				<DynamicCard
					bgImage="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=700&fit=crop"
					overlayOpacity="bg-gray-950/50"
					aspectRatio="min-h-[380px]"
					class="shadow-md hover:shadow-xl"
				>
					<div class="flex items-center justify-between">
						<span class="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
							Outerwear
						</span>
						<span class="text-xs text-white/80">16 items</span>
					</div>
					<div class="mt-auto">
						<h3 class="text-2xl font-serif font-semibold text-white">All-Weather Transit</h3>
						<p class="mt-1 text-xs sm:text-sm text-gray-200 line-clamp-2">
							Waxed canvas chore coats, water-repellent shells, and merino base layers.
						</p>
						<div class="mt-4">
							<Button variant="white" size="xs" href="/collections/weather-proof" class="gap-1.5">
								<span>Shop Transit</span>
								<ArrowRight class="h-3 w-3" />
							</Button>
						</div>
					</div>
				</DynamicCard>

				<!-- Card 3 -->
				<DynamicCard
					bgImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=700&fit=crop"
					overlayOpacity="bg-gray-950/50"
					aspectRatio="min-h-[380px]"
					class="shadow-md hover:shadow-xl"
				>
					<div class="flex items-center justify-between">
						<span class="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
							Home & Studio
						</span>
						<span class="text-xs text-white/80">22 items</span>
					</div>
					<div class="mt-auto">
						<h3 class="text-2xl font-serif font-semibold text-white">Mindful Home & Objects</h3>
						<p class="mt-1 text-xs sm:text-sm text-gray-200 line-clamp-2">
							Wheel-thrown stoneware, organic linen throws, and soy wax ambient candles.
						</p>
						<div class="mt-4">
							<Button variant="white" size="xs" href="/collections/mindful-home" class="gap-1.5">
								<span>Shop Home</span>
								<ArrowRight class="h-3 w-3" />
							</Button>
						</div>
					</div>
				</DynamicCard>
			</div>
		</section>

		<!-- SECTION D: MATERIAL & CRAFT TAXONOMY EXPLORER -->
		<section class="rounded-3xl bg-[#141822] text-white p-8 sm:p-12 shadow-xl border border-gray-800">
			<div class="max-w-2xl mb-10">
				<span class="text-xs font-semibold uppercase tracking-wider text-amber-400">
					Material Integrity
				</span>
				<h2 class="mt-1 text-3xl sm:text-4xl font-serif font-semibold text-white tracking-tight">
					Crafted from Raw, Proven Ingredients
				</h2>
				<p class="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
					We source raw materials directly from heritage mills and tanneries that have perfected their
					craft across multiple generations.
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each materialTaxonomies as mat}
					<div class="rounded-2xl bg-[#1d2332] p-6 border border-gray-800 hover:border-gray-600 transition-colors flex flex-col justify-between">
						<div>
							<div class="flex items-center justify-between text-xs">
								<span class="font-semibold text-amber-300">{mat.tag}</span>
								<span class="text-gray-400 font-mono">{mat.origin}</span>
							</div>
							<h4 class="mt-3 text-lg font-serif font-semibold text-white">{mat.name}</h4>
							<p class="mt-2 text-xs text-gray-300 leading-relaxed">{mat.desc}</p>
						</div>

						<div class="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between text-xs">
							<span class="text-gray-400">Found in: <strong class="text-gray-200 font-medium">{mat.collections}</strong></span>
							<a href={mat.href} class="text-amber-300 hover:text-white inline-flex items-center gap-1 font-medium">
								<span>Specs</span>
								<ArrowRight class="h-3 w-3" />
							</a>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- SECTION E: WIDE PANORAMIC BANNERSECTION (ASPECT RATIO 21/9) -->
		<section>
			<BannerSection
				title="The Custom Monogram Archive"
				subtitle="Personalize your heirloom carry with complimentary hot-foil monogramming on all full-grain leather goods this season."
				bgImage="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&h=600&fit=crop"
				textColor="text-white"
				overlayOpacity="bg-gray-950/60"
				align="left"
				aspectRatio="aspect-[21/9] sm:aspect-[4/1] min-h-[340px]"
				class="my-0 shadow-xl"
			>
				<div class="flex flex-wrap items-center gap-4">
					<Button variant="white" href="/collections/monogram-archive" class="gap-2">
						<span>Personalize Your Piece</span>
						<ArrowRight class="h-4 w-4" />
					</Button>
					<div class="flex items-center gap-2 text-xs text-white/90 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
						<Sparkles class="h-4 w-4 text-amber-300" />
						<span>Gold Foil & Blind Emboss Available</span>
					</div>
				</div>
			</BannerSection>
		</section>

		<!-- SECTION F: INVERTED ASYMMETRIC SPLIT: 5 / 7 (DYNAMIC CARD + BANNERSECTION) -->
		<section class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
			<!-- Left: 5 Cols DynamicCard (Stealth Obsidian Capsule) -->
			<div class="lg:col-span-5 flex">
				<DynamicCard
					bgImage="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop"
					overlayOpacity="bg-gray-950/60"
					aspectRatio="min-h-[460px] lg:min-h-full w-full"
					class="shadow-xl"
				>
					<div class="flex items-center justify-between">
						<span class="rounded-full bg-red-600/90 text-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
							Limited Drop
						</span>
						<span class="text-xs text-white/80 font-mono">№ 024 / 250</span>
					</div>

					<div class="mt-auto pt-16">
						<h2 class="text-3xl sm:text-4xl font-serif font-semibold text-white tracking-tight">
							The Obsidian Matte Capsule
						</h2>
						<p class="mt-2 text-sm text-gray-200 leading-relaxed">
							Black-on-black ballistic cordura, matte PVD coated hardware, and stealth reflective
							details built for high-velocity commuters.
						</p>

						<div class="mt-6">
							<Button variant="white" href="/collections/obsidian-capsule" class="gap-2">
								<span>Shop Obsidian Capsule</span>
								<ArrowRight class="h-4 w-4" />
							</Button>
						</div>
					</div>
				</DynamicCard>
			</div>

			<!-- Right: 7 Cols BannerSection (Alpine Expedition) -->
			<div class="lg:col-span-7 flex">
				<BannerSection
					title="Alpine Expedition Systems"
					subtitle="Weatherproof ripstop roll-top bags, technical merino wool blankets, and lightweight titanium accessories built for rugged high-altitude trails."
					bgImage="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1200&h=800&fit=crop"
					textColor="text-white"
					overlayOpacity="bg-gray-950/50"
					align="left"
					aspectRatio="min-h-[460px] lg:min-h-full w-full"
					class="my-0 shadow-xl"
				>
					<div class="flex flex-wrap items-center gap-3">
						<Button variant="white" href="/collections/alpine-kit" class="gap-2">
							<span>Explore Alpine Kit</span>
							<ArrowRight class="h-4 w-4" />
						</Button>
						<span class="rounded-full bg-white/15 backdrop-blur-md px-3.5 py-2 text-xs font-medium text-white">
							Tested to -20°C
						</span>
					</div>
				</BannerSection>
			</div>
		</section>

		<!-- SECTION G: ARTISAN STUDIO STORY & MAKER PROFILE BLOCK -->
		<section class="rounded-3xl bg-neutral-100 border border-neutral-200/90 p-8 sm:p-12">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
				<div class="lg:col-span-6 space-y-4">
					<div class="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm">
						<MapPin class="h-3.5 w-3.5 text-red-500" />
						<span>Featured Studio • Florence, Italy</span>
					</div>
					<h3 class="text-3xl sm:text-4xl font-serif font-semibold text-gray-900">
						"A true heirloom isn't finished when it leaves our bench. It only truly begins when it enters your journey."
					</h3>
					<p class="text-sm text-gray-600 leading-relaxed">
						Meet Marco Bellini, third-generation leather craftsman at Studio Bellini in Florence.
						Every edge is hand-beveled and burnished with natural beeswax, ensuring zero fraying over decades of travel.
					</p>
					<div class="pt-2">
						<Button variant="default" href="/artisans/bellini" class="gap-2 w-fit">
							<span>Read Maker Story</span>
							<ArrowRight class="h-4 w-4" />
						</Button>
					</div>
				</div>

				<div class="lg:col-span-6 grid grid-cols-2 gap-4">
					<img
						src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=800&fit=crop"
						alt="Artisan at work"
						class="rounded-2xl object-cover h-64 sm:h-80 w-full shadow-md"
						loading="lazy"
					/>
					<img
						src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop"
						alt="Hand stitching details"
						class="rounded-2xl object-cover h-64 sm:h-80 w-full shadow-md mt-6"
						loading="lazy"
					/>
				</div>
			</div>
		</section>

		<!-- SECTION H: 4-CARD MOSAIC (8/4 TOP, 4/8 BOTTOM) -->
		<section class="space-y-6">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-2xl sm:text-3xl font-serif font-semibold text-gray-900 tracking-tight">
						Specialized Capsule Series
					</h2>
					<p class="text-sm text-gray-500 mt-1">
						Unique material combinations organized by workshop specializations.
					</p>
				</div>
			</div>

			<!-- Row 1: 8 Cols + 4 Cols -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
				<!-- 8 Cols Dynamic Card -->
				<div class="lg:col-span-8 flex">
					<DynamicCard
						bgImage="https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&h=600&fit=crop"
						overlayOpacity="bg-gray-950/50"
						aspectRatio="min-h-[360px] w-full"
						class="shadow-lg"
					>
						<div class="flex items-center justify-between">
							<span class="rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white">
								Small Leather Goods
							</span>
							<span class="text-xs text-white/80">35 Products</span>
						</div>
						<div class="mt-auto">
							<h3 class="text-2xl sm:text-3xl font-serif font-semibold text-white">
								Minimalist Wallets & Cardholders
							</h3>
							<p class="mt-2 text-sm text-gray-200 max-w-xl">
								Ultra-slim bifolds, RFID-blocking cardholders, and titanium money clips designed to
								eliminate pocket bulk.
							</p>
							<div class="mt-5">
								<Button variant="white" href="/categories/accessories" class="gap-2">
									<span>Shop Wallets</span>
									<ArrowRight class="h-4 w-4" />
								</Button>
							</div>
						</div>
					</DynamicCard>
				</div>

				<!-- 4 Cols Dynamic Card -->
				<div class="lg:col-span-4 flex">
					<DynamicCard
						bgImage="https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=600&h=600&fit=crop"
						overlayOpacity="bg-gray-950/50"
						aspectRatio="min-h-[360px] w-full"
						class="shadow-lg"
					>
						<div class="flex items-center justify-between">
							<span class="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
								Headwear
							</span>
							<span class="text-xs text-white/80">8 items</span>
						</div>
						<div class="mt-auto">
							<h3 class="text-2xl font-serif font-semibold text-white">Waxed Field Hats</h3>
							<p class="mt-1 text-xs text-gray-300">Weatherproof canvas caps & bucket hats.</p>
							<div class="mt-4">
								<Button variant="white" size="xs" href="/collections/headwear" class="gap-1">
									<span>Explore Hats</span>
									<ArrowRight class="h-3 w-3" />
								</Button>
							</div>
						</div>
					</DynamicCard>
				</div>
			</div>

			<!-- Row 2: 4 Cols + 8 Cols -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
				<!-- 4 Cols Dynamic Card -->
				<div class="lg:col-span-4 flex">
					<DynamicCard
						bgImage="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop"
						overlayOpacity="bg-gray-950/50"
						aspectRatio="min-h-[360px] w-full"
						class="shadow-lg"
					>
						<div class="flex items-center justify-between">
							<span class="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
								Footwear
							</span>
							<span class="text-xs text-white/80">12 items</span>
						</div>
						<div class="mt-auto">
							<h3 class="text-2xl font-serif font-semibold text-white">Artisan Low-Tops</h3>
							<p class="mt-1 text-xs text-gray-300">Margom rubber soles with Italian calfskin.</p>
							<div class="mt-4">
								<Button variant="white" size="xs" href="/categories/footwear" class="gap-1">
									<span>Shop Shoes</span>
									<ArrowRight class="h-3 w-3" />
								</Button>
							</div>
						</div>
					</DynamicCard>
				</div>

				<!-- 8 Cols Dynamic Card -->
				<div class="lg:col-span-8 flex">
					<DynamicCard
						bgImage="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=600&fit=crop"
						overlayOpacity="bg-gray-950/50"
						aspectRatio="min-h-[360px] w-full"
						class="shadow-lg"
					>
						<div class="flex items-center justify-between">
							<span class="rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white">
								Knitwear
							</span>
							<span class="text-xs text-white/80">20 Products</span>
						</div>
						<div class="mt-auto">
							<h3 class="text-2xl sm:text-3xl font-serif font-semibold text-white">
								Ultra-Fine Merino Wool Collection
							</h3>
							<p class="mt-2 text-sm text-gray-200 max-w-xl">
								Naturally thermoregulating, odor-resistant Australian merino wool knitted into seamless
								crews, cardigans, and travel blankets.
							</p>
							<div class="mt-5">
								<Button variant="white" href="/categories/fashion" class="gap-2">
									<span>Shop Merino Knitwear</span>
									<ArrowRight class="h-4 w-4" />
								</Button>
							</div>
						</div>
					</DynamicCard>
				</div>
			</div>
		</section>

		<!-- SECTION I: 5/1 PANORAMIC LOOKBOOK BANNER -->
		<section>
			<BannerSection
				title="Spring / Summer 2026 Lookbook"
				subtitle="An editorial exploration of light canvas, unlined leather totes, and sun-washed tones captured on the Amalfi Coast."
				bgImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=500&fit=crop"
				textColor="text-white"
				overlayOpacity="bg-gray-950/50"
				align="left"
				aspectRatio="aspect-[21/9] sm:aspect-[5/1] min-h-[280px]"
				class="my-0 shadow-lg"
			>
				<div class="flex flex-wrap items-center gap-4">
					<Button variant="white" href="/collections/lookbook-ss26" class="gap-2">
						<span>View SS26 Lookbook</span>
						<ArrowRight class="h-4 w-4" />
					</Button>
				</div>
			</BannerSection>
		</section>
	{/if}

	<!-- 8. ARTISAN ARCHIVE STATS & CRAFTSMANSHIP BAR -->
	<section class="rounded-3xl bg-neutral-100 p-8 sm:p-12 border border-neutral-200">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
			<div class="border-b sm:border-b-0 sm:border-r border-neutral-300/80 pb-6 sm:pb-0 sm:pr-6">
				<span class="text-3xl sm:text-4xl font-serif font-bold text-gray-950">14</span>
				<h4 class="mt-1 text-sm font-semibold text-gray-900">Independent Studios</h4>
				<p class="mt-1 text-xs text-gray-600">Family-owned workshops across Italy, Japan, & USA.</p>
			</div>

			<div class="border-b sm:border-b-0 sm:border-r border-neutral-300/80 pb-6 sm:pb-0 sm:pr-6">
				<span class="text-3xl sm:text-4xl font-serif font-bold text-gray-950">100%</span>
				<h4 class="mt-1 text-sm font-semibold text-gray-900">Traceable Materials</h4>
				<p class="mt-1 text-xs text-gray-600">Certified organic cotton, vegetable-tanned hides.</p>
			</div>

			<div class="border-b sm:border-b-0 sm:border-r border-neutral-300/80 pb-6 sm:pb-0 sm:pr-6">
				<span class="text-3xl sm:text-4xl font-serif font-bold text-gray-950">10-Yr</span>
				<h4 class="mt-1 text-sm font-semibold text-gray-900">Repair Warranty</h4>
				<p class="mt-1 text-xs text-gray-600">Complimentary hardware & seam restoration.</p>
			</div>

			<div>
				<span class="text-3xl sm:text-4xl font-serif font-bold text-gray-950">0 Net</span>
				<h4 class="mt-1 text-sm font-semibold text-gray-900">Carbon Footprint</h4>
				<p class="mt-1 text-xs text-gray-600">100% verified offset on all global shipping.</p>
			</div>
		</div>
	</section>
</div>
