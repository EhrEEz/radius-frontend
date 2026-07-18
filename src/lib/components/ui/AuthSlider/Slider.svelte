<!-- src/lib/components/ui/Slider.svelte -->
<script lang="ts">
	import { fade } from 'svelte/transition';
	import { register } from 'swiper/element';
	import { onMount } from 'svelte';
	import type { SwiperContainer } from 'swiper/element';
	import 'swiper/css';
	import { EffectFade } from 'swiper/modules';
	import 'swiper/css/effect-fade';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	let { loop = true, children } = $props();

	let swiperEl = $state<SwiperContainer | null>(null);
	let isFirstSlide = $state(true);
	let isLastSlide = $state(false);

	onMount(() => {
		register();
		if (swiperEl) {
			Object.assign(swiperEl, {
				lazy: false,
				navigation: false,
				pagination: false,
				slidesPerView: 1,
				loop: loop,
				effect: 'fade',
				modules: [EffectFade],
				fadeEffect: { crossFade: false },
				injectStyles: [
					`
									.swiper-effect-fade .swiper-slide {
										transition-property: opacity, transform !important;
									}
									`
				]
			});

			swiperEl.initialize();

			// 2. Listen to Swiper's progress and index changes
			swiperEl.swiper.on('slideChange', () => {
				if (!swiperEl?.swiper) return;

				// Swiper provides helper properties for boundaries
				isFirstSlide = swiperEl.swiper.isBeginning;
				isLastSlide = swiperEl.swiper.isEnd;
			});

			// Initial check after setup
			isFirstSlide = swiperEl.swiper.isBeginning;
			isLastSlide = swiperEl.swiper.isEnd;
		}
	});

	function slideNext() {
		swiperEl?.swiper?.slideNext();
	}

	function slidePrev() {
		swiperEl?.swiper?.slidePrev();
	}
</script>

<div class="relative h-full w-full overflow-hidden" in:fade={{ duration: 400 }}>
	<swiper-container bind:this={swiperEl} init="false" class="h-full w-full" effect="fade">
		{@render children?.()}
	</swiper-container>

	<!-- Custom Navigation Buttons -->
	<div class="absolute bottom-0 right-0 z-20 flex gap-2 p-8">
		<div class="relative">
			<div
				role="presentation"
				class="absolute right-0 top-0 -translate-y-full rounded-br-xl shadow-[0_0_0_1rem_var(--white)]"
			></div>
		</div>

		<button
			type="button"
			onclick={slidePrev}
			class="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition duration-200 hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-sm disabled:opacity-25 disabled:pointer-events-none"
			aria-label="Previous slide"
			disabled={isFirstSlide}
		>
			<ChevronLeft class="w-5 h-5" />
		</button>
		<button
			type="button"
			onclick={slideNext}
			class="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition duration-200 hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-sm disabled:opacity-25 disabled:pointer-events-none"
			aria-label="Next slide"
			disabled={isLastSlide}
		>
			<ChevronRight class="w-5 h-5" />
		</button>
	</div>
</div>
