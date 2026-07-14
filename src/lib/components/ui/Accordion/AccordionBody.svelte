<script lang="ts">
  import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';

  let { children }: { children?: import('svelte').Snippet } = $props();

  // Consume the state from the parent Accordion
  const ctx = getContext<{ isOpen: boolean; toggle: () => void }>('accordion');
</script>

{#if ctx.isOpen}
  <div class="px-6 pb-3" transition:slide>
    {@render children?.()}
  </div>
{/if}
