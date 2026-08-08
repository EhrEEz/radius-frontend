<script lang="ts">
	import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from '@lucide/svelte';
	import type { SwiperContainer } from 'swiper/element';
	import { onMount } from 'svelte';
	import { register } from 'swiper/element/bundle';

	export interface CollectionItem {
		id: string;
		title: string;
		subtitle?: string;
		badge?: string;
		itemCount?: string;
		image: string;
		href: string;
		tagColor?: string;
	}

	let {
		title = 'Curated Collections',
		subtitle = 'Handcrafted edits designed for intentional living and everyday purpose.',
		collections = []
	}: {
		title?: string;
		subtitle?: string;
		collections: CollectionItem[];
	} = $props();

	let swiperEl = $state<SwiperContainer | null>(null);
	let isBeginning = $state(true);
	let isEnd = $state(false);

	onMount(() => {
		register();
		if (swiperEl) {
			Object.assign(swiperEl, {
				slidesPerView: 1.2,
				spaceBetween: 16,
				breakpoints: {
					640: { slidesPerView: 2.2, spaceBetween: 20 },
					1024: { slidesPerView: 3.2, spaceBetween: 24 },
					1280: { slidesPerView: 4, spaceBetween: 24 }
				}
			});
			swiperEl.initialize();

			swiperEl.addEventListener('swiperslidechange', () => {
				if (swiperEl?.swiper) {
					isBeginning = swiperEl.swiper.isBeginning;
					isEnd = swiperEl.swiper.isEnd;
				}
			});
		}
	});

	function slidePrev() {
		swiperEl?.swiper?.slidePrev();
	}

	function slideNext() {
		swiperEl?.swiper?.slideNext();
	}
</script>

<section class="my-16 sm:my-20">
	<!-- Header & Controls -->
	<div class="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
		<div>
			<div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-700">
				<Sparkles class="h-3.5 w-3.5" />
				<span>Curated Selections</span>
			</div>
			<h2 class="mt-1 text-3xl sm:text-4xl font-serif font-semibold text-gray-900 tracking-tight">
				{title}
			</h2>
			{#if subtitle}
				<p class="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
					{subtitle}
				</p>
			{/if}
		</div>

		<!-- Navigation Arrows -->
		<div class="hidden sm:flex items-center gap-2 shrink-0">
			<button
				onclick={slidePrev}
				disabled={isBeginning}
				aria-label="Previous slide"
				class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
			>
				<ChevronLeft class="h-5 w-5" />
			</button>
			<button
				onclick={slideNext}
				disabled={isEnd}
				aria-label="Next slide"
				class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
			>
				<ChevronRight class="h-5 w-5" />
			</button>
		</div>
	</div>

	<!-- Slider -->
	<div class="relative overflow-hidden">
		<swiper-container bind:this={swiperEl} init="false" class="w-full">
			{#each collections as item (item.id)}
				<swiper-slide class="h-auto">
					<a
						href={item.href}
						class="group relative flex h-[380px] w-full flex-col justify-between overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:shadow-xl block border border-gray-200/80"
					>
						<!-- Image with Zoom -->
						<img
							src={item.image}
							alt={item.title}
							class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
							loading="lazy"
						/>

						<!-- Gradient Overlay -->
						<div
							class="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/30 to-black/20 transition-opacity duration-300 group-hover:from-gray-950/90"
						></div>

						<!-- Top Badge -->
						<div class="relative z-10 flex items-center justify-between">
							{#if item.badge}
								<span
									class="inline-flex items-center rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm"
								>
									{item.badge}
								</span>
							{:else}
								<span></span>
							{/if}

							{#if item.itemCount}
								<span class="text-xs font-medium text-white/80 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-0.5">
									{item.itemCount}
								</span>
							{/if}
						</div>

						<!-- Bottom Content -->
						<div class="relative z-10">
							<h3 class="text-xl sm:text-2xl font-serif font-semibold text-white group-hover:text-amber-200 transition-colors">
								{item.title}
							</h3>
							{#if item.subtitle}
								<p class="mt-1 text-xs sm:text-sm text-gray-300 line-clamp-2">
									{item.subtitle}
								</p>
							{/if}

							<div class="mt-4 flex items-center gap-2 text-xs font-semibold text-white/90 group-hover:text-white">
								<span>Explore Collection</span>
								<ArrowRight class="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
							</div>
						</div>
					</a>
				</swiper-slide>
			{/each}
		</swiper-container>
	</div>
</section>
