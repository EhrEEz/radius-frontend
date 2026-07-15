<!-- src/routes/checkout/_components/CheckoutSuccess.svelte -->
<script lang="ts">
	let { method } = $props<{ method: 'cod' | 'qr' }>();
</script>

<div class="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-8 text-center">
	<div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
		<svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
		</svg>
	</div>

	<h2 class="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
	<p class="text-gray-600 mb-6">
		Thank you for your purchase. Your order has been received and is being processed.
	</p>

	<!-- Specific Notification -->
	<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left mb-8">
		<h3 class="font-semibold text-blue-900 mb-2 flex items-center">
			<svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
			What happens next?
		</h3>
		<ul class="text-sm text-blue-800 space-y-1 list-disc list-inside">
			<li>Our company will reach out to you shortly to confirm your order details.</li>
			{#if method === 'qr'}
				<li>Once your QR payment proof has been verified, an official invoice will be sent to your email.</li>
			{:else}
				<li>Please prepare the exact amount in cash for the courier upon delivery.</li>
				<li>An official invoice will be included with your delivered items.</li>
			{/if}
		</ul>
	</div>

	<a href="/" class="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
		Continue Shopping
	</a>
</div>
