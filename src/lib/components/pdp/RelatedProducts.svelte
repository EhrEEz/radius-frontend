<!-- src/lib/components/pdp/RelatedProducts.svelte -->
<script lang="ts">
	import type { ProductCard as ProductCardType } from '$lib/types/product';
	import ProductCard from '$lib/components/product/ProductCard.svelte';

	let {
		products,
		title = 'You May Also Like'
	}: {
		products: ProductCardType[];
		title?: string;
	} = $props();
</script>

<section class="py-16 border-t border-neutral-200">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="text-2xl font-bold text-neutral-900 mb-8 font-serif">{title}</h2>

		{#if products.length > 0}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each products as product (product.id)}
					<ProductCard {product} />
				{/each}
			</div>
		{:else}
			<p class="text-neutral-500 text-center py-8">No related products found.</p>
		{/if}
	</div>
</section>
