<script lang="ts">
  const {color = "primary"}: {color?: string} = $props();
</script>

<a href="/" class="flex items-center gap-2 shrink-0">
	<div class="w-8 h-8 lg:w-10 lg:h-10 bg-{color} rounded-full flex items-center justify-center">
		<span class="text-{color} mix-blend-difference font-semibold text-base lg:text-xl leading-tight font-serif">R</span>
	</div>
	<span class="text-xl lg:text-2xl font-semibold text-{color} hidden sm:block font-serif"
		>Radius</span
	>
</a>
