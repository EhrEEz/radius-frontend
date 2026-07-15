<!-- src/routes/checkout/+page.svelte -->
<script lang="ts">
	import CheckoutCart from './_components/CheckoutCart.svelte';
	import CheckoutShippingPayment from './_components/CheckoutShippingPayment.svelte';
	import CheckoutSuccess from './_components/CheckoutSuccess.svelte';

	// --- Mock Cart Data ---
	const mockCart = [
			{
				id: '1',
				slug: 'wireless-headphones',
				name: 'Wireless Headphones',
				variantLabel: 'Color: Matte Black',
				price: 1500,
				quantity: 1,
				image: 'https://placehold.co/100x100?text=Headphones'
			},
			{
				id: '2',
				slug: 'phone-case',
				name: 'Silicone Phone Case',
				variantLabel: 'Model: iPhone 15 Pro',
				price: 300,
				quantity: 2,
				image: 'https://placehold.co/100x100?text=Case'
			}
		];

	// --- Svelte 5 Runes State ---
	let currentStep = $state(1);

	let shipping = $state({
		fullName: '', phone: '', address: '', city: '', postalCode: '', notes: ''
	});

	let payment = $state({
		method: 'cod' as 'cod' | 'qr',
		proofFile: null as File | null,
		proofPreview: '' as string
	});

	let coupon = $state({
		code: '',
		applied: false,
		discountPercent: 0
	});

	// --- Derived State for Totals & Denominations ---
	let subtotal = $derived(mockCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
	let discountAmount = $derived(coupon.applied ? subtotal * (coupon.discountPercent / 100) : 0);
	let shippingFee = $derived(subtotal > 0 ? 50 : 0);
	let tax = $derived((subtotal - discountAmount) * 0.12); // Mock 12% VAT
	let total = $derived(subtotal - discountAmount + shippingFee + tax);

	function applyCoupon() {
		if (coupon.code.toLowerCase() === 'save10') {
			coupon.applied = true;
			coupon.discountPercent = 10;
		} else {
			alert('Invalid coupon code. Try "SAVE10"');
		}
	}

	function removeCoupon() {
		coupon.code = '';
		coupon.applied = false;
		coupon.discountPercent = 0;
	}

	function nextStep() {
		if (currentStep < 3) currentStep++;
	}

	function prevStep() {
		if (currentStep > 1) currentStep--;
	}

	function handleSubmit() {
		console.log('Final Order Payload:', { shipping, payment, total, coupon: coupon.code });
		nextStep(); // Go to success page
	}
</script>

<svelte:head>
	<title>Checkout</title>
</svelte:head>

<div class="py-16">
	<!-- Progress Indicator -->
	<div class="mb-8 flex items-center justify-center space-x-4 text-sm font-medium">
		<div class="flex items-center font-serif {currentStep >= 1 ? 'text-gray-950' : 'text-gray-400'}">
			<span class="w-6 h-6 rounded-full bg-current/15 flex items-center justify-center text-base mr-2 ">1</span>
			Cart Review
		</div>
		<div class="w-8 h-px bg-gray-300"></div>
		<div class="flex items-center font-serif {currentStep >= 2 ? 'text-gray-950' : 'text-gray-400'}">
			<span class="w-6 h-6 rounded-full bg-current/15 flex items-center justify-center text-base mr-2">2</span>
			Shipping & Payment
		</div>
		<div class="w-8 h-px bg-gray-300"></div>
		<div class="flex items-center font-serif {currentStep >= 3 ? 'text-gray-950' : 'text-gray-400'}">
			<span class="w-6 h-6 rounded-full bg-current/15 flex items-center justify-center text-base mr-2">3</span>
			Confirmation
		</div>
	</div>

	<!-- Step Content -->
	{#if currentStep === 1}
		<CheckoutCart
			cart={mockCart}
			{subtotal} {shippingFee} {tax} {discountAmount} {total}
			{coupon}
			onApplyCoupon={applyCoupon}
			onRemoveCoupon={removeCoupon}
			{nextStep}
		/>
	{:else if currentStep === 2}
		<CheckoutShippingPayment
			cart={mockCart}
			{shipping}
			{payment}
			{subtotal} {shippingFee} {tax} {discountAmount} {total}
			onSubmit={handleSubmit}
			{prevStep}
		/>
	{:else if currentStep === 3}
		<CheckoutSuccess method={payment.method} />
	{/if}
</div>
