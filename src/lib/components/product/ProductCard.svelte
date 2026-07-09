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

	function formatPrice(amount: number, currency: string) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency
		}).format(amount);
	}

	// --- Variant Selection Logic ---
	// Pick the first option that has visual swatches (like Color), otherwise pick the first option (like Size)
	let displayVariant = $derived(
		product.variantOptions?.find((opt) =>
			opt.values.some((val) => val.hexColor || val.thumbnailUrl)
		) || product.variantOptions?.[0]
	);

	// --- Swiper Initialization ---
	let swiperEl = $state<SwiperContainer | null>(null);
	let activeIndex = $state(0);

	onMount(() => {
		register();
		if (swiperEl && product.images.length > 1) {
			Object.assign(swiperEl, {
				lazy: false,
				navigation: false,
				pagination: false,
				slidesPerView: 1,
				loop: true
			});

			swiperEl.initialize();

			swiperEl.addEventListener('swiperslidechange', () => {
				// @ts-expect-error swiperEl May not be present
				activeIndex = swiperEl.swiper.activeIndex;
			});
		}
	});

	function slideNext() {
		swiperEl?.swiper?.slideNext();
	}

	function slidePrev() {
		swiperEl?.swiper?.slidePrev();
	}
</script>

<a
	{href}
	class="product-card block group focus:outline-none focus-visible:ring-2 rounded-xl p-2 bg-white border border-gray-200"
>
	<!-- 1. Media / Image Slider Section -->
	<div class="product-card__media relative aspect-square overflow-hidden rounded-xl bg-gray-200">
		{#if product.images.length > 1}
			<swiper-container bind:this={swiperEl} init="false" class="h-full w-full">
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

			<!-- Custom Navigation Buttons -->
			<button
				type="button"
				onclick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					slidePrev();
				}}
				class="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900/90 text-white opacity-0 transition-opacity hover:bg-gray-900 group-hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
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
			>
				<ChevronRight class="h-4 w-4" stroke-width="2.5" />
			</button>

			<!-- Custom Pagination Dots -->
			<div class="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 flex gap-1.5">
				<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
				{#each product.images as _, i}
					<span
						class="block h-1.5 w-1.5 rounded-full bg-white/50 transition-all"
						class:bg-white={i === activeIndex}
						class:scale-125={i === activeIndex}
					></span>
				{/each}
			</div>
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
		{#if hasDiscount}
			<span
				class="absolute top-3 left-3 z-10 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-bold text-white"
			>
				{#if calculatedDiscount > 0}SALE -{calculatedDiscount}%{:else}SALE{/if}
			</span>
		{/if}

		<!-- Favorites Button -->
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
					? 'bg-red-500 text-white'
					: 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
			]}
		>
			<Heart class="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} stroke-width="2" />
		</button>
	</div>

	<!-- 2. Information Section -->
	<div class="product-card__info mt-4 space-y-3">
		<h3
			class="font-medium text-black line-clamp-2 group-hover:text-gray-800 transition-colors group-hover:underline"
		>
			{product.title}
		</h3>

		<!-- Cleaned Up Variant Display -->
		{#if displayVariant}
			<div class="flex flex-wrap items-center gap-1.5">
				{#each displayVariant.values.slice(0, 5) as value}
					{#if value.hexColor || value.thumbnailUrl}
						<!-- Visual Swatch -->
						<span
							class="block h-4 w-4 rounded-full border-[0.25px] border-gray-200"
							style={value.hexColor
								? `background-color: ${value.hexColor}`
								: `background-image: url(${value.thumbnailUrl}); background-size: cover;`}
							title={value.label}
						></span>
					{:else}
						<!-- Text Badge (Cleaner styling) -->
						<span
							class="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-600"
						>
							{value.label}
						</span>
					{/if}
				{/each}
				{#if displayVariant.values.length > 5}
					<span class="text-xs text-gray-400">+{displayVariant.values.length - 5}</span>
				{/if}
			</div>
		{/if}

		<div class="flex items-baseline gap-2">
			{#if hasDiscount && product.price.discountedAmount !== undefined}
				<span class="text-base font-bold text-red-700"
					>{formatPrice(product.price.discountedAmount, product.price.currency)}</span
				>
				<span class="text-sm text-gray-400 line-through"
					>{formatPrice(product.price.amount, product.price.currency)}</span
				>
			{:else}
				<span class="text-base font-bold text-gray-900"
					>{formatPrice(product.price.amount, product.price.currency)}</span
				>
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
