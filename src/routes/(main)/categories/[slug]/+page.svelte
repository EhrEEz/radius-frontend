<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { ChevronDown, X, SlidersHorizontal } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/Button';

	import BannerSection from '$lib/components/layout/BannerSection.svelte';
	import FilterSidebar from '$lib/components/layout/FilterSidebar.svelte';
	import Pagination from '$lib/components/layout/Pagination.svelte';
	import RecommendedProducts from '$lib/components/sections/RecommendedProducts.svelte';
	import ProductCard from '$lib/components/product/ProductCard.svelte';

	import type { ProductCard as ProductCardType } from '$lib/types/product';

	// --- Mock Data ---
	type FilterableProduct = ProductCardType & { categories?: string[] };

	const allProducts: FilterableProduct[] = [
		// --- BAGS ---
		{
			id: '1',
			slug: 'horizon-weekender',
			title: 'The Horizon Leather Weekender',
			categories: ['Bags', 'Travel'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
					alt: 'Weekender Bag'
				}
			],
			price: { amount: 450.0, currency: 'USD', discountedAmount: 395.0 },
			rating: { average: 4.8, count: 124 }
		},
		{
			id: '2',
			slug: 'summit-backpack',
			title: 'The Summit Hiking Backpack',
			categories: ['Bags', 'Outdoor'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=400&fit=crop',
					alt: 'Backpack'
				}
			],
			price: { amount: 150.0, currency: 'USD' },
			rating: { average: 4.9, count: 88 }
		},
		{
			id: '3',
			slug: 'weekend-canvas-tote',
			title: 'Weekend Canvas Tote',
			categories: ['Bags', 'Travel'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
					alt: 'Canvas Tote'
				}
			],
			price: { amount: 85.0, currency: 'USD', discountedAmount: 68.0 },
			rating: { average: 4.4, count: 67 }
		},
		{
			id: '7',
			slug: 'executive-messenger',
			title: 'The Executive Messenger Bag',
			categories: ['Bags', 'Work'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
					alt: 'Messenger Bag'
				}
			],
			price: { amount: 220.0, currency: 'USD' },
			rating: { average: 4.7, count: 56 }
		},
		{
			id: '8',
			slug: 'urban-laptop-sleeve',
			title: 'Urban Laptop Sleeve 15"',
			categories: ['Bags', 'Tech'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop',
					alt: 'Laptop Sleeve'
				}
			],
			price: { amount: 65.0, currency: 'USD', discountedAmount: 55.0 },
			rating: { average: 4.6, count: 210 }
		},
		{
			id: '9',
			slug: 'nomad-duffel',
			title: 'The Nomad Canvas Duffel',
			categories: ['Bags', 'Travel'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
					alt: 'Duffel Bag'
				}
			],
			price: { amount: 135.0, currency: 'USD' },
			rating: { average: 4.5, count: 92 }
		},
		{
			id: '10',
			slug: 'compact-crossbody-sling',
			title: 'Compact Crossbody Sling',
			categories: ['Bags', 'Accessories'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
					alt: 'Crossbody Sling'
				}
			],
			price: { amount: 75.0, currency: 'USD' },
			rating: { average: 4.8, count: 145 }
		},
		{
			id: '11',
			slug: 'artisan-leather-clutch',
			title: 'Artisan Leather Clutch',
			categories: ['Bags', 'Accessories'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
					alt: 'Leather Clutch'
				}
			],
			price: { amount: 95.0, currency: 'USD', discountedAmount: 80.0 },
			rating: { average: 4.9, count: 78 }
		},

		// --- ACCESSORIES & WALLETS ---
		{
			id: '4',
			slug: 'voyager-wallet',
			title: 'The Voyager Leather Wallet',
			categories: ['Accessories', 'Wallets'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
					alt: 'Leather Wallet'
				}
			],
			price: { amount: 85.0, currency: 'USD', discountedAmount: 75.0 },
			rating: { average: 4.9, count: 342 }
		},
		{
			id: '6',
			slug: 'minimalist-cardholder',
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
			id: '12',
			slug: 'zippered-coin-pouch',
			title: 'Heritage Zippered Coin Pouch',
			categories: ['Accessories', 'Wallets'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1606503825008-909a6184a498?w=400&h=400&fit=crop',
					alt: 'Coin Pouch'
				}
			],
			price: { amount: 35.0, currency: 'USD' },
			rating: { average: 4.7, count: 89 }
		},
		{
			id: '13',
			slug: 'rfid-passport-holder',
			title: 'RFID Blocking Passport Holder',
			categories: ['Travel', 'Accessories'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
					alt: 'Passport Holder'
				}
			],
			price: { amount: 40.0, currency: 'USD', discountedAmount: 32.0 },
			rating: { average: 4.8, count: 201 }
		},
		{
			id: '14',
			slug: 'slimline-money-clip',
			title: 'Slimline Titanium Money Clip',
			categories: ['Accessories', 'Wallets'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
					alt: 'Money Clip'
				}
			],
			price: { amount: 55.0, currency: 'USD' },
			rating: { average: 4.6, count: 112 }
		},
		{
			id: '15',
			slug: 'key-organizer',
			title: 'Compact Key Organizer',
			categories: ['Accessories'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
					alt: 'Key Organizer'
				}
			],
			price: { amount: 30.0, currency: 'USD' },
			rating: { average: 4.4, count: 305 }
		},

		// --- BELTS ---
		{
			id: '5',
			slug: 'classic-belt',
			title: 'Classic Reversible Leather Belt',
			categories: ['Accessories', 'Belts'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=400&fit=crop',
					alt: 'Leather Belt'
				}
			],
			price: { amount: 120.0, currency: 'USD' },
			rating: { average: 4.6, count: 210 }
		},
		{
			id: '16',
			slug: 'woven-canvas-belt',
			title: 'Woven Canvas Casual Belt',
			categories: ['Accessories', 'Belts'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=400&fit=crop',
					alt: 'Canvas Belt'
				}
			],
			price: { amount: 45.0, currency: 'USD', discountedAmount: 38.0 },
			rating: { average: 4.3, count: 76 }
		},
		{
			id: '17',
			slug: 'braided-elastic-belt',
			title: 'Braided Elastic Travel Belt',
			categories: ['Accessories', 'Belts', 'Travel'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=400&fit=crop',
					alt: 'Elastic Belt'
				}
			],
			price: { amount: 50.0, currency: 'USD' },
			rating: { average: 4.7, count: 134 }
		},

		// --- TRAVEL GEAR ---
		{
			id: '18',
			slug: 'heritage-dopp-kit',
			title: 'Heritage Canvas Dopp Kit',
			categories: ['Travel', 'Accessories'],
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
			id: '19',
			slug: 'monogrammed-luggage-tags',
			title: 'Monogrammed Leather Luggage Tags (Set of 2)',
			categories: ['Travel', 'Accessories'],
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
			id: '20',
			slug: 'premium-garment-bag',
			title: 'Premium Waterproof Garment Bag',
			categories: ['Travel', 'Bags'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
					alt: 'Garment Bag'
				}
			],
			price: { amount: 110.0, currency: 'USD', discountedAmount: 95.0 },
			rating: { average: 4.5, count: 62 }
		},
		{
			id: '21',
			slug: 'compression-packing-cubes',
			title: 'Compression Packing Cubes (Set of 3)',
			categories: ['Travel', 'Accessories'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
					alt: 'Packing Cubes'
				}
			],
			price: { amount: 55.0, currency: 'USD' },
			rating: { average: 4.9, count: 412 }
		},
		{
			id: '22',
			slug: 'merino-travel-blanket',
			title: 'Merino Wool Travel Blanket',
			categories: ['Travel', 'Outdoor'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=400&h=400&fit=crop',
					alt: 'Travel Blanket'
				}
			],
			price: { amount: 85.0, currency: 'USD' },
			rating: { average: 4.8, count: 156 }
		},

		// --- FOOTWEAR & APPAREL ---
		{
			id: '23',
			slug: 'classic-leather-sneakers',
			title: 'Classic Minimalist Leather Sneakers',
			categories: ['Footwear', 'Casual'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop',
					alt: 'Leather Sneakers'
				}
			],
			price: { amount: 165.0, currency: 'USD', discountedAmount: 140.0 },
			rating: { average: 4.7, count: 230 }
		},
		{
			id: '24',
			slug: 'waterproof-canvas-slipons',
			title: 'Waterproof Canvas Slip-Ons',
			categories: ['Footwear', 'Outdoor'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&h=400&fit=crop',
					alt: 'Canvas Slip-Ons'
				}
			],
			price: { amount: 75.0, currency: 'USD' },
			rating: { average: 4.4, count: 98 }
		},
		{
			id: '25',
			slug: 'heritage-chore-coat',
			title: 'Heritage Canvas Chore Coat',
			categories: ['Apparel', 'Outerwear'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
					alt: 'Chore Coat'
				}
			],
			price: { amount: 185.0, currency: 'USD' },
			rating: { average: 4.8, count: 115 }
		},
		{
			id: '26',
			slug: 'merino-wool-sweater',
			title: 'Merino Wool Crew Sweater',
			categories: ['Apparel', 'Basics'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
					alt: 'Wool Sweater'
				}
			],
			price: { amount: 125.0, currency: 'USD', discountedAmount: 105.0 },
			rating: { average: 4.9, count: 288 }
		},
		{
			id: '27',
			slug: 'waterproof-rain-jacket',
			title: 'Lightweight Waterproof Rain Jacket',
			categories: ['Apparel', 'Outerwear', 'Outdoor'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1544923246-77307dd628b9?w=400&h=400&fit=crop',
					alt: 'Rain Jacket'
				}
			],
			price: { amount: 145.0, currency: 'USD' },
			rating: { average: 4.6, count: 175 }
		},

		// --- EXTRA ACCESSORIES ---
		{
			id: '28',
			slug: 'leather-watch-strap',
			title: 'Genuine Leather Watch Strap',
			categories: ['Accessories', 'Jewelry'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop',
					alt: 'Watch Strap'
				}
			],
			price: { amount: 45.0, currency: 'USD' },
			rating: { average: 4.7, count: 89 }
		},
		{
			id: '29',
			slug: 'silk-pocket-square',
			title: 'Patterned Silk Pocket Square',
			categories: ['Accessories', 'Apparel'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
					alt: 'Pocket Square'
				}
			],
			price: { amount: 35.0, currency: 'USD', discountedAmount: 28.0 },
			rating: { average: 4.5, count: 64 }
		},
		{
			id: '30',
			slug: 'canvas-field-hat',
			title: 'Waxed Canvas Field Hat',
			categories: ['Accessories', 'Outdoor'],
			images: [
				{
					url: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400&h=400&fit=crop',
					alt: 'Field Hat'
				}
			],
			price: { amount: 60.0, currency: 'USD' },
			rating: { average: 4.8, count: 142 }
		}
	];

	const recommendedProducts = allProducts.slice(2, 6);

	// --- 1. State (Initialized from URL) ---
	let searchQuery = $state(page.url.searchParams.get('q') || '');
	let allCategories = $derived(Array.from(new Set(allProducts.flatMap((p) => p.categories || []))));
	let selectedCategories = $state(page.url.searchParams.getAll('category'));
	let minPrice = $state(
		page.url.searchParams.get('minPrice')
			? Number(page.url.searchParams.get('minPrice'))
			: undefined
	);
	let maxPrice = $state(
		page.url.searchParams.get('maxPrice')
			? Number(page.url.searchParams.get('maxPrice'))
			: undefined
	);
	let minRating = $state(
		page.url.searchParams.get('minRating')
			? Number(page.url.searchParams.get('minRating'))
			: undefined
	);
	let sortBy = $state(page.url.searchParams.get('sort') || 'featured');
	let currentPage = $state(Number(page.url.searchParams.get('page')) || 1);

	let isMobileFilterOpen = $state(false);
	const itemsPerPage = 8;

	// --- 2. Derived Data ---
	let filteredProducts = $derived.by(() => {
		let result = allProducts;
		if (searchQuery)
			result = result.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
		if (selectedCategories.length > 0)
			result = result.filter((p) => p.categories?.some((c) => selectedCategories.includes(c)));
		if (minPrice !== undefined)
			result = result.filter((p) => (p.price.discountedAmount ?? p.price.amount) >= minPrice!);
		if (maxPrice !== undefined)
			result = result.filter((p) => (p.price.discountedAmount ?? p.price.amount) <= maxPrice!);
		if (minRating !== undefined)
			result = result.filter((p) => (p.rating?.average ?? 0) >= minRating!);

		return [...result].sort((a, b) => {
			const priceA = a.price.discountedAmount ?? a.price.amount;
			const priceB = b.price.discountedAmount ?? b.price.amount;
			switch (sortBy) {
				case 'price_asc':
					return priceA - priceB;
				case 'price_desc':
					return priceB - priceA;
				case 'name_asc':
					return a.title.localeCompare(b.title);
				case 'rating_desc':
					return (b.rating?.average ?? 0) - (a.rating?.average ?? 0);
				default:
					return 0;
			}
		});
	});

	let totalPages = $derived(Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage)));
	let paginatedProducts = $derived(
		filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	// --- 3. URL Sync Helper ---
	function syncUrl() {
		const newUrl = new URL(page.url as URL);
		['q', 'category', 'minPrice', 'maxPrice', 'minRating', 'sort', 'page'].forEach((k) =>
			newUrl.searchParams.delete(k)
		);

		if (searchQuery) newUrl.searchParams.set('q', searchQuery);
		selectedCategories.forEach((c) => newUrl.searchParams.append('category', c));
		if (minPrice !== undefined) newUrl.searchParams.set('minPrice', String(minPrice));
		if (maxPrice !== undefined) newUrl.searchParams.set('maxPrice', String(maxPrice));
		if (minRating !== undefined) newUrl.searchParams.set('minRating', String(minRating));
		if (sortBy !== 'featured') newUrl.searchParams.set('sort', sortBy);
		if (currentPage > 1) newUrl.searchParams.set('page', String(currentPage));

		goto(newUrl.toString(), { replaceState: true, noScroll: true });
	}

	// --- 4. Event Handlers (Update State + Reset Page + Sync URL) ---
	function updateSearch(value: string) {
		searchQuery = value;
		currentPage = 1;
		syncUrl();
	}
	function toggleCategory(category: string) {
		selectedCategories = selectedCategories.includes(category)
			? selectedCategories.filter((c) => c !== category)
			: [...selectedCategories, category];
		currentPage = 1;
		syncUrl();
	}
	function updateMinPrice(value: string) {
		minPrice = value === '' ? undefined : Number(value);
		currentPage = 1;
		syncUrl();
	}
	function updateMaxPrice(value: string) {
		maxPrice = value === '' ? undefined : Number(value);
		currentPage = 1;
		syncUrl();
	}
	function updateMinRating(value: number | null) {
		minRating = value ?? undefined;
		currentPage = 1;
		syncUrl();
	}
	function updateSort(value: string) {
		sortBy = value;
		syncUrl();
	}
	function changePage(newPage: number) {
		currentPage = newPage;
		syncUrl();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	function clearAllFilters() {
		searchQuery = '';
		selectedCategories = [];
		minPrice = undefined;
		maxPrice = undefined;
		minRating = undefined;
		sortBy = 'featured';
		currentPage = 1;
		syncUrl();
	}

	// --- 5. Back/Forward Button Support (Single Source of Truth) ---
	$effect(() => {
		const url = page.url;
		const q = url.searchParams.get('q') || '';
		const cats = url.searchParams.getAll('category');
		const minP = url.searchParams.get('minPrice')
			? Number(url.searchParams.get('minPrice'))
			: undefined;
		const maxP = url.searchParams.get('maxPrice')
			? Number(url.searchParams.get('maxPrice'))
			: undefined;
		const minR = url.searchParams.get('minRating')
			? Number(url.searchParams.get('minRating'))
			: undefined;
		const sort = url.searchParams.get('sort') || 'featured';
		const p = Number(url.searchParams.get('page')) || 1;

		// Only update state if it differs from the URL.
		// Because syncUrl() runs first, these will evaluate to false, preventing infinite loops.
		if (q !== searchQuery) searchQuery = q;
		if (JSON.stringify(cats) !== JSON.stringify(selectedCategories)) selectedCategories = cats;
		if (minP !== minPrice) minPrice = minP;
		if (maxP !== maxPrice) maxPrice = maxP;
		if (minR !== minRating) minRating = minR;
		if (sort !== sortBy) sortBy = sort;
		if (p !== currentPage) currentPage = p;
	});
</script>

<svelte:head>
	<title>Bags | Radius</title>
</svelte:head>

<BannerSection
	title="Bags"
	subtitle="Crafted for the journey, designed for everyday life."
	bgColor="bg-amber-100"
	textColor="text-amber-950"
	overlayOpacity="bg-transparent"
	align="center"
/>

<div class="py-8">
	<!-- Header -->

	<div class="mb-8">
		<div class="flex flex-wrap items-center gap-4">
			<!-- Left Side: Filter Button + Active Filters -->
			<div class="flex flex-wrap items-center gap-3">
				<!-- Filter Toggle Button -->
				<button
					onclick={() => (isMobileFilterOpen = !isMobileFilterOpen)}
					class="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
				>
					<SlidersHorizontal class="h-4 w-4" />
					All Filters
				</button>

				<!-- Active Filter Pills -->
				{#if selectedCategories.length > 0 || minPrice || maxPrice || minRating || searchQuery}
					{#if searchQuery}
						<span
							class="inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-800"
						>
							Search: "{searchQuery}"
							<button onclick={() => updateSearch('')} class="hover:text-violet-700 ml-1">
								<X class="h-3 w-3" />
							</button>
						</span>
					{/if}

					{#each selectedCategories as category}
						<span
							class="inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-800"
						>
							{category}
							<button onclick={() => toggleCategory(category)} class="hover:text-violet-700 ml-1">
								<X class="h-3 w-3" />
							</button>
						</span>
					{/each}

					{#if minPrice || maxPrice}
						<span
							class="inline-flex items-center gap-1 rounded-full bg-violet-50 border border-violet-200 px-3 py-1.5 text-xs font-medium text-violet-900"
						>
							Price: {minPrice ? `$${minPrice}` : '$0'} - {maxPrice ? `$${maxPrice}` : '$∞'}
							<button
								onclick={() => {
									updateMinPrice('');
									updateMaxPrice('');
								}}
								class="hover:text-violet-700 ml-1"
							>
								<X class="h-3 w-3" />
							</button>
						</span>
					{/if}

					{#if minRating}
						<span
							class="inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-800"
						>
							{minRating}+ Stars
							<button onclick={() => updateMinRating(null)} class="hover:text-violet-700 ml-1">
								<X class="h-3 w-3" />
							</button>
						</span>
					{/if}
				{/if}
			</div>

			<!-- Right Side: Item Count + Sort -->
			<div class="ml-auto flex items-center gap-4">
				<span class="text-sm text-gray-600">{filteredProducts.length} products</span>

				<div class="relative">
					<select
						value={sortBy}
						onchange={(e) => updateSort(e.currentTarget.value)}
						class="appearance-none rounded-full border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:border-violet-950 focus:outline-none focus:ring-1 focus:ring-violet-950 cursor-pointer"
					>
						<option value="featured">Sort by: Featured</option>
						<option value="price_asc">Sort by: Price: Low to High</option>
						<option value="price_desc">Sort by: Price: High to Low</option>
						<option value="name_asc">Sort by: Name: A to Z</option>
						<option value="name_desc">Sort by: Name: Z to A</option>
						<option value="rating_desc">Sort by: Highest Rated</option>
					</select>
					<ChevronDown
						class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- Product Grid -->
	<div class="flex flex-col lg:flex-row items-start">
		<FilterSidebar
			bind:isMobileFilterOpen
			allCategories={[]}
			{selectedCategories}
			{minPrice}
			{maxPrice}
			{minRating}
			{searchQuery}
			onToggleCategory={toggleCategory}
			onUpdateMinPrice={updateMinPrice}
			onUpdateMaxPrice={updateMaxPrice}
			onUpdateMinRating={updateMinRating}
			onUpdateSearch={updateSearch}
			onClearAll={clearAllFilters}
		/>
		<div class="flex-1 w-full">
			{#if paginatedProducts.length > 0}
				<div
					class={[
						'grid grid-cols-1 gap-6 sm:grid-cols-2 ',
						isMobileFilterOpen
							? 'lg:grid-cols-3 xl:grid-cols-4'
							: 'sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'
					]}
				>
					{#each paginatedProducts as product (product.id)}
						<ProductCard
							{product}
							isOnSale={product.price.discountedAmount !== undefined &&
								product.price.discountedAmount < product.price.amount}
						/>
					{/each}
				</div>

				<Pagination {currentPage} {totalPages} onPageChange={changePage} />
			{:else}
				<div
					class="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center"
				>
					<p class="text-2xl font-medium text-gray-900 font-serif">Whoops! No products found</p>
					<p class="mt-1 text-sm text-gray-500">Try adjusting your filters or search query.</p>
					<Button class="mt-4" size="sm" onclick={clearAllFilters}>Clear all filters</Button>
				</div>
			{/if}
		</div>
	</div>

	<RecommendedProducts title="Also take a look at these products" products={recommendedProducts} />
</div>
