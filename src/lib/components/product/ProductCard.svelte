<script lang="ts">
	import type { ProductCard as ProductCardType } from '$lib/types/product';

	interface Props {
		product: ProductCardType;
		isOnSale?: boolean;
		discountPercentage?: number;
		href?: string;
	}

	let {
		product,
		isOnSale = false,
		discountPercentage,
		href = `/products/${product.slug}`
	}: Props = $props();

	// --- Derived State ---

	let hasDiscount = $derived(
		isOnSale ||
			(product.price.discountedAmount !== undefined &&
				product.price.discountedAmount < product.price.amount)
	);

	let calculatedDiscount = $derived(
		discountPercentage ??
			(hasDiscount && product.price.discountedAmount !== undefined
				? Math.round(
						((product.price.amount - product.price.discountedAmount) / product.price.amount) * 100
					)
				: 0)
	);

	let visualVariant = $derived(
		product.variantOptions?.find((opt) =>
			opt.values.some((val) => val.hexColor || val.thumbnailUrl)
		)
	);

	// --- Helpers ---
	function formatPrice(amount: number, currency: string) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency
		}).format(amount);
	}
</script>

<a
	{href}
	class="product-card block group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
>
	<!-- 1. Media / Image Slider Section -->
	<div class="product-card__media relative aspect-square overflow-hidden rounded-lg bg-gray-100">
		{#if product.images.length > 1}
			<!-- Swiper Web Component -->
			<swiper-container
				pagination="true"
				navigation="true"
				slides-per-view="1"
				loop="true"
				class="h-full w-full"
			>
				{#each product.images as image (image.url)}
					<swiper-slide class="h-full w-full" lazy="true">
						<img
							src={image.url}
							alt={image.alt}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						/>
					</swiper-slide>
				{/each}
			</swiper-container>
		{:else if product.images.length === 1}
			<img
				src={product.images[0].url}
				alt={product.images[0].alt}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				loading="lazy"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center text-gray-400">No Image</div>
		{/if}

		<!-- Badges -->
		{#if hasDiscount && calculatedDiscount > 0}
			<span
				class="absolute top-3 left-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm"
			>
				-{calculatedDiscount}%
			</span>
		{:else if isOnSale}
			<span
				class="absolute top-3 left-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm"
			>
				SALE
			</span>
		{/if}
	</div>

	<!-- 2. Information Section -->
	<div class="product-card__info mt-4 space-y-2">
		<h3
			class="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors"
		>
			{product.title}
		</h3>

		{#if visualVariant}
			<div class="flex items-center gap-1.5">
				{#each visualVariant.values.slice(0, 4) as value (value.id)}
					<span
						class="block h-4 w-4 rounded-full border border-gray-200 shadow-sm"
						style={value.hexColor
							? `background-color: ${value.hexColor}`
							: value.thumbnailUrl
								? `background-image: url(${value.thumbnailUrl}); background-size: cover;`
								: ''}
						title={value.label}
					></span>
				{/each}
				{#if visualVariant.values.length > 4}
					<span class="text-xs text-gray-500 pl-1">+{visualVariant.values.length - 4}</span>
				{/if}
			</div>
		{/if}

		<div class="flex items-baseline gap-2">
			{#if hasDiscount && product.price.discountedAmount !== undefined}
				<span class="text-base font-bold text-red-600">
					{formatPrice(product.price.discountedAmount, product.price.currency)}
				</span>
				<span class="text-sm text-gray-400 line-through">
					{formatPrice(product.price.amount, product.price.currency)}
				</span>
			{:else}
				<span class="text-base font-bold text-gray-900">
					{formatPrice(product.price.amount, product.price.currency)}
				</span>
			{/if}
		</div>

		{#if product.rating && product.rating.count > 0}
			<div class="flex items-center gap-1 text-xs text-gray-500">
				<span class="text-yellow-400">★</span>
				<span>{product.rating.average.toFixed(1)}</span>
				<span>({product.rating.count})</span>
			</div>
		{/if}
	</div>
</a>

<style>
	/*
    Swiper Web Components use Shadow DOM, so we style them using CSS Variables
    provided by Swiper. This is the cleanest way to theme the web component.
  */
	swiper-container {
		--swiper-pagination-color: var(--color-gray-900, #111827);
		--swiper-navigation-color: var(--color-gray-900, #111827);
		--swiper-pagination-bullet-inactive-color: var(--color-gray-300, #d1d5db);
		--swiper-pagination-bullet-inactive-opacity: 1;

		/* Hide navigation arrows by default, show on hover */
		--swiper-navigation-size: 24px;
	}

	/* Svelte doesn't natively pierce Shadow DOM for hover states easily via CSS variables,
     so we use :global for the container hover effect on the navigation arrows */
	:global(.product-card:hover swiper-container::part(button-prev)),
	:global(.product-card:hover swiper-container::part(button-next)) {
		opacity: 1;
	}

	:global(swiper-container::part(button-prev)),
	:global(swiper-container::part(button-next)) {
		opacity: 0;
		transition: opacity 0.3s ease;
	}
</style>
