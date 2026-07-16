<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const buttonVariants = tv({
		// Removed w-full and changed flex to inline-flex so it wraps content properly
		base: 'flex items-center justify-center font-semibold transition-colors rounded-full cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-500 text-sm',
		variants: {
			variant: {
				default: 'bg-primary hover:bg-primary-400 text-white',
				outline: 'bg-transparent border border-primary text-primary hover:bg-primary/5',
				secondary:
					'bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 text-gray-700 text-primary',
				white:
					'text-gray-900 bg-white hover:bg-neutral-50 border-gray-200 hover:border-gray-400 hover:text- border text-neutral-900',
				ghost: 'bg-transparent text-gray-900 hover:bg-gray-500/10 text-gray-700',
				destructive: 'bg-red-500 hover:bg-red-400',
				black: 'bg-black hover:bg-gray-800' // Added your specific black variant
			},
			size: {
				default: 'text-sm px-6 py-3 gap-3.5',
				full: 'w-full px-6 py-3 gap-3.5', // Use this when you actually want it to stretch
				xs: 'px-4 py-2 text-xs gap-2',
				sm: 'px-4 py-3',
				lg: 'px-8 py-4',
				icon: 'w-5 h-5 px-0 py-0',
				'icon-xs': 'w-3 h-3 px-0 py-0',
				'icon-sm': 'w-4 h-4 px-0 py-0',
				'icon-lg': 'w-6 h-6 px-0 py-0'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
