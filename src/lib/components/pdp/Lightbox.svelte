<!-- src/lib/components/pdp/Lightbox.svelte -->
<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Image } from '$lib/types/product';

	let {
		images,
		initialIndex = 0,
		open = $bindable(false)
	}: {
		images: Image[];
		initialIndex?: number;
		open: boolean;
	} = $props();

	let currentIndex = $state(initialIndex);
	let scale = $state(1);
	let translateX = $state(0);
	let translateY = $state(0);

	let isDragging = $state(false);
	let startX = 0;
	let startY = 0;
	let lastTranslateX = 0;
	let lastTranslateY = 0;

	let currentImage = $derived(images[currentIndex]);

	// Grouping logic for thumbnails
	let groupedImages = $derived.by(() => {
			const groups = new Map<string, { name: string; images: { image: any; index: number }[] }>();

			images.forEach((img, index) => {
				// Read the variantName we attached in the page component
				const key = (img as any).variantName || 'All Images';

				if (!groups.has(key)) {
					groups.set(key, { name: key, images: [] });
				}
				groups.get(key)!.images.push({ image: img, index });
			});

			return Array.from(groups.values());
		});

	$effect(() => {
		if (open) {
			currentIndex = initialIndex;
			resetZoom();
		}
	});

	function resetZoom() {
		scale = 1;
		translateX = 0;
		translateY = 0;
	}

	function next(e?: MouseEvent) {
		e?.stopPropagation();
		if (currentIndex < images.length - 1) {
			currentIndex++;
			resetZoom();
		}
	}

	function prev(e?: MouseEvent) {
		e?.stopPropagation();
		if (currentIndex > 0) {
			currentIndex--;
			resetZoom();
		}
	}

	function close() {
		open = false;
	}

	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		scale = Math.min(Math.max(1, scale + (e.deltaY > 0 ? -0.2 : 0.2)), 5);
		if (scale === 1) resetZoom();
	}

	function handleMouseDown(e: MouseEvent) {
		if (scale > 1) {
			isDragging = true;
			startX = e.clientX;
			startY = e.clientY;
			lastTranslateX = translateX;
			lastTranslateY = translateY;
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if (isDragging) {
			translateX = lastTranslateX + (e.clientX - startX);
			translateY = lastTranslateY + (e.clientY - startY);
		}
	}

	function handleMouseUp() {
		isDragging = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowRight') next();
		if (e.key === 'ArrowLeft') prev();
	}

	function stopClick(e: MouseEvent) {
		e.stopPropagation();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- Main overlay: Changed to flex-col. Clicking anywhere on this background closes the lightbox -->
	<div
		class="fixed inset-0 z-60 flex flex-col bg-black/90 backdrop-blur-sm"
		onclick={close}
		role="presentation"
		transition:fade={{ duration: 200 }}
	>
		<!-- Close Button -->
		<button
			onclick={close}
			class="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full z-20"
			aria-label="Close viewer"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>

		<!-- Main Image Area (Takes up remaining vertical space) -->
		<div class="flex-1 flex items-center justify-center relative overflow-hidden">
			{#if currentIndex > 0}
				<button
					onclick={prev}
					class="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white bg-black/40 hover:bg-black/60 rounded-full z-10 transition-colors"
					aria-label="Previous image"
				>
					<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
			{/if}

			{#if currentIndex < images.length - 1}
				<button
					onclick={next}
					class="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white bg-black/40 hover:bg-black/60 rounded-full z-10 transition-colors"
					aria-label="Next image"
				>
					<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			{/if}

			<!-- Image Container for Zoom/Pan -->
			<div
				class="relative flex items-center justify-center w-full h-full"
				class:cursor-zoom-in={scale === 1}
				class:cursor-grab={scale > 1 && !isDragging}
				class:cursor-grabbing={isDragging}
				onwheel={handleWheel}
				onmousedown={handleMouseDown}
				onmousemove={handleMouseMove}
				onmouseup={handleMouseUp}
				onmouseleave={handleMouseUp}
				role="dialog"
				onkeydown={handleKeydown}
				tabindex={0}
				aria-modal="true"
				aria-label="Image viewer"
			>
				<!-- The image itself stops click propagation so clicking it doesn't close the lightbox -->
				<img
					src={currentImage?.url}
					alt={currentImage?.alt}
					class="max-w-full max-h-full object-contain transition-transform duration-100 select-none pointer-events-auto"
					style="transform: scale({scale}) translate({translateX}px, {translateY}px);"
					draggable="false"
					onclick={stopClick}
				/>
			</div>
		</div>

		<!-- Variant Grouped Thumbnails (No longer absolute, sits cleanly below the image) -->
		<div class="flex-shrink-0 w-full max-w-5xl mx-auto px-4 pb-6 z-10" onclick={stopClick}>
			<div class="flex flex-col gap-4 max-h-40 overflow-y-auto bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl">
				{#each groupedImages as group}
					<div class="flex flex-col gap-2">
						<span class="text-xs text-white/80 uppercase tracking-wider font-semibold px-1">{group.name}</span>
						<div class="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
							{#each group.images as { image, index }}
								<button
									onclick={() => {
										currentIndex = index;
										resetZoom();
									}}
									class="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all {index === currentIndex ? 'border-white ring-2 ring-white/50 scale-105' : 'border-transparent hover:border-white/50 opacity-60 hover:opacity-100'}"
									aria-label="Go to image {index + 1}"
								>
									<img src={image.url} alt={image.alt} class="w-full h-full object-cover pointer-events-none" draggable="false" />
								</button>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.custom-scrollbar::-webkit-scrollbar {
		height: 6px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.3);
		border-radius: 10px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.5);
	}
</style>
