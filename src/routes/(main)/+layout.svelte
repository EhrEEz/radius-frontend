<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { register } from 'swiper/element/bundle';
	import CartDrawer from '$lib/components/cart/CartDrawer.svelte';

	import 'swiper/css/bundle';
	onMount(() => {
		register();
	});
	let { children } = $props();
</script>

<Navbar />
<main class="content-grid">
	{@render children()}
</main>
<CartDrawer />

<style>
	:global(.swiper-lazy-preloader) {
		display: none !important;
	}
</style>
