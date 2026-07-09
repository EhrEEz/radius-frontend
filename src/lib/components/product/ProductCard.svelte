<script lang="ts">
	import type { ProductCard as ProductCardType } from '$lib/types/product';
	import type { SwiperContainer } from 'swiper/element';
	import { ChevronLeft, ChevronRight, Heart } from '@lucide/svelte';
	import { register } from 'swiper/element/bundle';
	import { onMount } from 'svelte';
	interface Props {
		product: ProductCardType;
		isOnSale?: boolean;
		discountPercentage?: number;
		href?: string;

		// New props for interactions
		isFavorite?: boolean;
		ontogglefavorite?: () => void;
	}

	let {
		product,
		isOnSale = false,
		discountPercentage,
		href = `/products/${product.slug}`,
		isFavorite = false,
		ontogglefavorite
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

	function formatPrice(amount: number, currency: string) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency
		}).format(amount);
	}

	// --- Swiper Initialization Fix ---
	let swiperEl = $state<SwiperContainer | null>(null);
	const swiperParams = {
		lazy: true,
		navigation: false,
		pagination: { clickable: false },
		slidesPerView: 1,
		loop: true
	};
	onMount(() => {
		register();
		if (swiperEl) {
			// Assign configuration parameters directly to the element object
			Object.assign(swiperEl, swiperParams);

			// Initialize the element manually
			swiperEl.initialize();

			// Example of listening to Swiper events in Svelte 5
			const handleSlideChange = () => {
				console.log('Slide changed to:', swiperEl?.swiper.activeIndex);
			};

			swiperEl.addEventListener('swiperslidechange', handleSlideChange);

			// Cleanup event listener if component destroys
			return () => {
				swiperEl?.removeEventListener('swiperslidechange', handleSlideChange);
			};
		}
	});
	function slideNext() {
		swiperEl?.swiper?.slideNext();
	}

	function slidePrev() {
		swiperEl?.swiper?.slidePrev();
	}
	$inspect(product);
</script>

<a
	{href}
	class="product-card block group focus:outline-none focus-visible:ring-2 rounded-xl p-2 bg-white border border-gray-200"
>
	<!-- 1. Media / Image Slider Section -->
	<div class="product-card__media relative aspect-square overflow-hidden rounded-xl bg-gray-200">
		{#if product.images.length > 1}
			<swiper-container bind:this={swiperEl} init={false} class="h-full w-full">
				{#each product.images as image}
					<swiper-slide class="h-full w-full">
						<img
							src={image.url}
							alt={image.alt}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						/>
					</swiper-slide>
				{/each}
			</swiper-container>
			<!-- Custom Navigation Buttons (Round with Lucide Icons) -->
			<button
				type="button"
				onclick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					slidePrev();
				}}
				class="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900/90 text-white opacity-0 transition-opacity hover:bg-gray-900 group-hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
				aria-label="Previous slide"
			>
				<ChevronLeft class="h-4 w-4" stroke-width="2.5" />
			</button>
			<button
				type="button"
				onclick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					slideNext();
				}}
				class="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900/90 text-white opacity-0 transition-opacity hover:bg-gray-900 group-hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
				aria-label="Next slide"
			>
				<ChevronRight class="h-4 w-4" stroke-width="2.5" />
			</button>
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

		<!-- Badges (Sale / Discount) - NO SHADOWS -->
		{#if hasDiscount && calculatedDiscount > 0}
			<span
				class="absolute top-3 left-3 z-10 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-bold text-white"
			>
				SALE -{calculatedDiscount}%
			</span>
		{:else if isOnSale}
			<span
				class="absolute top-3 left-3 z-10 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-bold text-white"
			>
				SALE
			</span>
		{/if}

		<!-- Favorites Button (Top Right) - NO SHADOWS -->
		<button
			type="button"
			onclick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				ontogglefavorite?.();
			}}
			class={[
				'absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900',
				isFavorite
					? 'bg-red-500 hover:bg-red-600 text-white hover:text-gray-200'
					: 'bg-white hover:bg-gray-100 hover:text-gray-800 text-gray-600'
			]}
			aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
		>
			{#if isFavorite}
				<!-- Filled Heart -->
				<Heart class="h-4 w-4" fill="currentColor" stroke-width="2" />
			{:else}
				<!-- Outline Heart -->
				<Heart class="h-4 w-4" fill="none" stroke-width="2" />
			{/if}
		</button>
	</div>

	<!-- 2. Information Section -->
	<div class="product-card__info mt-4 space-y-2">
		<h3
			class="font-medium text-black line-clamp-2 group-hover:text-gray-800 transition-colors group-hover:underline"
		>
			{product.title}
		</h3>

		{#if visualVariant}
			<div class="flex items-center gap-1">
				{#each visualVariant.values.slice(0, 4) as value}
					<span
						class="block h-4 w-4 rounded-full border-[0.25px] border-gray-200"
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
				<span class="text-base font-bold text-red-700">
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
		--swiper-pagination-color: var(--color-white, #ffffff);
		--swiper-navigation-color: var(--color-white, #ffffff);
		--swiper-navigation-bgcolor: var(--color-gray-900);
		--swiper-pagination-bullet-inactive-color: var(--color-gray-300, #d1d5db);
		--swiper-pagination-bullet-inactive-opacity: 1;
		--swiper-pagination-bullet-height: 2px;
		--swiper-pagination-bullet-width: 12px;
		--swiper-pagination-bullet-border-radius: 0;
		/* Hide navigation arrows by default, show on hover */
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
