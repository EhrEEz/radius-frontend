<!-- src/routes/checkout/_components/CheckoutShippingPayment.svelte -->
<script lang="ts">
	type SavedAddress = {
		id: string;
		fullName: string;
		phone: string;
		address: string;
		city: string;
		notes: string;
	};

	let {
		shipping, payment,cart,
		subtotal, shippingFee, tax, discountAmount, total,
		onSubmit, prevStep
	} = $props<{
		// eslint-disable-next-line
		cart: any[];
		// eslint-disable-next-line
		shipping: any;
		// eslint-disable-next-line
		payment: any;
		subtotal: number; shippingFee: number; tax: number; discountAmount: number; total: number;
		onSubmit: () => void;
		prevStep: () => void;
	}>();

	// State for saved addresses and selection
	let savedAddresses = $state<SavedAddress[]>([]);
	let selectedAddressId = $state<string>('');
	let useSavedAddress = $state<boolean>(false);
	let showSaveOption = $state<boolean>(true);
	let saveNewAddress = $state<boolean>(false);

	// Load saved addresses on mount
	$effect(() => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('savedAddresses');
			if (stored) {
				savedAddresses = JSON.parse(stored);
			}
		}
	});

	// When selecting a saved address, populate the shipping form
	function selectSavedAddress(address: SavedAddress) {
		shipping.fullName = address.fullName;
		shipping.phone = address.phone;
		shipping.address = address.address;
		shipping.city = address.city;
		shipping.notes = address.notes;
		selectedAddressId = address.id;
		useSavedAddress = true;
	}

	// Clear selection and reset form
	function useNewAddress() {
		useSavedAddress = false;
		selectedAddressId = '';
		shipping.fullName = '';
		shipping.phone = '';
		shipping.address = '';
		shipping.city = '';
		shipping.notes = '';
	}

	// Save current address to saved addresses
	function saveCurrentAddress() {
		if (!shipping.fullName || !shipping.phone || !shipping.address) {
			alert('Please fill in all required fields before saving.');
			return;
		}

		const newAddress: SavedAddress = {
			id: Date.now().toString(),
			fullName: shipping.fullName,
			phone: shipping.phone,
			address: shipping.address,
			city: shipping.city,
			notes: shipping.notes
		};

		savedAddresses.push(newAddress);
		
		if (typeof window !== 'undefined') {
			localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
		}

		showSaveOption = false;
		saveNewAddress = false;
	}

	// Delete a saved address
	function deleteAddress(id: string) {
		if (confirm('Are you sure you want to delete this saved address?')) {
			savedAddresses = savedAddresses.filter(addr => addr.id !== id);
			if (typeof window !== 'undefined') {
				localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
			}
			if (selectedAddressId === id) {
				useNewAddress();
			}
		}
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
		
		// Save address if user opted to save
		if (saveNewAddress && showSaveOption) {
			saveCurrentAddress();
		}
		
		onSubmit();
	}
</script>

<form onsubmit={handleSubmit} class="grid grid-cols-1 lg:grid-cols-3 gap-16">
	<!-- Left Column: Shipping Information -->
	<div class="lg:col-span-2">
		<div class="bg-white rounded-lg border border-gray-200 divide-y">
			{#each cart as item}
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
	<div class="shipping-information">
		<!-- Saved Addresses Section -->
		{#if savedAddresses.length > 0}
			<div class="mt-6 mb-6">
				<h2 class="text-lg font-semibold text-gray-900 mb-4 font-serif">Saved Addresses</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each savedAddresses as address}
						<div 
							class="relative p-4 border rounded-lg cursor-pointer transition-all {selectedAddressId === address.id ? 'border-primary bg-primary-50' : 'border-gray-200 hover:border-gray-300'}"
							onclick={() => selectSavedAddress(address)}
						>
							<div class="flex justify-between items-start">
								<div class="flex-1">
									<p class="font-medium text-gray-900">{address.fullName}</p>
									<p class="text-sm text-gray-600 mt-1">{address.address}</p>
									{#if address.city}
										<p class="text-sm text-gray-600">{address.city}</p>
									{/if}
									<p class="text-sm text-gray-600">{address.phone}</p>
								</div>
								<button 
									type="button"
									onclick={(e) => { e.stopPropagation(); deleteAddress(address.id); }}
									class="text-gray-400 hover:text-red-500 p-1"
									title="Delete address"
								>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
									</svg>
								</button>
							</div>
						</div>
					{/each}
				</div>
				<div class="mt-4">
					<button 
						type="button"
						onclick={useNewAddress}
						class="text-sm font-medium text-primary hover:text-primary-600"
					>
						+ Use a different address
					</button>
				</div>
			</div>
		{/if}

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

                                <!-- Save Address Option -->
                                {#if showSaveOption}
                                        <div class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                <label class="flex items-center cursor-pointer">
                                                        <input 
                                                                type="checkbox" 
                                                                bind:checked={saveNewAddress}
                                                                class="rounded border-gray-300 text-primary focus:ring-primary" 
                                                        />
                                                        <span class="ml-3 text-sm font-medium text-gray-700">Save this address for future orders</span>
                                                </label>
                                        </div>
                                {/if}
                        </div>
                </div>


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

			<div class="mt-6 space-y-3">
				<button type="button" onclick={prevStep} class="w-full px-6 py-3 border border-transparent font-medium rounded-full hover:bg-white hover:border-gray-200 transition text-gray-700 bg-gray-50 cursor-pointer">
					Back to Cart
				</button>
				<button type="submit" class="w-full px-6 py-3 bg-primary hover:bg-primary-400 text-white font-medium rounded-full hover:bg-primary-700 transition cursor-pointer">
					Place Order
				</button>

			</div>
		</div>



	</div>
</form>
