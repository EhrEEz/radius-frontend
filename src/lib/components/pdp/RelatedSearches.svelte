<!-- src/lib/components/pdp/RelatedSearches.svelte -->
<script lang="ts">
	import { cn } from '$lib/utils';
	import RelatedSearchCard from './RelatedSearchCard.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	export interface RelatedSearch {
		title: string;
		imageUrl: string;
		href: string;
	}

	let {
		searches,
		title = 'Related searches',
		class: className = '',
		...restProps
	}: {
		searches: RelatedSearch[];
		title?: string;
	} & HTMLAttributes<HTMLDivElement> = $props();
</script>

<section class="py-12">
	<h2 class="text-2xl font-semibold text-neutral-900 mb-6 font-serif">{title}</h2>

	{#if searches.length > 0}
		<div
			class={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}
			{...restProps}
		>
			{#each searches as search (search.href)}
				<RelatedSearchCard title={search.title} imageUrl={search.imageUrl} href={search.href} />
			{/each}
		</div>
	{/if}
</section>
