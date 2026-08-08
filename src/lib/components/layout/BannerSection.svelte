<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	// Svelte 5 Runes Props
	let {
		title,
		subtitle = undefined,
		textColor = 'text-white',
		bgColor = 'bg-gray-900',
		bgImage = undefined,
		bgVideo = undefined,
		overlayOpacity = 'bg-black/40', // Adjust to ensure text readability over media
		aspectRatio = 'aspect-[5/1]',
		align = 'center', // 'left' | 'center' | 'right'
		children = undefined,
		class: className
	}: {
		title: string;
		subtitle?: string;
		textColor?: string;
		bgColor?: string;
		bgImage?: string;
		bgVideo?: string;
		overlayOpacity?: string;
		aspectRatio?: string;
		align?: 'left' | 'center' | 'right';
		children?: Snippet;
		class?: HTMLAttributes<HTMLElement>['class'];
	} = $props();

	// Derived alignment classes
	const alignClasses = $derived.by(() => {
		switch (align) {
			case 'left':
				return 'text-left items-start';
			case 'right':
				return 'text-right items-end';
			default:
				return 'text-center items-center';
		}
	});
</script>

<section class={cn('relative w-full overflow-hidden my-8', aspectRatio, className)}>
	<!-- 1. Background Layer -->
	{#if bgVideo}
		<video
			class="absolute inset-0 h-full w-full object-cover rounded-4xl"
			autoplay
			muted
			loop
			playsinline
			preload="metadata"
		>
			<source src={bgVideo} type="video/mp4" />
		</video>
	{:else if bgImage}
		<img
			src={bgImage}
			alt={title}
			class="absolute inset-0 h-full w-full object-cover rounded-4xl"
			loading="eager"
		/>
	{:else}
		<div class={['absolute inset-0 h-full w-full rounded-4xl', bgColor]}></div>
	{/if}

	<!-- 2. Overlay Layer (Ensures text contrast) -->
	<div class={['absolute inset-0 rounded-4xl', overlayOpacity]}></div>
	<div
		class="absolute inset-0 border border-gray-600 rounded-4xl mix-blend-multiply opacity-5"
	></div>
	<!-- 3. Content Layer -->
	<div
		class={[
			'relative z-10 flex h-full w-full flex-col justify-center px-4 sm:px-6 lg:px-24',
			alignClasses
		]}
	>
		<div class="">
			<h1
				class="text-4xl font-semibold tracking-tight text-balance {textColor} font-serif md:text-5xl lg:text-6xl"
			>
				{title}
			</h1>

			{#if subtitle}
				<p class="mt-3 text-base text-balance {textColor} md:text-base opacity-90">
					{subtitle}
				</p>
			{/if}

			{#if children}
				<div class="mt-6 flex flex-wrap gap-4">
					{@render children()}
				</div>
			{/if}
		</div>
	</div>
</section>
