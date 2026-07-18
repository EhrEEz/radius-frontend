<script lang="ts">
	let { children } = $props();
</script>

<main class="content-grid">
	<div class="flex items-center justify-center md:p-4 h-dvh py-24">
		{@render children()}
	</div>
</main>
