<!-- src/lib/components/CartDrawer.svelte -->
<script lang="ts">
	import { cart } from './cart.svelte';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { ShoppingCart, X } from '@lucide/svelte';

	let dialogNode = $state<HTMLDivElement>();
	let closeButton = $state<HTMLButtonElement>();

	// 1. Manage Focus: Move focus to the close button when the drawer opens
	$effect(() => {
		if (cart.isOpen && closeButton) {
			requestAnimationFrame(() => closeButton?.focus());
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		// 2. Allow Keyboard Dismissal
		if (e.key === 'Escape' && cart.isOpen) {
			e.stopPropagation();
			cart.close();
			return;
		}

		// 3. Focus Trap: Keep Tab navigation inside the dialog while open
		if (e.key === 'Tab' && cart.isOpen && dialogNode) {
			const focusableSelectors =
				'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
			const focusableElements = dialogNode.querySelectorAll(focusableSelectors);

			if (focusableElements.length === 0) return;

			const firstEl = focusableElements[0] as HTMLElement;
			const lastEl = focusableElements[focusableElements.length - 1] as HTMLElement;

			if (e.shiftKey) {
				if (document.activeElement === firstEl) {
					lastEl.focus();
					e.preventDefault();
				}
			} else {
				if (document.activeElement === lastEl) {
					firstEl.focus();
					e.preventDefault();
				}
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if cart.isOpen}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
		onclick={() => cart.close()}
		onkeydown={() => {}}
		role="presentation"
		transition:fade={{ duration: 200 }}
	></div>

	<!-- Drawer panel (Changed from <aside> to <div>) -->
	<div
		bind:this={dialogNode}
		class="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-white outline-none"
		role="dialog"
		aria-modal="true"
		aria-labelledby="cart-title"
		tabindex="-1"
		transition:fly={{ x: 400, duration: 300, easing: quintOut }}
	>
		<!-- Header -->
		<header class="flex items-center justify-between px-6 py-4">
			<!-- Added id="cart-title" to provide an accessible name via aria-labelledby -->
			<h2 id="cart-title" class="text-lg font-semibold flex gap-3 items-center">
				Cart
				{#if cart.lineCount > 0}
					<span class="ml-1 text-sm font-normal text-neutral-500">
						({cart.lineCount}
						{cart.lineCount === 1 ? 'item' : 'items'})
					</span>
				{/if}
			</h2>

			<!-- Close button gets focused automatically via $effect -->
			<button
				bind:this={closeButton}
				onclick={() => cart.close()}
				class="rounded-md p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
				aria-label="Close cart"
			>
				<X />
			</button>
		</header>

		<!-- Body -->
		<div class="flex-1 overflow-y-auto">
			{#if cart.isEmpty}
				<div class="flex h-full flex-col items-center justify-center px-6 text-center">
					<div class="text-neutral-300">
						<ShoppingCart class="h-16 w-16 " />
					</div>

					<p class="mt-4 text-neutral-600">Your cart is empty</p>
					<button
						onclick={() => cart.close()}
						class="mt-4 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
					>
						Continue shopping
					</button>
				</div>
			{:else}
				<ul class="divide-y">
					{#each cart.items as item (item.id)}
						<li class="flex gap-4 px-6 py-4">
							<a
								href="/products/{item.slug}"
								class="h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-neutral-50"
							>
								{#if item.image}
									<img src={item.image} alt={item.name} class="h-full w-full object-cover" />
								{:else}
									<div
										class="flex h-full w-full items-center justify-center text-xs text-neutral-400"
									>
										No image
									</div>
								{/if}
							</a>

							<div class="flex flex-1 flex-col">
								<div class="flex justify-between gap-2">
									<div>
										<a
											href="/products/{item.slug}"
											class="text-sm font-medium text-neutral-900 hover:underline"
										>
											{item.name}
										</a>
										<p class="mt-0.5 text-xs text-neutral-500">{item.variantLabel}</p>
									</div>
									<p class="text-sm font-medium text-neutral-900">
										${(item.price * item.quantity).toFixed(2)}
									</p>
								</div>

								<div class="mt-auto flex items-center justify-between pt-2">
									<div class="flex items-center rounded-md border">
										<button
											onclick={() => cart.updateQuantity(item.id, item.quantity - 1)}
											class="px-2 py-1 text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900"
											aria-label="Decrease quantity"
										>
											−
										</button>
										<span class="min-w-8 px-1 text-center text-sm tabular-nums">
											{item.quantity}
										</span>
										<button
											onclick={() => cart.updateQuantity(item.id, item.quantity + 1)}
											class="px-2 py-1 text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900"
											aria-label="Increase quantity"
										>
											+
										</button>
									</div>

									<div class="flex items-center gap-3 text-xs">
										<a
											href="/products/{item.slug}?edit={item.id}"
											class="font-medium text-neutral-700 hover:text-neutral-900 hover:underline"
										>
											Edit
										</a>
										<button
											onclick={() => cart.removeItem(item.id)}
											class="font-medium text-neutral-500 hover:text-red-600 hover:underline"
										>
											Remove
										</button>
									</div>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<!-- Footer -->
		{#if !cart.isEmpty}
			<footer class="border-t bg-neutral-50 px-6 py-4">
				<div class="mb-4 flex items-center justify-between">
					<span class="text-sm text-neutral-600">Subtotal</span>
					<span class="text-lg font-semibold tabular-nums">
						${cart.totalPrice.toFixed(2)}
					</span>
				</div>
				<p class="mb-4 text-xs text-neutral-500">Shipping and taxes calculated at checkout.</p>
				<a
					href="/checkout"
					class="block w-full rounded-md bg-neutral-900 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-neutral-800"
				>
					Checkout
				</a>
				<button
					onclick={() => cart.close()}
					class="mt-2 block w-full text-center text-sm font-medium text-neutral-600 hover:text-neutral-900"
				>
					Continue shopping
				</button>
			</footer>
		{/if}
	</div>
{/if}
