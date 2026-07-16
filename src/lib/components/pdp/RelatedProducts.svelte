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

<section class="my-24">
	<h2 class="text-2xl font-semibold text-neutral-900 my-6 font-serif">{title}</h2>

	{#if products.length > 0}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
			{#each products as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
	{:else}
		<p class="text-neutral-500 text-center py-8">No related products found.</p>
	{/if}
</section>
