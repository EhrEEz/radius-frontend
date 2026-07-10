<script lang="ts">
	import type { Image } from '$lib/types/product';
	import { Heart } from '@lucide/svelte';
	import Lightbox from './Lightbox.svelte';

	let {
		images,
		allImages,
		isFavorite = false,
		toggleFavorite
	}: {
		images: Image[];
		allImages?: Image[];
		isFavorite?: boolean;
		toggleFavorite?: () => void;
	} = $props();

	let activeIndex = $state(0);
	let isLightboxOpen = $state(false);

	// Use allImages for the lightbox if provided, otherwise fallback to the current variant images
	let lightboxImages = $derived(allImages && allImages.length > 0 ? allImages : images);

	// Calculate the correct initial index for the lightbox based on the current active image
	let lightboxInitialIndex = $derived.by(() => {
		if (!lightboxImages.length) return 0;
		const currentImage = images[activeIndex];
		if (!currentImage) return 0;
		const idx = lightboxImages.findIndex((img) => img.url === currentImage.url);
		return idx !== -1 ? idx : 0;
	});

	// Reset active index if the images array changes (e.g., when switching variants)
	$effect(() => {
		if (images.length > 0 && activeIndex >= images.length) {
			activeIndex = 0;
		}
	});

	function openLightbox(index: number) {
		activeIndex = index;
		isLightboxOpen = true;
	}

	function prevImage() {
		if (activeIndex > 0) activeIndex--;
	}

	function nextImage() {
		if (activeIndex < images.length - 1) activeIndex++;
	}
</script>

<div class="grid grid-cols-11 gap-8 col-span-7">
	<!-- Thumbnails -->
	{#if images.length > 1}
		<div class="flex flex-col gap-2">
			{#each images as image, i}
				<button
					onmouseenter={() => (activeIndex = i)}
					class="relative aspect-square overflow-hidden rounded-xl border-2 transition-all {i ===
					activeIndex
						? 'ring-2 ring-neutral-900 ring-offset-1'
						: 'border-transparent hover:border-neutral-300'}"
					aria-label="View image {i + 1}"
				>
					<img src={image.url} alt={image.alt} class="h-full w-full object-cover" />
				</button>
			{/each}
		</div>
	{/if}

	<!-- Previous Button -->
	{#if images.length > 1}
		<div class="flex items-center justify-center">
			<button
				type="button"
				onclick={prevImage}
				disabled={activeIndex === 0}
				class="flex w-full aspect-square items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-200"
				aria-label="Previous image"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
		</div>
	{/if}

	<!-- Main Image -->
	<button
		onclick={() => openLightbox(activeIndex)}
		class="relative aspect-square w-full overflow-hidden rounded-xl border bg-neutral-50 cursor-zoom-in group {images.length > 1 ? 'col-start-3 col-span-8' : 'col-start-1 col-span-10'}"
		aria-label="View full screen"
	>
		{#if images[activeIndex]}
			<img
				src={images[activeIndex].url}
				alt={images[activeIndex].alt}
				class="h-full w-full object-cover transition-transform group-hover:scale-105"
			/>
		{/if}
	</button>

	<!-- Next & Favorite Buttons -->
	<div class="grid gap-4 col-start-11">
		<button
			type="button"
			onclick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				toggleFavorite?.();
			}}
			class={[
				'flex w-full aspect-square items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900',
				isFavorite
					? 'bg-red-500 text-white'
					: 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200 hover:border-gray-400'
			]}
		>
			<Heart class="h-6 w-6" fill={isFavorite ? 'currentColor' : 'none'} stroke-width="2" />
		</button>
		{#if images.length > 1}
			<button
				type="button"
				onclick={nextImage}
				disabled={activeIndex === images.length - 1}
				class="flex w-full aspect-square items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-200"
				aria-label="Next image"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		{/if}


	</div>
</div>

{#if isLightboxOpen}
	<Lightbox images={lightboxImages} initialIndex={lightboxInitialIndex} bind:open={isLightboxOpen} />
{/if}
