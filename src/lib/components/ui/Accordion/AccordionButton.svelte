<script lang="ts">
  import { getContext } from 'svelte';
  import { ChevronDown } from '@lucide/svelte';

  let { children }: { children?: import('svelte').Snippet } = $props();

  // Consume the state from the parent Accordion
  const ctx = getContext<{ isOpen: boolean; toggle: () => void }>('accordion');
</script>

<button
  onclick={() => {
  ctx.toggle();
  }}
  class={["w-full flex items-center justify-between px-6 py-4  hover:bg-neutral-50 transition-colors text-left ", ctx.isOpen ? "rounded-none": "bg-white rounded-full"]}
>
  <span class="font-semibold text-neutral-900">
    {@render children?.()}
  </span>
  <ChevronDown
    class="w-5 h-5 text-neutral-500 transition-transform {ctx.isOpen ? 'rotate-180' : ''}"
  />
</button>
