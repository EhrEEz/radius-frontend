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

	let currentIndex = $derived(initialIndex);
	let scale = $state(1);
	let translateX = $state(0);
	let translateY = $state(0);

	let isDragging = $state(false);
	let startX = 0;
	let startY = 0;
	let lastTranslateX = 0;
	let lastTranslateY = 0;

	let currentImage = $derived(images[currentIndex]);
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
	function next() {
		if (currentIndex < images.length - 1) {
			currentIndex++;
			resetZoom();
		}
	}
	function prev() {
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
	<div
		class="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-sm"
		onclick={close}
		onkeydown={() => {}}
		role="presentation"
		transition:fade={{ duration: 200 }}
	>
		<button
			onclick={close}
			class="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full z-10"
			aria-label="Close viewer"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/></svg
			>
		</button>

		{#if currentIndex > 0}
			<button
				onclick={prev}
				class="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full z-10"
				aria-label="Previous image"
			>
				<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/></svg
				>
			</button>
		{/if}
		{#if currentIndex < images.length - 1}
			<button
				onclick={next}
				class="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full z-10"
				aria-label="Next image"
			>
				<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5l7 7-7 7"
					/></svg
				>
			</button>
		{/if}

		<div
			class="relative w-full h-full flex items-center justify-center overflow-hidden"
			class:cursor-zoom-in={scale === 1}
			class:cursor-grab={scale > 1 && !isDragging}
			class:cursor-grabbing={isDragging}
			onwheel={handleWheel}
			onmousedown={handleMouseDown}
			onmousemove={handleMouseMove}
			onmouseup={handleMouseUp}
			onmouseleave={handleMouseUp}
			onclick={stopClick}
			role="dialog"
			onkeydown={handleKeydown}
			tabindex={0}
			aria-modal="true"
			aria-label="Image viewer"
		>
			<img
				src={currentImage.url}
				alt={currentImage.alt}
				class="max-w-full max-h-full object-contain transition-transform duration-100 select-none pointer-events-none"
				style="transform: scale({scale}) translate({translateX}px, {translateY}px);"
				draggable="false"
			/>
		</div>

		<div
			class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 rounded-full"
		>
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each images as _, i}
				<button
					onclick={() => {
						currentIndex = i;
						resetZoom();
					}}
					class="w-2 h-2 rounded-full transition-all {i === currentIndex
						? 'bg-white scale-125'
						: 'bg-white/50 hover:bg-white/80'}"
					aria-label="Go to image {i + 1}"
				></button>
			{/each}
		</div>
	</div>
{/if}
