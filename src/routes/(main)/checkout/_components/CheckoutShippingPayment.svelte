<!-- src/routes/checkout/_components/CheckoutShippingPayment.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/Button';
	import { cart } from '$lib/components/cart/cart.svelte';
	import { Plus } from '@lucide/svelte';
	let {
		shipping,
		payment,

		subtotal,
		shippingFee,
		tax,
		discountAmount,
		total,
		onSubmit,
		prevStep
	} = $props<{
		// eslint-disable-next-line
		shipping: any;
		// eslint-disable-next-line
		payment: any;
		subtotal: number;
		shippingFee: number;
		tax: number;
		discountAmount: number;
		total: number;
		onSubmit: () => void;
		prevStep: () => void;
	}>();

	// Mock data for previously used shipping information
	const savedAddresses = [
		{
			id: '1',
			label: 'Home',
			fullName: 'Juan Dela Cruz',
			phone: '0917 123 4567',
			address: '123 Sampaguita St., Barangay San Isidro',
			city: 'Quezon City',
			notes: 'Please leave at the front gate.'
		},
		{
			id: '2',
			label: 'Office',
			fullName: 'Juan Dela Cruz',
			phone: '0918 987 6543',
			address: 'Unit 4B, Tech Tower, Ayala Avenue',
			city: 'Makati City',
			notes: 'Call upon arrival. Receiving hours: 9AM - 5PM.'
		}
	];

	function applySavedAddress(addr: (typeof savedAddresses)[0]) {
		shipping.fullName = addr.fullName;
		shipping.phone = addr.phone;
		shipping.address = addr.address;
		shipping.city = addr.city;
		shipping.notes = addr.notes;
	}

	function clearShippingForm() {
		shipping.fullName = '';
		shipping.phone = '';
		shipping.address = '';
		shipping.city = '';
		shipping.notes = '';
	}

	function handleFileChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			payment.proofFile = file;
			payment.proofPreview = URL.createObjectURL(file);
		}
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!shipping.fullName || !shipping.phone || !shipping.address) {
			alert('Please fill in all required shipping fields.');
			return;
		}
		if (payment.method === 'qr' && !payment.proofFile) {
			alert('Please upload a screenshot of your QR payment.');
			return;
		}
		onSubmit();
	}

	// Helper to check if current form matches a saved address
	function isActiveAddress(addr: (typeof savedAddresses)[0]) {
		return shipping.address === addr.address && shipping.city === addr.city;
	}
</script>

<form onsubmit={handleSubmit} class="grid grid-cols-1 lg:grid-cols-3 gap-16">
	<!-- Left Column: Cart & Shipping Information -->
	<div class="lg:col-span-2 space-y-8">
		<!-- Cart Items Summary -->
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
							<div class="flex items-center rounded-md border bg-neutral-50 px-3 py-1">
								<span class="text-sm text-neutral-600">Qty:</span>
								<span class="ml-1 text-sm font-medium tabular-nums text-neutral-900">
									{item.quantity}
								</span>
							</div>

							<div class="flex items-center gap-3 text-xs">
								<button
									onclick={cart.open}
									class="font-medium text-neutral-700 hover:text-neutral-900 hover:underline"
								>
									Edit in Cart
								</button>
							</div>
						</div>
					</div>
				</li>
			{/each}
		</div>

		<!-- Shipping Information Section (Grid 5 Columns) -->
		<div class="shipping-information">
			<h2 class="text-lg font-semibold text-gray-900 mb-6 font-serif">Shipping Information</h2>

			<div class="grid grid-cols-5 gap-6">
				<!-- Span 2: Previously Used Addresses -->
				<div class="col-span-5 lg:col-span-2 space-y-3">
					<h3 class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
						Saved Addresses
					</h3>

					{#each savedAddresses as addr}
						<button
							type="button"
							onclick={() => applySavedAddress(addr)}
							class="w-full text-left p-4 rounded-lg border transition-all group relative {isActiveAddress(
								addr
							)
								? 'border-primary bg-primary-50/50 ring-1 ring-primary'
								: 'border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50'}"
						>
							<div class="flex items-center justify-between mb-2">
								<span
									class="text-xs font-bold uppercase tracking-wider {isActiveAddress(addr)
										? 'text-primary'
										: 'text-gray-500 group-hover:text-primary'}"
								>
									{addr.label}
								</span>
								{#if isActiveAddress(addr)}
									<span
										class="text-[10px] font-bold text-primary bg-primary-100 px-2 py-0.5 rounded-full"
									>
										ACTIVE
									</span>
								{/if}
							</div>
							<p class="text-sm font-semibold text-gray-900">{addr.fullName}</p>
							<p class="text-sm text-gray-600 mt-1">{addr.address}</p>
							<p class="text-sm text-gray-600">{addr.city}</p>
							<p class="text-xs text-gray-500 mt-2 flex items-center gap-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path
										d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
									/></svg
								>
								{addr.phone}
							</p>
						</button>
					{/each}

					<button
						type="button"
						onclick={clearShippingForm}
						class="w-full text-left p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-medium transition-colors flex items-center justify-center gap-2"
					>
						<Plus class="w-4 h-4" />

						Clear / Use New Address
					</button>
				</div>

				<!-- Span 3: Current Form -->
				<div class="col-span-5 lg:col-span-3">
					<div class="grid gap-4">
						<!-- Full Name -->
						<div class="relative">
							<input
								type="text"
								id="fullName"
								name="fullName"
								bind:value={shipping.fullName}
								placeholder=" "
								required
								class="peer block rounded-lg w-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm px-3.5 pb-2 pt-6 transition-colors"
							/>
							<label
								for="fullName"
								class="absolute left-3.5 top-1/2 -translate-y-1/2 peer-focus:translate-y-0 peer-focus:-translate-x-1 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:-translate-x-1 text-sm text-gray-500 transition-all duration-200 pointer-events-none
										   peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white peer-focus:px-1
										   peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1"
							>
								Full Name *
							</label>
						</div>

						<!-- Phone -->
						<div class="relative">
							<input
								type="tel"
								id="phone"
								name="phone"
								bind:value={shipping.phone}
								placeholder=" "
								required
								class="peer block rounded-lg w-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm px-3.5 pb-2 pt-6 transition-colors"
							/>
							<label
								for="phone"
								class="absolute left-3.5 top-1/2 -translate-y-1/2 peer-focus:translate-y-0 peer-focus:-translate-x-1 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:-translate-x-1 text-sm text-gray-500 transition-all duration-200 pointer-events-none
										   peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white peer-focus:px-1
										   peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1"
							>
								Phone Number *
							</label>
						</div>

						<!-- Address -->
						<div class="relative">
							<input
								type="text"
								id="address"
								name="address"
								bind:value={shipping.address}
								placeholder=" "
								required
								class="peer block rounded-lg w-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm px-3.5 pb-2 pt-6 transition-colors"
							/>
							<label
								for="address"
								class="absolute left-3.5 top-1/2 -translate-y-1/2 peer-focus:translate-y-0 peer-focus:-translate-x-1 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:-translate-x-1 text-sm text-gray-500 transition-all duration-200 pointer-events-none
									   peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white peer-focus:px-1
									   peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1"
							>
								Address *
							</label>
						</div>

						<!-- City -->
						<div class="relative">
							<input
								type="text"
								id="city"
								name="city"
								bind:value={shipping.city}
								placeholder=" "
								class="peer block rounded-lg w-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm px-3.5 pb-2 pt-6 transition-colors"
							/>
							<label
								for="city"
								class="absolute left-3.5 top-1/2 -translate-y-1/2 peer-focus:translate-y-0 peer-focus:-translate-x-1 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:-translate-x-1 text-sm text-gray-500 transition-all duration-200 pointer-events-none
										   peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white peer-focus:px-1
										   peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1"
							>
								City / Municipality
							</label>
						</div>

						<!-- Notes -->
						<div class="relative">
							<textarea
								id="notes"
								name="notes"
								bind:value={shipping.notes}
								rows="3"
								placeholder=" "
								class="peer block rounded-lg w-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm px-3.5 pb-2 pt-6 transition-colors resize-none"
							></textarea>
							<label
								for="notes"
								class="absolute left-3.5 top-1/2 -translate-y-1/2 peer-focus:translate-y-0 peer-focus:-translate-x-1 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:-translate-x-1 text-sm text-gray-500 transition-all duration-200 pointer-events-none
									   peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white peer-focus:px-1
									   peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1"
							>
								Order Notes (Optional)
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Right Column: Payment & Totals -->
	<div class="space-y-8">
		<!-- Payment Options -->
		<div>
			<h3 class="font-semibold text-gray-900 mb-4 font-serif text-lg">Payment Method</h3>
			<div class="space-x-3 flex">
				<label
					class="flex grow items-center py-4 px-3.5 border rounded-lg cursor-pointer hover:bg-gray-50 transition bg-white {payment.method ===
					'cod'
						? 'border-primary bg-primary-50'
						: 'border-gray-200'}"
				>
					<input
						type="radio"
						name="paymentMethod"
						value="cod"
						bind:group={payment.method}
						class="appearance-none text-primary border-gray-300 bg-white focus:ring-primary"
					/>
					<span
						class={[
							'ml-3 text-sm font-semibold',
							payment.method === 'cod' ? 'text-primary' : 'text-gray-700'
						]}>Cash on Delivery (COD)</span
					>
				</label>
				<label
					class="flex grow items-center py-4 px-3.5 border rounded-lg cursor-pointer hover:bg-gray-50 transition bg-white {payment.method ===
					'qr'
						? 'border-primary bg-primary-50'
						: 'border-gray-200'}"
				>
					<input
						type="radio"
						name="paymentMethod"
						value="qr"
						bind:group={payment.method}
						class="appearance-none text-primary border-gray-300 bg-white focus:ring-primary"
					/>
					<span
						class={[
							'ml-3 text-sm font-medium',
							payment.method === 'qr' ? 'text-primary' : 'text-gray-700'
						]}>QR Code / Bank Transfer</span
					>
				</label>
			</div>

			{#if payment.method === 'qr'}
				<div class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
					<img
						src="https://placehold.co/150x150?text=QR+CODE"
						alt="Payment QR"
						class="mx-auto rounded"
					/>
					<div>
						<label for="proof-upload" class="block text-xs font-medium text-gray-700 mb-1"
							>Upload Proof of Payment *</label
						>
						<input
							type="file"
							id="proof-upload"
							name="paymentProof"
							accept="image/*"
							onchange={handleFileChange}
							class="block w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
						/>
						{#if payment.proofPreview}
							<img
								src={payment.proofPreview}
								alt="Proof"
								class="mt-2 max-h-24 rounded border border-gray-200"
							/>
						{/if}
					</div>
				</div>
			{/if}
		</div>

		<!-- Order Summary -->
		<div class="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
			<h3 class="font-semibold text-gray-900 mb-4 font-serif text-lg">Order Summary</h3>
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
					<span>Shipping</span><span>₱{shippingFee.toLocaleString()}</span>
				</div>
				<div class="flex justify-between text-gray-600">
					<span>Tax</span><span>₱{tax.toLocaleString()}</span>
				</div>
				<div class="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t mt-3">
					<span>Total</span><span>₱{total.toLocaleString()}</span>
				</div>
			</div>
			<div class="mt-6 space-y-3">
				<Button variant="outline" size="full" type="button" onclick={prevStep}>Back to Cart</Button>
				<Button size="full" type="submit">Place Order</Button>
			</div>
		</div>
	</div>
</form>
