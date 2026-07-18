<!-- src/lib/components/ui/Slide.svelte -->
<script lang="ts">
	import { cn } from "$lib/utils";

	let { class: className = '', children } = $props();
</script>

<swiper-slide class={cn("h-full w-full", className)}>
	{@render children?.()}
</swiper-slide>
