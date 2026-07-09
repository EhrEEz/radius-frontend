<script lang="ts">
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import type { ProductCard as ProductCardType } from '$lib/types/product';

	// Mock data for demonstration
	const mockProduct: ProductCardType = {
		id: '1',
		slug: 'classic-leather-jacket',
		title: 'Classic Leather Jacket',
		images: [
			{
				url: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				alt: 'Front view'
			},
			{
				url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				alt: 'Back view'
			}
		],
		price: { amount: 199.99, currency: 'USD', discountedAmount: 149.99 },
		variantOptions: [
			{
				id: 'color',
				name: 'Color',
				values: [
					{ id: 'black', label: 'Black', hexColor: '#000000' },
					{ id: 'brown', label: 'Brown', hexColor: '#8B4513' }
				]
			}
		]
	};

	let favoriteState = $state(false);

	function handleToggleFavorite() {
		favoriteState = !favoriteState;
		console.log(`Favorite state is now: ${favoriteState}`);
	}
</script>

<section class="features">
	<h2 class="text-3xl mb-6 font-serif font-medium">Featured Products</h2>
	<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
		<ProductCard
			product={mockProduct}
			isOnSale={true}
			isFavorite={favoriteState}
			ontogglefavorite={handleToggleFavorite}
		/>
	</div>
</section>
