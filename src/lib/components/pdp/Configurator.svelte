<!-- src/lib/components/pdp/Configurator.svelte -->
<script lang="ts">
	import { cart } from '$lib/components/cart/cart.svelte';
	import type { Product, ProductVariant, Price } from '$lib/types/product';
	import { ShoppingCart } from '@lucide/svelte';

	let {
		product,
		selectedVariant,
		selectedOptionValueIds,
		onOptionSelect
	}: {
		product: Product;
		selectedVariant: ProductVariant | undefined;
		selectedOptionValueIds: Record<string, string>;
		onOptionSelect: (optionId: string, valueId: string) => void;
	} = $props();

	// Helper to get the actual selected value objects for labels/attributes
	let selectedOptionValues = $derived.by(() => {
		return product.variantOptions
			.map((opt) => opt.values.find((v) => v.id === selectedOptionValueIds[opt.id]))
			.filter((v): v is NonNullable<typeof v> => !!v);
	});

	// Price formatting helper
	function formatCurrency(price: Price): { current: string; original: string | null } {
		// Note: Assuming amount is standard decimal. If your DB stores cents, divide by 100 here.
		const amount = price.amount;
		const discounted = price.discountedAmount;
		const format = (val: number) => {
			const symbol = price.currency === 'USD' ? '$' : `${price.currency} `;
			return `${symbol}${val.toFixed(2)}`;
		};
		return {
			current: format(discounted ?? amount),
			original: discounted != null ? format(amount) : null
		};
	}

	let displayPrice = $derived.by(() => {
		const priceObj = selectedVariant?.price ?? product.price;
		return formatCurrency(priceObj);
	});

	let isInStock = $derived(selectedVariant ? selectedVariant.stock > 0 : false);
	let quantity = $state(1);

	/**
	 * Smart Availability Logic:
	 * Checks if selecting a specific value still results in a valid, in-stock variant,
	 * given the user's CURRENT selections for all OTHER options.
	 */
	function isOptionValueAvailable(optionId: string, valueId: string): boolean {
		const hypotheticalSelection = { ...selectedOptionValueIds, [optionId]: valueId };
		const selectedIds = Object.values(hypotheticalSelection);

		return product.variants.some(
			(v) => selectedIds.every((id) => v.optionValueIds.includes(id)) && v.stock > 0
		);
	}

	function handleAddToCart() {
		if (!selectedVariant || !isInStock) return;

		// Map structured attributes for the cart (e.g., { "Color": "Red", "Size": "M" })
		const attributes: Record<string, string> = {};
		selectedOptionValues.forEach((val) => {
			const option = product.variantOptions.find((o) => o.values.some((v) => v.id === val.id));
			if (option) attributes[option.name] = val.label;
		});

		cart.addItem({
			id: selectedVariant.id,
			productId: product.id,
			slug: product.slug,
			name: product.title,
			variantLabel: selectedOptionValues.map((v) => v.label).join(' / '),
			attributes,
			price:
				selectedVariant.price?.discountedAmount ??
				selectedVariant.price?.amount ??
				product.price.amount,
			quantity,
			image: selectedVariant.images?.[0]?.url ?? product.images[0]?.url
		});
	}
</script>

<div class="flex flex-col gap-6 sticky top-24 self-start col-span-6">
	<!-- Title & Price -->
	<div>
		<h1 class="text-3xl font-bold text-neutral-900">{product.title}</h1>
		<div class="mt-2 flex items-baseline gap-2">
			<span class="text-2xl font-semibold text-neutral-900">{displayPrice.current}</span>
			{#if displayPrice.original}
				<span class="text-lg text-neutral-500 line-through">{displayPrice.original}</span>
			{/if}
		</div>
	</div>

	<!-- Variant Options (Swatches) -->
	<div class="flex flex-col gap-6">
		{#each product.variantOptions as option}
			{@const selectedValue = option.values.find((v) => v.id === selectedOptionValueIds[option.id])}
			<div>
				<div class="flex items-center justify-between mb-3">
					<span class="text-sm font-medium text-neutral-900">{option.name}</span>
					<span class="text-sm text-neutral-500">{selectedValue?.label}</span>
				</div>
				<div class="flex flex-wrap gap-3">
					{#each option.values as value}
						{@const isSelected = selectedOptionValueIds[option.id] === value.id}
						{@const isAvailable = isOptionValueAvailable(option.id, value.id)}

						<button
							onclick={() => onOptionSelect(option.id, value.id)}
							disabled={!isAvailable}
							class="relative flex items-center justify-center rounded-md overflow-hidden transition-all
                {isSelected
								? 'ring-2 ring-neutral-900 ring-offset-2'
								: 'ring-1 ring-neutral-200 hover:ring-neutral-400'}
                {!isAvailable && 'cursor-not-allowed opacity-50'}"
							aria-label={`Select ${option.name}: ${value.label}`}
							title={value.label}
						>
							<!-- /* Render based on available data: Color Hex -> Thumbnail -> Text */ -->
							{#if value.hexColor}
								<div class="w-8 h-8" style="background-color: {value.hexColor}"></div>
							{:else if value.thumbnailUrl}
								<img src={value.thumbnailUrl} alt={value.label} class="w-8 h-8 object-cover" />
							{:else}
								<span
									class="px-3 py-1.5 text-sm font-medium {isSelected
										? 'bg-neutral-900 text-white'
										: 'bg-white text-neutral-900'}"
								>
									{value.label}
								</span>
							{/if}

							<!-- /* Strike-through for out-of-stock options */ -->
							{#if !isAvailable}
								<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
									<div class="w-[150%] h-px bg-neutral-500 rotate-45"></div>
								</div>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- Quantity & Add to Cart -->
	<div class="flex flex-col gap-4 pt-6 border-t">
		<div class="flex items-center gap-4">
			<span class="text-sm font-medium text-neutral-900">Quantity</span>
			<div class="flex items-center rounded-md border border-neutral-200">
				<button
					onclick={() => (quantity = Math.max(1, quantity - 1))}
					class="px-3 py-1.5 text-neutral-600 hover:bg-neutral-50 transition-colors"
					aria-label="Decrease quantity">−</button
				>
				<span class="min-w-10 px-2 text-center text-sm tabular-nums">{quantity}</span>
				<button
					onclick={() => (quantity = Math.min(selectedVariant?.stock ?? 99, quantity + 1))}
					class="px-3 py-1.5 text-neutral-600 hover:bg-neutral-50 transition-colors"
					aria-label="Increase quantity">+</button
				>
			</div>
			{#if selectedVariant && selectedVariant.stock < 10 && selectedVariant.stock > 0}
				<span class="text-sm text-orange-600 font-medium">Only {selectedVariant.stock} left!</span>
			{/if}
		</div>
		<div class="grid grid-cols-2 gap-4">
			<button
				onclick={handleAddToCart}
				disabled={!selectedVariant || !isInStock}
				class="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300 flex gap-3.5 items-center justify-center cursor-pointer"
			>
				<ShoppingCart class="w-4 h-4" stroke-width="2" />
				{!selectedVariant ? 'Select Options' : !isInStock ? 'Out of Stock' : 'Add to Cart'}
			</button>
			<button
				onclick={handleAddToCart}
				disabled={!selectedVariant || !isInStock}
				class="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300 flex gap-3.5 items-center justify-center cursor-pointer"
			>
				<ShoppingCart class="w-4 h-4" stroke-width="2" />
				{!selectedVariant ? 'Select Options' : !isInStock ? 'Out of Stock' : 'Buy Now'}
			</button>
		</div>
	</div>
</div>
