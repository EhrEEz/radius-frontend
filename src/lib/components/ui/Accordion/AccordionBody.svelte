<script lang="ts">
  import { getContext } from 'svelte';
  import { ChevronDown } from '@lucide/svelte';

  let { children }: { children?: import('svelte').Snippet } = $props();

  // Consume the state from the parent Accordion
  const ctx = getContext<{ isOpen: boolean; toggle: () => void }>('accordion');
</script>

<button
  onclick={ctx.toggle}
  class="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-neutral-50 transition-colors text-left"
>
  <span class="font-semibold text-neutral-900">
    {@render children?.()}
  </span>
  <ChevronDown
    class="w-5 h-5 text-neutral-500 transition-transform {ctx.isOpen ? 'rotate-180' : ''}"
  />
</button>
