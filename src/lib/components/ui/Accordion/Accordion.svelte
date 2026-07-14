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

  $effect(() => {
 	 acState.isOpen = initiallyOpen;
  })

  // Provide the state to all child components
  setContext('accordion', acState);
</script>

<div class={["overflow-hidden", acState.isOpen ? "rounded-2xl bg-white" : ""]}>
  {@render children?.()}
</div>
