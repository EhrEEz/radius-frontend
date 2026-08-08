<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CartDrawer from '$lib/components/cart/CartDrawer.svelte';
	let { children } = $props();
</script>

<Navbar />
<main class="content-grid">
	{@render children()}
</main>
<Footer />
<CartDrawer />

<style>
	:global(.swiper-lazy-preloader) {
		display: none !important;
	}
</style>
