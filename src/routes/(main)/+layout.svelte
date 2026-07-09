<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { register } from 'swiper/element/bundle';
	import 'swiper/css/bundle';
	onMount(() => {
		register();
	});
	let { children } = $props();
</script>

<Navbar />
<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	{@render children()}
</main>

<style>
	:global(.swiper-lazy-preloader) {
		display: none !important;
	}
</style>
