<!-- src/lib/components/pdp/SimilarKeywords.svelte -->
<script lang="ts">
	let {
		keywords,
		title = 'Shop by Keywords'
	}: {
		keywords: string[];
		title?: string;
	} = $props();
</script>

<section class="py-12 border-t border-neutral-200">
		<h2 class="text-xl font-bold text-neutral-900 mb-6 font-serif">{title}</h2>

		{#if keywords.length > 0}
			<div class="flex flex-wrap gap-3">
				{#each keywords as keyword (keyword)}
					<a
						href="/search?q={encodeURIComponent(keyword)}"
						class="inline-flex items-center px-4 py-2 rounded-full border border-neutral-300 bg-white text-sm font-medium text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 hover:bg-neutral-50 transition-all"
					>
						{keyword}
					</a>
				{/each}
			</div>
		{:else}
			<p class="text-neutral-500 text-sm">No keywords available.</p>
		{/if}
</section>
