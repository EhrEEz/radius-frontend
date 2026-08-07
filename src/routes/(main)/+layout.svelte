<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import CartDrawer from '$lib/components/cart/CartDrawer.svelte';
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
