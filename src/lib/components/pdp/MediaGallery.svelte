<!-- src/lib/components/pdp/MediaGallery.svelte -->
<script lang="ts">
	import type { Image } from '$lib/types/product';
	import { Heart } from '@lucide/svelte';
	import Lightbox from './Lightbox.svelte';

	let {
		images,
		isFavorite = false,
		toggleFavorite
	}: { images: Image[]; isFavorite?: boolean; toggleFavorite?: () => void } = $props();

	let activeIndex = $state(0);
	let isLightboxOpen = $state(false);

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
</script>

<div class="grid grid-cols-12 gap-2 col-span-8">
	<!-- Thumbnails -->
	{#if images.length > 1}
		<div class="flex flex-col gap-2 col-span-1">
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
	<!-- Main Image -->
	<button
		onclick={() => openLightbox(activeIndex)}
		class="relative aspect-square w-full overflow-hidden rounded-xl border bg-neutral-50 cursor-zoom-in group col-start-3 col-span-8"
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
	<div class="col-start-11 col-span-2 px-12">
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
	</div>
</div>

{#if isLightboxOpen}
	<Lightbox {images} initialIndex={activeIndex} bind:open={isLightboxOpen} />
{/if}
