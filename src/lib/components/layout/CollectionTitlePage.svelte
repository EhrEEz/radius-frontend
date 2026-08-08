<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

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

<section
	class={['full-width content-grid relative w-full overflow-hidden', aspectRatio, className]}
>
	<!-- 1. Background Layer -->
	{#if bgVideo}
		<video
			class="full-width absolute inset-0 h-full w-full object-cover"
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
			class="full-width absolute inset-0 h-full w-full object-cover"
			loading="eager"
		/>
	{:else}
		<div class={['full-width absolute inset-0 h-full w-full', bgColor]}></div>
	{/if}

	<!-- 2. Overlay Layer (Ensures text contrast) -->
	<div class={['absolute inset-0 rounded-4xl', overlayOpacity]}></div>

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
		</div>
	</div>
</section>
