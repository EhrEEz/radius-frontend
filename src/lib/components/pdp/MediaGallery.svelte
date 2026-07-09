<!-- src/lib/components/pdp/MediaGallery.svelte -->
<script lang="ts">
	import type { Image } from '$lib/types/product';
	import Lightbox from './Lightbox.svelte';

	let { images }: { images: Image[] } = $props();

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

<div class="grid grid-cols-7 gap-2 col-span-6">
	<!-- Thumbnails -->
	{#if images.length > 1}
		<div class="flex flex-col gap-2 col-span-1">
			{#each images as image, i}
				<button
					onmouseenter={() => (activeIndex = i)}
					class="relative aspect-square overflow-hidden rounded-xl border-2 transition-all {i ===
					activeIndex
						? 'border-neutral-900'
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
		class="relative aspect-square w-full overflow-hidden rounded-lg border bg-neutral-50 cursor-zoom-in group col-span-6"
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
</div>

{#if isLightboxOpen}
	<Lightbox {images} initialIndex={activeIndex} bind:open={isLightboxOpen} />
{/if}
