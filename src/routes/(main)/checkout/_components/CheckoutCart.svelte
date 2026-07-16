<!-- src/routes/checkout/_components/CheckoutCart.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/Button';
	import { CircleCheck } from '@lucide/svelte';
	import { cart } from '$lib/components/cart/cart.svelte';

	let {
		subtotal,
		shippingFee,
		tax,
		discountAmount,
		total,
		coupon,
		onApplyCoupon,
		onRemoveCoupon,
		nextStep
	} = $props<{
		subtotal: number;
		shippingFee: number;
		tax: number;
		discountAmount: number;
		total: number;
		coupon: { code: string; applied: boolean };
		onApplyCoupon: () => void;
		onRemoveCoupon: () => void;
		nextStep: () => void;
	}>();
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
	<!-- Left: Cart Items & Coupon -->
	<div class="lg:col-span-2 space-y-6">
		<h2 class="text-2xl font-semibold text-gray-900 font-serif">Review Your Cart</h2>
		<div class="bg-white rounded-lg border border-gray-200 divide-y">
			{#each cart.items as item}
				<li class="flex gap-4 px-6 py-4">
					<a
						href="/products/{item.slug}"
						class="h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-neutral-50"
					>
						{#if item.image}
							<img src={item.image} alt={item.name} class="h-full w-full object-cover" />
						{:else}
							<div class="flex h-full w-full items-center justify-center text-xs text-neutral-400">
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
								{#if item.variantLabel}
									<p class="mt-0.5 text-xs text-neutral-500">{item.variantLabel}</p>
								{/if}
							</div>
							<p class="text-sm font-medium text-neutral-900">
								₱{(item.price * item.quantity).toFixed(2)}
							</p>
						</div>

						<div class="mt-auto flex items-center justify-between pt-2">
							<!-- Quantity Display (Read-only for checkout) -->
							<div class="flex items-center rounded-md border bg-neutral-50 px-3 py-1">
								<span class="text-sm text-neutral-600">Qty:</span>
								<span class="ml-1 text-sm font-medium tabular-nums text-neutral-900">
									{item.quantity}
								</span>
							</div>

							<div class="flex items-center gap-3 text-xs">
								<a
									href="/cart"
									class="font-medium text-neutral-700 hover:text-neutral-900 hover:underline"
								>
									Edit in Cart
								</a>
							</div>
						</div>
					</div>
				</li>
			{/each}
		</div>
	</div>
	<!-- Right: Summary & Continue -->
	<div class="lg:col-span-1">
		<div class="sticky top-16">
			<div class="bg-white rounded-lg border border-gray-200 p-6 mb-4">
				<h3 class="font-semibold text-gray-900 mb-4 font-serif text-xl">Order Summary</h3>
				<div class="space-y-2 text-sm">
					<div class="flex justify-between text-gray-600">
						<span>Subtotal</span><span>₱{subtotal.toLocaleString()}</span>
					</div>
					{#if discountAmount > 0}
						<div class="flex justify-between text-green-600">
							<span>Discount</span><span>-₱{discountAmount.toLocaleString()}</span>
						</div>
					{/if}
					<div class="flex justify-between text-gray-600">
						<span>Shipping Fee</span><span>₱{shippingFee.toLocaleString()}</span>
					</div>
					<div class="flex justify-between text-gray-600">
						<span>Tax (12% VAT)</span><span>₱{tax.toLocaleString()}</span>
					</div>
					<div class="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t mt-3">
						<span>Total</span><span>₱{total.toLocaleString()}</span>
					</div>
				</div>
				<Button class="mt-6" size="full" onclick={nextStep}>Continue to Shipping</Button>
			</div>
			<div class="bg-white rounded-lg border border-gray-200 p-4">
				<h3 class="font-semibold text-gray-900 mb-3 font-serif text-xl">Coupon Code</h3>
				{#if coupon.applied}
					<div
						class="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md"
					>
						<div class="flex items-center gap-2">
							<CircleCheck stroke-width="1.5" />
							<span class="font-medium text-sm">Code "{coupon.code}" applied!</span>
						</div>
						<button onclick={onRemoveCoupon} class="text-red-600 text-sm hover:underline">
							Remove
						</button>
					</div>
				{:else}
					<div class="flex gap-2">
						<input
							type="text"
							bind:value={coupon.code}
							placeholder="Enter code (Try 'SAVE10')"
							class="flex-1 rounded-full border-gray-300 shadow-sm focus:border-gray-500 focus:ring-black sm:text-sm px-6 py-3 border"
						/>
						<Button size="sm" onclick={onApplyCoupon}>Apply Coupon</Button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
