<!-- src/routes/checkout/_components/CheckoutShippingPayment.svelte -->
<script lang="ts">
	let {
		shipping, payment,
		subtotal, shippingFee, tax, discountAmount, total,
		onSubmit, prevStep
	} = $props<{
		// eslint-disable-next-line
		shipping: any;
		// eslint-disable-next-line
		payment: any;
		subtotal: number; shippingFee: number; tax: number; discountAmount: number; total: number;
		onSubmit: () => void;
		prevStep: () => void;
	}>();

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
</script>

<form onsubmit={handleSubmit} class="grid grid-cols-1 lg:grid-cols-3 gap-16">
	<!-- Left Column: Shipping Information -->
	<div class="left-side lg:col-span-2">
		<!-- Order Summary & Submit -->
		<h2 class="text-lg font-semibold text-gray-900 mb-4 font-serif">Shipping Information</h2>
		<div class="grid gap-4">
					<div class="relative">
						<input
							type="text"
							id="fullName"
							name="fullName"
							bind:value={shipping.fullName}
							placeholder=" "
							required
							class="peer block rounded-lg w-full bg-white border-gray-200 focus-border-b-2 focus-within:border-gray-500 focus-within: focus-within:ring-amber-300 sm:text-sm px-3.5 pb-2 pt-6 border"
						/>
						<label
							for="fullName"
							class="absolute left-4 top-1/2 -translate-y-1/2 peer-focus:translate-y-0 peer-not-placeholder-shown:translate-y-0 text-sm text-gray-500 transition-all duration-200 pointer-events-none
								   peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white
								   peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700 peer-not-placeholder-shown:bg-white"
						>
							Full Name *
						</label>
					</div>

					<div class="relative">
						<input
							type="tel"
							id="phone"
							name="phone"
							bind:value={shipping.phone}
							placeholder=" "
							required
							class="peer block rounded-lg w-full bg-white border-gray-200 focus-border-b-2 focus-within:border-gray-500 focus-within:ring-amber-300 sm:text-sm px-3.5 pb-2 pt-6 border"
						/>
						<label
							for="phone"
							class="absolute left-4 peer-not-placeholder-show:left-3 top-1/2 -translate-y-1/2 peer-focus:translate-y-0 peer-not-placeholder-shown:translate-y-0 text-sm text-gray-500 transition-all duration-200 pointer-events-none
								   peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white
								   peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700 peer-not-placeholder-shown:bg-white"
						>
							Phone Number *
						</label>
					</div>

				<div class="relative">
					<input
						type="text"
						id="address"
						name="address"
						bind:value={shipping.address}
						placeholder=" "
						required
						class="peer block rounded-lg w-full bg-white border-gray-200 focus-border-b-2 focus-within:border-gray-500 focus-within: focus-within:ring-amber-300 sm:text-sm px-3.5 pb-2 pt-6 border"
					/>
					<label
						for="address"
						class="absolute left-4 peer-not-placeholder-show:left-3 top-1/2 -translate-y-1/2 peer-focus:translate-y-0 peer-not-placeholder-shown:translate-y-0 text-sm text-gray-500 transition-all duration-200 pointer-events-none
							   peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white
							   peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700 peer-not-placeholder-shown:bg-white"
					>
						Address *
					</label>
				</div>

					<div class="relative">
						<input
							type="text"
							id="city"
							name="city"
							bind:value={shipping.city}
							placeholder=" "
							class="peer block rounded-lg w-full bg-white border-gray-200 focus-border-b-2 focus-within:border-gray-500 focus-within: focus-within:ring-amber-300 sm:text-sm px-3.5 pb-2 pt-6 border"
						/>
						<label
							for="city"
							class="absolute left-4 peer-not-placeholder-show:left-3 top-1/2 -translate-y-1/2 peer-focus:translate-y-0 peer-not-placeholder-shown:translate-y-0 text-sm text-gray-500 transition-all duration-200 pointer-events-none
								   peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white
								   peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700 peer-not-placeholder-shown:bg-white"
						>
							City / Municipality
						</label>
					</div>


				<div class="relative">
					<textarea
						id="notes"
						name="notes"
						bind:value={shipping.notes}
						rows="3"
						placeholder=" "
						class="peer block rounded-lg w-full bg-white border-gray-200 focus-border-b-2 focus-within:border-gray-500 focus-within: focus-within:ring-amber-300 sm:text-sm px-3.5 pb-2 pt-6 border resize-none"
					></textarea>
					<label
						for="notes"
						class="absolute left-4 peer-not-placeholder-show:left-3 top-1/2 -translate-y-1/2 peer-focus:translate-y-0 peer-not-placeholder-shown:translate-y-0 text-sm text-gray-500 transition-all duration-200 pointer-events-none
							   peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white
							   peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700 peer-not-placeholder-shown:bg-white"
					>
						Order Notes (Optional)
					</label>
				</div>
		</div>
			</div>



	<!-- Right Column: Payment & Totals -->
	<div class="space-y-8">
		<!-- Payment Options -->
		<div class="">
			<h3 class="font-semibold text-gray-900 mb-4 font-serif text-lg">Payment Method</h3>
			<div class="space-x-3 flex">
				<label class="flex grow items-center py-4 px-3.5 border rounded-xl cursor-pointer hover:bg-gray-50 transition bg-white {payment.method === 'cod' ? 'border-primary bg-primary-50' : 'border-gray-200'}">
					<input type="radio" name="paymentMethod" value="cod" bind:group={payment.method} class="appearance-none text-primary border-gray-300 bg-white focus:ring-primary" />
					<span class={["ml-3 text-sm font-medium", payment.method === 'cod' ? 'text-primary' : 'text-gray-700']}>Cash on Delivery (COD)</span>
				</label>
				<label class="flex grow items-center py-4 px-3.5 border rounded-xl cursor-pointer hover:bg-gray-50 transition bg-white {payment.method === 'qr' ? 'border-primary bg-primary-50' : 'border-gray-200'}">
					<input type="radio" name="paymentMethod" value="qr" bind:group={payment.method} class="appearance-none text-primary border-gray-300 bg-white focus:ring-primary" />
					<span class={["ml-3 text-sm font-medium", payment.method === 'qr' ? 'text-primary' : 'text-gray-700']}>QR Code / Bank Transfer</span>
				</label>
			</div>

			{#if payment.method === 'qr'}
				<div class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
					<img src="https://placehold.co/150x150?text=QR+CODE" alt="Payment QR" class="mx-auto rounded" />
					<div>
						<label for="proof-upload" class="block text-xs font-medium text-gray-700 mb-1">Upload Proof of Payment *</label>
						<input type="file" id="proof-upload" name="paymentProof" accept="image/*" onchange={handleFileChange}
							class="block w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
						{#if payment.proofPreview}
							<img src={payment.proofPreview} alt="Proof" class="mt-2 max-h-24 rounded border border-gray-200" />
						{/if}
					</div>
				</div>
			{/if}
		</div>
		<div class="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
			<h3 class="font-semibold text-gray-900 mb-4 font-serif text-lg">Order Summary</h3>
			<div class="space-y-2 text-sm">
				<div class="flex justify-between text-gray-600"><span>Subtotal</span><span>₱{subtotal.toLocaleString()}</span></div>
				{#if discountAmount > 0}
					<div class="flex justify-between text-green-600"><span>Discount</span><span>-₱{discountAmount.toLocaleString()}</span></div>
				{/if}
				<div class="flex justify-between text-gray-600"><span>Shipping</span><span>₱{shippingFee.toLocaleString()}</span></div>
				<div class="flex justify-between text-gray-600"><span>Tax</span><span>₱{tax.toLocaleString()}</span></div>
				<div class="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t mt-3">
					<span>Total</span><span>₱{total.toLocaleString()}</span>
				</div>
			</div>

			<div class="mt-6 flex space-x-3">
				<button type="button" onclick={prevStep} class="px-6 py-3 border border-transparent font-medium rounded-full hover:bg-primary-700 transition text-gray-700 bg-gray-100">
					Back to Cart
				</button>
				<button type="submit" class="grow px-6 py-3 bg-primary hover:bg-primary-400 text-white font-medium rounded-full hover:bg-primary-700 transition">
					Place Order
				</button>

			</div>
		</div>



	</div>
</form>
