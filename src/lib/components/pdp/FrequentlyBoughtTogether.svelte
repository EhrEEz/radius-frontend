<!-- src/lib/components/pdp/FrequentlyBoughtTogether.svelte -->
<script lang="ts">
	import type { ProductCard } from '$lib/types/product';
	import { ShoppingCart } from '@lucide/svelte';
	import { Button } from '../ui/Button';

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

<section class="my-12">
	<h2 class="text-2xl font-semibold text-neutral-900 my-6 font-serif">{title}</h2>

	{#if products.length > 0}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each products as product (product.id)}
				<div
					class="flex flex-col sm:flex-row items-center gap-4 p-4 border border-neutral-200 rounded-xl bg-white hover:border-neutral-300 transition-colors"
				>
					<!-- Product Image -->
					<a
						href="/products/{product.slug}"
						class="w-full sm:w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-neutral-100"
					>
						<img
							src={product.images[0]?.url}
							alt={product.title}
							class="w-full h-full object-cover"
						/>
					</a>

					<!-- Product Info & Action -->
					<div
						class="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3"
					>
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
						<Button
							size="xs"
							onclick={() => onAddToCart?.(product)}
							aria-label="Add {product.title} to cart"
						>
							<ShoppingCart class="w-3.5 h-3.5" />
							Add</Button
						>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-neutral-500 text-sm text-center py-4">No complementary items found.</p>
	{/if}
</section>
