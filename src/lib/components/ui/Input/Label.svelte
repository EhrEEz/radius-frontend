<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils';

	type Props = WithElementRef<HTMLLabelAttributes>;

	let { class: className, children, ...restProps }: Props = $props();
</script>

<label
	class={cn("absolute left-3.5 top-1/2 -translate-y-1/2 peer-focus:translate-y-0 peer-focus:-translate-x-1 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:-translate-x-1 text-sm text-gray-500 transition-all duration-200 pointer-events-none peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white peer-focus:px-1 peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1", className)}
	{...restProps}
>
	{@render children?.()}
</label>
