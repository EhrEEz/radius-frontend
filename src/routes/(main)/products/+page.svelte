<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import { SlidersHorizontal, X, Star, ChevronDown } from '@lucide/svelte';
	import type { ProductCard as ProductCardType } from '$lib/types/product';
	import { Button } from '$lib/components/ui/Button';

	// Extended type for mock data to include categories for filtering
	type FilterableProduct = ProductCardType & { categories?: string[] };

	// --- Mock Data Catalog ---
	const allProducts: FilterableProduct[] = [
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

	// --- 1. Local Reactive State (Initialized from URL) ---
	let searchQuery = $state(page.url.searchParams.get('q') || '');
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

	// --- 2. Derived Filtered & Sorted Products ---
	let displayProducts = $derived.by(() => {
		let result = allProducts;

		if (searchQuery) {
			const q = searchQuery.toLowerCase();
			result = result.filter((p) => p.title.toLowerCase().includes(q));
		}
		if (selectedCategories.length > 0) {
			result = result.filter((p) => p.categories?.some((c) => selectedCategories.includes(c)));
		}
		if (minPrice !== undefined) {
			result = result.filter((p) => (p.price.discountedAmount ?? p.price.amount) >= minPrice!);
		}
		if (maxPrice !== undefined) {
			result = result.filter((p) => (p.price.discountedAmount ?? p.price.amount) <= maxPrice!);
		}
		if (minRating !== undefined) {
			result = result.filter((p) => (p.rating?.average ?? 0) >= minRating!);
		}

		result = [...result].sort((a, b) => {
			const priceA = a.price.discountedAmount ?? a.price.amount;
			const priceB = b.price.discountedAmount ?? b.price.amount;

			switch (sortBy) {
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
				default:
					return 0;
			}
		});

		return result;
	});

	let allCategories = $derived(Array.from(new Set(allProducts.flatMap((p) => p.categories || []))));

	// --- 3. URL Sync Helper ---
	function syncUrl() {
		const newUrl = new URL(page.url as URL);
		['q', 'category', 'minPrice', 'maxPrice', 'minRating', 'sort'].forEach((k) =>
			newUrl.searchParams.delete(k)
		);

		if (searchQuery) newUrl.searchParams.set('q', searchQuery);
		selectedCategories.forEach((c) => newUrl.searchParams.append('category', c));
		if (minPrice !== undefined) newUrl.searchParams.set('minPrice', String(minPrice));
		if (maxPrice !== undefined) newUrl.searchParams.set('maxPrice', String(maxPrice));
		if (minRating !== undefined) newUrl.searchParams.set('minRating', String(minRating));
		if (sortBy !== 'featured') newUrl.searchParams.set('sort', sortBy);

		// replaceState: true prevents adding a new history entry, noScroll keeps the user's position
		goto(newUrl.toString(), { replaceState: true, noScroll: true });
	}

	// --- 4. Event Handlers (Update State + Sync URL) ---
	function updateSearch(value: string) {
		searchQuery = value;
		syncUrl();
	}

	function toggleCategory(category: string) {
		if (selectedCategories.includes(category)) {
			selectedCategories = selectedCategories.filter((c) => c !== category);
		} else {
			selectedCategories = [...selectedCategories, category];
		}
		syncUrl();
	}

	function updateMinPrice(value: string) {
		minPrice = value === '' ? undefined : Number(value);
		syncUrl();
	}

	function updateMaxPrice(value: string) {
		maxPrice = value === '' ? undefined : Number(value);
		syncUrl();
	}

	function updateMinRating(value: number | null) {
		if (value) {
			minRating = value;
		} else {
			minRating = undefined;
		}
		syncUrl();
	}

	function updateSort(value: string) {
		sortBy = value;
		syncUrl();
	}

	function clearAllFilters() {
		searchQuery = '';
		selectedCategories = [];
		minPrice = undefined;
		maxPrice = undefined;
		minRating = undefined;
		sortBy = 'featured';
		syncUrl();
	}

	// --- 5. Back/Forward Button Support ---
	// If the user navigates via browser history, sync the URL back to our local state
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

		if (q !== searchQuery) searchQuery = q;
		if (JSON.stringify(cats) !== JSON.stringify(selectedCategories)) selectedCategories = cats;
		if (minP !== minPrice) minPrice = minP;
		if (maxP !== maxPrice) maxPrice = maxP;
		if (minR !== minRating) minRating = minR;
		if (sort !== sortBy) sortBy = sort;
	});

	let isMobileFilterOpen = $state(false);
</script>

<div class="min-h-screen py-8">
	<div class="container mx-auto px-4">
		<!-- Header -->
		<div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900 font-serif">All Products</h1>
				<p class="mt-1 text-gray-600">{displayProducts.length} products found</p>
			</div>

			<div class="flex items-center gap-3">
				<!-- Mobile Filter Toggle -->
				<button
					onclick={() => (isMobileFilterOpen = !isMobileFilterOpen)}
					class="lg:hidden flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					<SlidersHorizontal class="h-4 w-4" />
					Filters
				</button>

				<!-- Sort Dropdown -->
				<div class="relative">
					<select
						value={sortBy}
						onchange={(e) => updateSort(e.currentTarget.value)}
						class="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm font-medium text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
					>
						<option value="featured">Featured</option>
						<option value="price_asc">Price: Low to High</option>
						<option value="price_desc">Price: High to Low</option>
						<option value="name_asc">Name: A to Z</option>
						<option value="name_desc">Name: Z to A</option>
						<option value="rating_desc">Highest Rated</option>
					</select>
					<ChevronDown
						class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
					/>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-8 lg:flex-row">
			<!-- Sidebar Filters (Desktop: Sticky, Mobile: Collapsible) -->
			<aside class="{isMobileFilterOpen ? 'block' : 'hidden'} lg:block lg:w-64 lg:shrink-0">
				<div class="rounded-xl border border-gray-200 bg-white p-6 lg:sticky lg:top-24">
					<div class="mb-6 flex items-center justify-between">
						<h2 class="text-lg font-semibold text-gray-900 font-serif">Filters</h2>
						{#if selectedCategories.length > 0 || minPrice || maxPrice || minRating || searchQuery}
							<button
								onclick={clearAllFilters}
								class="text-xs font-medium text-red-600 hover:text-red-700 hover:underline"
							>
								Clear all
							</button>
						{/if}
					</div>

					<!-- Categories -->
					<div class="mb-6">
						<h3 class="mb-3 text-sm font-semibold text-gray-900">Categories</h3>
						<div class="space-y-2">
							{#each allCategories as category}
								<label class="flex items-center gap-2 cursor-pointer group">
									<input
										type="checkbox"
										checked={selectedCategories.includes(category)}
										onchange={() => toggleCategory(category)}
										class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
									/>
									<span class="text-sm text-gray-600 group-hover:text-gray-900">{category}</span>
								</label>
							{/each}
						</div>
					</div>

					<!-- Price Range -->
					<div class="mb-6">
						<h3 class="mb-3 text-sm font-semibold text-gray-900">Price Range</h3>
						<div class="flex items-center gap-2">
							<input
								type="number"
								placeholder="Min"
								value={minPrice ?? ''}
								oninput={(e) => updateMinPrice(e.currentTarget.value)}
								class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
							/>
							<span class="text-gray-400">-</span>
							<input
								type="number"
								placeholder="Max"
								value={maxPrice ?? ''}
								oninput={(e) => updateMaxPrice(e.currentTarget.value)}
								class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
							/>
						</div>
					</div>

					<!-- Rating -->
					<div class="mt-6">
						<h3 class="mb-3 text-sm font-semibold text-gray-900">Minimum Rating</h3>
						<div class="space-y-2">
							{#each [4, 3, 2, 1] as rating}
								<label class="flex items-center gap-2 cursor-pointer group">
									<input
										type="radio"
										name="rating"
										checked={minRating === rating}
										onchange={() => updateMinRating(minRating === rating ? null : rating)}
										class="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
									/>
									<div class="flex items-center gap-1">
										{#each Array(rating) as _}
											{_}
											<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
										{/each}
										{#each Array(5 - rating) as _}
											{_}
											<Star class="h-4 w-4 text-gray-300" />
										{/each}
										<span class="ml-1 text-sm text-gray-600 group-hover:text-gray-900">& Up</span>
									</div>
								</label>
							{/each}
						</div>
					</div>
				</div>
			</aside>

			<!-- Main Content -->
			<div class="flex-1">
				<!-- Active Filters Pills -->
				{#if selectedCategories.length > 0 || minPrice || maxPrice || minRating || searchQuery}
					<div class="mb-6 flex flex-wrap items-center gap-2">
						<span class="text-sm font-medium text-gray-700">Active filters:</span>

						{#if searchQuery}
							<span
								class="inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-800"
							>
								Search: "{searchQuery}"
								<button onclick={() => updateSearch('')} class="hover:text-red-600"
									><X class="h-3 w-3" /></button
								>
							</span>
						{/if}

						{#each selectedCategories as category}
							<span
								class="inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-800"
							>
								{category}
								<button onclick={() => toggleCategory(category)} class="hover:text-red-600"
									><X class="h-3 w-3" /></button
								>
							</span>
						{/each}

						{#if minPrice || maxPrice}
							<span
								class="inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-800"
							>
								Price: {minPrice ? `$${minPrice}` : '$0'} - {maxPrice ? `$${maxPrice}` : '$∞'}
								<button
									onclick={() => {
										updateMinPrice('');
										updateMaxPrice('');
									}}
									class="hover:text-red-600"><X class="h-3 w-3" /></button
								>
							</span>
						{/if}

						{#if minRating}
							<span
								class="inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-800"
							>
								{minRating}+ Stars
								<button onclick={() => updateMinRating(null)} class="hover:text-red-600"
									><X class="h-3 w-3" /></button
								>
							</span>
						{/if}
					</div>
				{/if}

				<!-- Product Grid -->
				{#if displayProducts.length > 0}
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{#each displayProducts as product (product.id)}
							<ProductCard
								{product}
								isOnSale={product.price.discountedAmount !== undefined &&
									product.price.discountedAmount < product.price.amount}
							/>
						{/each}
					</div>
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
	</div>
</div>
