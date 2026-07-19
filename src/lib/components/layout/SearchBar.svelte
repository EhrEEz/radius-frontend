<script lang="ts">
	import { goto } from '$app/navigation';
	import { cn } from '$lib/utils';
	import { Search, X, TrendingUp, Clock } from '@lucide/svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		placeholder = 'Search for products, brands and more...',
		class: className,
		...restProps
	}: {
		placeholder?: string;
	} & HTMLAttributes<Element> = $props();

	let query = $state('');
	let isOpen = $state(false);

	// selectedIndex: -1 means focus is in the input, >= 0 means a suggestion is highlighted
	let selectedIndex = $state(-1);

	// Mock data for suggestions (Replace with real API/store data in production)
	const popularSearches = [
		'Leather Weekender',
		'Minimalist Wallet',
		'Canvas Tote',
		'Hiking Backpack'
	];
	const recentSearches = ['Voyager Wallet', 'Classic Belt'];

	// Filter suggestions based on query
	let suggestions = $derived.by(() => {
		if (!query.trim()) {
			return { popular: popularSearches, recent: recentSearches, products: [] };
		}
		const q = query.toLowerCase();

		// Mock product matching (In production, fetch this from a lightweight API endpoint)
		const matchedProducts = [
			{ title: 'The Horizon Leather Weekender', category: 'Bags' },
			{ title: 'The Voyager Leather Wallet', category: 'Accessories' },
			{ title: 'Weekend Canvas Tote', category: 'Bags' },
			{ title: 'The Summit Hiking Backpack', category: 'Outdoor' }
		].filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));

		return {
			popular: popularSearches.filter((s) => s.toLowerCase().includes(q)),
			recent: [], // Hide recent when actively typing
			products: matchedProducts
		};
	});

	// Build the flat list of items to render
	let flatSuggestions = $derived.by(() => {
		const items: Array<{ type: string; label: string; sublabel?: string }> = [];

		if (!query.trim()) {
			if (recentSearches.length) {
				items.push({ type: 'header', label: 'Recent Searches' });
				recentSearches.forEach((s) => items.push({ type: 'recent', label: s }));
			}
			items.push({ type: 'header', label: 'Popular Searches' });
			popularSearches.forEach((s) => items.push({ type: 'popular', label: s }));
		} else {
			if (suggestions.products.length) {
				items.push({ type: 'header', label: 'Products' });
				suggestions.products.forEach((p) =>
					items.push({ type: 'product', label: p.title, sublabel: p.category })
				);
			}
			if (suggestions.popular.length) {
				items.push({ type: 'header', label: 'Suggestions' });
				suggestions.popular.forEach((s) => items.push({ type: 'popular', label: s }));
			}
		}
		return items;
	});

	// Isolate only the clickable items for easy index math
	let selectableItems = $derived(flatSuggestions.filter((i) => i.type !== 'header'));

	function handleInput(e: Event) {
		query = (e.currentTarget as HTMLInputElement).value;
		isOpen = true;
		selectedIndex = -1;
	}

	function handleFocus() {
		isOpen = true;
		selectedIndex = -1;
	}

	function handleBlur() {
		// Delay closing to allow click events on suggestions to fire first
		setTimeout(() => {
			isOpen = false;
		}, 150);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, selectableItems.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, -1);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (selectedIndex >= 0 && selectableItems[selectedIndex]) {
				// User selected a suggestion
				query = selectableItems[selectedIndex].label;
				executeSearch(query);
			} else {
				// User just pressed Enter in the input
				executeSearch(query);
			}
		} else if (e.key === 'Escape') {
			e.preventDefault();
			isOpen = false;
			(e.currentTarget as HTMLElement).blur();
		}
	}

	function executeSearch(searchTerm?: string) {
		const term = (searchTerm || query).trim();
		if (term) {
			goto(`/products?q=${encodeURIComponent(term)}`);
			isOpen = false;
		}
	}

	function clearSearch() {
		query = '';
		isOpen = true;
		selectedIndex = -1;
	}

	// Helper to check if a specific item is the currently highlighted one
	function isItemSelected(item: { type: string; label: string; sublabel?: string }) {
		if (item.type === 'header') return false;
		return selectableItems.indexOf(item) === selectedIndex;
	}
</script>

<div class={cn('relative w-full', className)} {...restProps}>
	<form
		onsubmit={(e) => {
			e.preventDefault();
			executeSearch();
		}}
		class="relative w-full"
	>
		<input
			type="text"
			bind:value={query}
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeydown={handleKeydown}
			{placeholder}
			class="w-full px-4 py-2.5 pl-11 pr-20 bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-950 focus:border-transparent transition-all"
			autocomplete="off"
			role="combobox"
			aria-expanded={isOpen}
			aria-autocomplete="list"
			aria-controls="search-suggestions"
		/>
		<Search
			class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
		/>

		{#if query}
			<button
				type="button"
				onclick={clearSearch}
				class="absolute right-12 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
				aria-label="Clear search"
			>
				<X class="w-4 h-4" />
			</button>
		{/if}

		<button
			type="submit"
			class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full hover:bg-primary-900 transition-colors"
			aria-label="Submit search"
		>
			<Search class="w-5 h-5" />
		</button>
	</form>

	<!-- Autocomplete Dropdown -->
	{#if isOpen && flatSuggestions.length > 0}
		<div
			id="search-suggestions"
			class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden"
			role="listbox"
		>
			<div class="max-h-96 overflow-y-auto py-2">
				{#each flatSuggestions as item}
					{#if item.type === 'header'}
						<div class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
							{item.label}
						</div>
					{:else}
						<button
							type="button"
							onclick={() => executeSearch(item.label)}
							onmousedown={(e) => e.preventDefault()}
							class="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors {isItemSelected(
								item
							)
								? 'bg-gray-50 text-gray-950'
								: 'text-gray-700 hover:bg-gray-50'}"
							role="option"
							aria-selected={isItemSelected(item)}
						>
							{#if item.type === 'recent'}
								<Clock class="w-4 h-4 text-gray-400 shrink-0" />
							{:else if item.type === 'popular'}
								<TrendingUp class="w-4 h-4 text-gray-400 shrink-0" />
							{:else if item.type === 'product'}
								<Search class="w-4 h-4 text-gray-400 shrink-0" />
							{/if}
							<div class="flex-1 min-w-0">
								<div class="text-sm font-medium truncate">{item.label}</div>
								{#if item.sublabel}
									<div class="text-xs text-gray-500">{item.sublabel}</div>
								{/if}
							</div>
						</button>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
