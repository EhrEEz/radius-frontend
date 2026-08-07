<script lang="ts">
	import { getProfileContext } from '$lib/profile/profile.context.svelte';
	import { Button } from '$lib/components/ui/Button';
	import { Heart, ShoppingBag } from '@lucide/svelte';

	// Import your ProductCard component (adjust the path if it lives in a different folder)
	import ProductCard from '$lib/components/product/ProductCard.svelte';

	const ctx = getProfileContext();

	function handleRemove(productId: string) {
		ctx.removeFavorite(productId);
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="flex justify-between items-end">
		<div>
			<h1 class="text-3xl font-semibold text-gray-900 font-serif tracking-tight">My Favorites</h1>
			<p class="mt-1 text-sm text-gray-500">Items you've saved for later.</p>
		</div>
		<p class="text-sm font-medium text-gray-500">
			{ctx.favorites.length}
			{ctx.favorites.length === 1 ? 'item' : 'items'}
		</p>
	</div>

	<!-- Empty State -->
	{#if ctx.favorites.length === 0}
		<div class="bg-white p-16 rounded-lg border border-dashed border-gray-300 text-center">
			<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
				<Heart class="w-8 h-8 text-gray-300" />
			</div>
			<p class="text-base font-medium text-gray-900 mb-1">No favorites yet</p>
			<p class="text-sm text-gray-500 mb-6">
				Browse our products and click the heart icon to save them here.
			</p>
			<div class="flex justify-center">
				<Button variant="outline">
					<ShoppingBag class="w-4 h-4 mr-2" />
					Continue Shopping
				</Button>
			</div>
		</div>

		<!-- Favorites Grid -->
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each ctx.favorites as fav (fav.id)}
				<div class="flex flex-col gap-4">
					<!--
            Using the shared ProductCard component.
            We force isFavorite={true} and map the toggle event to remove it from the list.
          -->
					<ProductCard
						product={fav}
						isFavorite={true}
						ontogglefavorite={() => handleRemove(fav.id)}
					/>

				</div>
			{/each}
		</div>
	{/if}
</div>
