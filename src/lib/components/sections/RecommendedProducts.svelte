<script lang="ts">
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import type { ProductCard as ProductCardType } from '$lib/types/product';

	let {
		title = 'You might also like',
		products
	}: {
		title?: string;
		products: ProductCardType[];
	} = $props();
</script>

<section class="mt-24">
	<div class="mb-8">
		<h2 class="text-2xl font-semibold text-neutral-900 my-6 font-serif">{title}</h2>
	</div>
	{#if products.length > 0}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
			{#each products as product (product.id)}
				<ProductCard
					{product}
					isOnSale={product.price.discountedAmount !== undefined &&
						product.price.discountedAmount < product.price.amount}
				/>
			{/each}
		</div>
	{:else}
		<p class="text-neutral-500 text-center py-8">No related products found.</p>
	{/if}
</section>
