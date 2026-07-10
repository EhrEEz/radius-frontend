<script lang="ts">
  import { setContext } from 'svelte';

  // Reactive class to hold the accordion state
  class AccordionState {
    isOpen = $state(false);
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }

  let {
    initiallyOpen = false,
    children
  }: {
    initiallyOpen?: boolean;
    children?: import('svelte').Snippet;
  } = $props();

  const acState = new AccordionState();
  acState.isOpen = initiallyOpen;

  // Provide the state to all child components
  setContext('accordion', acState);
</script>

<div class="border border-neutral-200 rounded-lg overflow-hidden">
  {@render children?.()}
</div>
