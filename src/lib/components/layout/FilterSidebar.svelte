<script lang="ts">
	import { Star, X } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	let {
		allCategories,
		selectedCategories,
		minPrice,
		maxPrice,
		minRating,
		searchQuery,
		isMobileFilterOpen = $bindable(false),
		onToggleCategory,
		onUpdateMinPrice,
		onUpdateMaxPrice,
		onUpdateMinRating,
		onUpdateSearch,
		onClearAll
	}: {
		allCategories: string[];
		selectedCategories: string[];
		minPrice: number | undefined;
		maxPrice: number | undefined;
		minRating: number | undefined;
		searchQuery: string;
		isMobileFilterOpen?: boolean;
		onToggleCategory: (cat: string) => void;
		onUpdateMinPrice: (val: string) => void;
		onUpdateMaxPrice: (val: string) => void;
		onUpdateMinRating: (val: number | null) => void;
		onUpdateSearch: (val: string) => void;
		onClearAll: () => void;
	} = $props();

	let hasActiveFilters = $derived(
		selectedCategories.length > 0 ||
			minPrice !== undefined ||
			maxPrice !== undefined ||
			minRating !== undefined ||
			searchQuery !== ''
	);

	function closeFilter() {
		isMobileFilterOpen = false;
	}

	// Prevent body scroll when mobile filter is open
	$effect(() => {
		if (window.innerWidth < 64 * 16) {
			if (isMobileFilterOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		}
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

{#snippet filterContent()}
	<div class="mb-6 flex items-center justify-between">
		<h2 class="text-lg font-semibold text-gray-900 font-serif">Filters</h2>
		<div class="flex items-center gap-2">
			{#if hasActiveFilters}
				<button
					onclick={onClearAll}
					class="text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
				>
					Clear all
				</button>
			{/if}
			<!-- Close button for mobile -->
			<button
				onclick={closeFilter}
				class="lg:hidden rounded-full p-1 text-gray-500 hover:bg-gray-100"
			>
				<X class="h-5 w-5" />
			</button>
		</div>
	</div>

	<!-- Categories -->
	{#if allCategories.length > 0}
		<div class="mb-6">
			<h3 class="mb-3 text-sm font-semibold text-gray-900">Categories</h3>
			<div class="space-y-2">
				{#each allCategories as category}
					<label class="flex items-center gap-2 cursor-pointer group">
						<input
							type="checkbox"
							checked={selectedCategories.includes(category)}
							onchange={() => onToggleCategory(category)}
							class="h-4 w-4 rounded border-gray-300 text-violet-950 focus:ring-violet-950"
						/>
						<span class="text-sm text-gray-600 group-hover:text-gray-900">{category}</span>
					</label>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Price Range -->
	<div class="mb-6">
		<h3 class="mb-3 text-sm font-semibold text-gray-900">Price Range</h3>
		<div class="flex items-center gap-2">
			<input
				type="number"
				placeholder="Min"
				value={minPrice ?? ''}
				oninput={(e) => onUpdateMinPrice(e.currentTarget.value)}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-950 focus:outline-none focus:ring-1 focus:ring-violet-950"
			/>
			<span class="text-gray-400">-</span>
			<input
				type="number"
				placeholder="Max"
				value={maxPrice ?? ''}
				oninput={(e) => onUpdateMaxPrice(e.currentTarget.value)}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-950 focus:outline-none focus:ring-1 focus:ring-violet-950"
			/>
		</div>
	</div>

	<!-- Rating -->
	<div class="mb-6">
		<h3 class="mb-3 text-sm font-semibold text-gray-900">Minimum Rating</h3>
		<div class="space-y-2">
			{#each [4, 3, 2, 1] as rating}
				<label class="flex items-center gap-2 cursor-pointer group">
					<input
						type="radio"
						name="rating"
						checked={minRating === rating}
						onchange={() => onUpdateMinRating(minRating === rating ? null : rating)}
						class="h-4 w-4 border-gray-300 text-violet-950 focus:ring-violet-950"
					/>
					<div class="flex items-center gap-1">
						{#each Array.from({ length: rating }) as _}
							<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
						{/each}
						{#each Array.from({ length: 5 - rating }) as _}
							<Star class="h-4 w-4 text-gray-300" />
						{/each}
						<span class="ml-1 text-sm text-gray-600 group-hover:text-gray-900">& Up</span>
					</div>
				</label>
			{/each}
		</div>
	</div>
{/snippet}

<!-- ========================================== -->
<!-- MOBILE: Overlay & Slide-out Drawer         -->
<!-- ========================================== -->
{#if isMobileFilterOpen}
	<button class="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity" onclick={closeFilter}
		><span class="sr-only">Close Overlay</span></button
	>
	<aside
		class="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col"
	>
		<div class="flex-1 overflow-y-auto p-6">
			{@render filterContent()}
		</div>
		<div class="border-t border-gray-200 p-6">
			<button
				onclick={closeFilter}
				class="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-400 transition-colors"
			>
				Apply Filters
			</button>
		</div>
	</aside>
{/if}

<!-- ========================================== -->
<!-- DESKTOP: Collapsible Sidebar Beside Grid   -->
<!-- ========================================== -->

{#if isMobileFilterOpen}
	<aside
		class={[
			'transition-all duration-300 ease-in-out shrink-0 overflow-hidden lg:flex flex-col w-64 lg:me-6'
		]}
		transition:slide={{ duration: 400, axis: 'x' }}
	>
		<div class="rounded-xl border border-gray-200 bg-white p-6 sticky top-24 w-64">
			{@render filterContent()}
		</div>
	</aside>
{/if}
