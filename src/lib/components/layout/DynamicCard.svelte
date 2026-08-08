<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	let {
		bgImage = undefined,
		bgVideo = undefined,
		bgColor = 'bg-neutral-900',
		overlayOpacity = 'bg-black/35',
		aspectRatio = 'aspect-auto min-h-[360px]',
		hoverZoom = true,
		children = undefined,
		class: className,
		...restProps
	}: {
		bgImage?: string;
		bgVideo?: string;
		bgColor?: string;
		overlayOpacity?: string;
		aspectRatio?: string;
		hoverZoom?: boolean;
		children?: Snippet;
		class?: HTMLAttributes<HTMLElement>['class'];
		[key: string]: any;
	} = $props();
</script>

<div
	class={[
		'relative overflow-hidden rounded-3xl group flex flex-col justify-between transition-all duration-300',
		aspectRatio,
		className
	]}
	{...restProps}
>
	<!-- 1. Background Layer -->
	{#if bgVideo}
		<video
			class="absolute inset-0 h-full w-full object-cover rounded-3xl"
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
			alt=""
			class={[
				'absolute inset-0 h-full w-full object-cover rounded-3xl transition-transform duration-700 ease-out',
				hoverZoom ? 'group-hover:scale-105' : ''
			]}
			loading="lazy"
		/>
	{:else}
		<div class={['absolute inset-0 h-full w-full rounded-3xl', bgColor]}></div>
	{/if}

	<!-- 2. Overlay Layer -->
	{#if overlayOpacity}
		<div class={['absolute inset-0 rounded-3xl transition-opacity duration-300', overlayOpacity]}></div>
	{/if}
	<div
		class="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none"
	></div>

	<!-- 3. Dynamic Children Content Slot -->
	{#if children}
		<div class="relative z-10 flex h-full w-full flex-col justify-between p-6 sm:p-8 lg:p-10">
			{@render children()}
		</div>
	{/if}
</div>
