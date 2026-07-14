<!-- src/lib/components/pdp/FrequentlyBoughtTogether.svelte -->
<script lang="ts">
	import type { ProductCard } from '$lib/types/product';
	import { ShoppingCart } from '@lucide/svelte';

	let {
		products,
		title = 'Frequently Bought Together',
		onAddToCart
	}: {
		products: ProductCard[];
		title?: string;
		onAddToCart?: (product: ProductCard) => void;
	} = $props();
</script>

<section class="py-12 border-t border-neutral-200">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="text-xl font-bold text-neutral-900 mb-6 font-serif">{title}</h2>

		{#if products.length > 0}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each products as product (product.id)}
					<div class="flex flex-col sm:flex-row items-center gap-4 p-4 border border-neutral-200 rounded-xl bg-white hover:border-neutral-300 transition-colors">
						<!-- Product Image -->
						<a href="/products/{product.slug}" class="w-full sm:w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
							<img
								src={product.images[0]?.url}
								alt={product.title}
								class="w-full h-full object-cover"
							/>
						</a>

						<!-- Product Info & Action -->
						<div class="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3">
							<div class="flex-1 min-w-0">
								<a href="/products/{product.slug}" class="block">
									<h3 class="text-sm font-medium text-neutral-900 truncate hover:underline">
										{product.title}
									</h3>
								</a>
								<p class="text-sm font-semibold text-neutral-900 mt-1">
									${product.price.discountedAmount
										? product.price.discountedAmount.toFixed(2)
										: product.price.amount.toFixed(2)}
								</p>
							</div>

							<button
								onclick={() => onAddToCart?.(product)}
								class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors whitespace-nowrap"
								aria-label="Add {product.title} to cart"
							>
								<ShoppingCart class="w-3.5 h-3.5" />
								Add
							</button>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-neutral-500 text-sm text-center py-4">No complementary items found.</p>
		{/if}
	</div>
</section>
