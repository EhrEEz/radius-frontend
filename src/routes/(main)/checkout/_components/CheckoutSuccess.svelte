<!-- src/routes/checkout/_components/CheckoutSuccess.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/Button';
	import { Check, Info, ShoppingCart } from '@lucide/svelte';

	let { method } = $props<{ method: 'cod' | 'qr' }>();
</script>

<div class="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-8 text-center">
	<div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
		<Check class="h-8 w-8 text-green-600" />
	</div>

	<h2 class="text-3xl font-bold text-primary font-serif mb-2">Order Placed Successfully!</h2>
	<p class="text-gray-600 mb-6">
		Thank you for your purchase. Your order has been received and is being processed.
	</p>

	<!-- Specific Notification -->
	<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left mb-8">
		<h3 class="font-semibold font-serif text-blue-900 mb-2 flex items-center">
			<Info class="w-4 h-4 mr-2" />

			What happens next?
		</h3>
		<ul class="text-sm text-blue-800 space-y-1 list-decimal list-inside">
			<li>We will reach out to you shortly to confirm your order details.</li>
			{#if method === 'qr'}
				<li>
					Once your QR payment proof has been verified, an official invoice will be sent to your
					email.
				</li>
			{:else}
				<li>Please prepare the exact amount in cash for the courier upon delivery.</li>
				<li>An official invoice will be included with your delivered items.</li>
			{/if}
		</ul>
	</div>
	<Button class="w-fit mx-auto gap-3" size="lg" href="/"
		><ShoppingCart class="w-5 h-5" />Continue Shopping</Button
	>
</div>
