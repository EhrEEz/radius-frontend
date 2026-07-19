<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	let {
		currentPage = $bindable(),
		totalPages,
		onPageChange
	}: {
		currentPage: number;
		totalPages: number;
		onPageChange: (page: number) => void;
	} = $props();

	// Generate an array of page numbers/ellipses to display
	let pages = $derived.by(() => {
		const delta = 1; // Number of pages to show around current page
		const range: (number | string)[] = [];

		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i);
		}

		if (currentPage - delta > 2) range.unshift('...');
		if (currentPage + delta < totalPages - 1) range.push('...');

		range.unshift(1);
		if (totalPages > 1) range.push(totalPages);

		return range;
	});
</script>

{#if totalPages > 1}
	<nav class="flex items-center justify-center gap-2 mt-12 mb-8" aria-label="Pagination">
		<button
			onclick={() => onPageChange(currentPage - 1)}
			disabled={currentPage === 1}
			class="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
			aria-label="Previous page"
		>
			<ChevronLeft class="h-5 w-5" />
		</button>

		{#each pages as page}
			{#if page === '...'}
				<span class="w-10 h-10 flex items-center justify-center text-gray-400 text-sm">...</span>
			{:else}
				<button
					onclick={() => onPageChange(page as number)}
					class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
						{currentPage === page
						? 'bg-primary text-white shadow-md scale-105'
						: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}"
					aria-label="Page {page}"
					aria-current={currentPage === page ? 'page' : undefined}
				>
					{page}
				</button>
			{/if}
		{/each}

		<button
			onclick={() => onPageChange(currentPage + 1)}
			disabled={currentPage === totalPages}
			class="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
			aria-label="Next page"
		>
			<ChevronRight class="h-5 w-5" />
		</button>
	</nav>
{/if}
