<!-- src/lib/components/pdp/Configurator.svelte -->
<script lang="ts">
	import { Accordion, AccordionBody, AccordionButton } from '$lib/components/ui/Accordion';
	import { cart } from '$lib/components/cart/cart.svelte';
	import type { Product, ProductVariant, Price } from '$lib/types/product';
	import { ShoppingCart, Truck, Package, Calendar, MapPin, Tag, Percent, Pen } from '@lucide/svelte';
	import DOMPurify from 'dompurify';

	let {
		product,
		selectedVariant,
		selectedOptionValueIds,
		onOptionSelect
	}: {
		product: Product;
		selectedVariant: ProductVariant | undefined;
		selectedOptionValueIds: Record<string, string>;
		onOptionSelect: (optionId: string, valueId: string) => void;
	} = $props();

	// Helper to get the actual selected value objects for labels/attributes
	let selectedOptionValues = $derived.by(() => {
		return product.variantOptions
			.map((opt) => opt.values.find((v) => v.id === selectedOptionValueIds[opt.id]))
			.filter((v): v is NonNullable<typeof v> => !!v);
	});

	// eslint-disable-next-line
	let cleanDescription = $state<string>('');

	// Price formatting helper
	function formatCurrency(price: Price): { current: string; original: string | null } {
		const amount = price.amount;
		const discounted = price.discountedAmount;
		const format = (val: number) => {
			const symbol = price.currency === 'USD' ? '$' : `${price.currency} `;
			return `${symbol}${val.toFixed(2)}`;
		};
		return {
			current: format(discounted ?? amount),
			original: discounted != null ? format(amount) : null
		};
	}

	let displayPrice = $derived.by(() => {
		const priceObj = selectedVariant?.price ?? product.price;
		return formatCurrency(priceObj);
	});

	// Calculate discount percentage
	let discountPercentage = $derived.by(() => {
		const priceObj = selectedVariant?.price ?? product.price;
		if (priceObj.discountedAmount && priceObj.discountedAmount < priceObj.amount) {
			const discount = priceObj.amount - priceObj.discountedAmount;
			const percentage = Math.round((discount / priceObj.amount) * 100);
			return percentage;
		}
		return null;
	});

	// Sale end date
	let saleEndDate = $derived(product.saleEndDate ? new Date(product.saleEndDate) : null);

	let isInStock = $derived(selectedVariant ? selectedVariant.stock > 0 : false);
	let quantity = $state(1);

	// Shipping info
	let shippingInfo = $derived({
		estimatedDelivery: 'Jul 21-31',
		returnWindow: 30,
		shippingCost: 13.98,
		shipsFrom: 'United States',
		deliverTo: 'Nepal'
	});

	// Highlights
	let highlights = $derived.by(() => {
		const items: Record<string, string> = {};

		if (product.brand) items['Brand'] = product.brand;
		if (selectedVariant?.sku || product.sku) items['SKU'] = selectedVariant?.sku || product.sku || '';
		if (product.category) items['Category'] = product.category;

		if (product.highlights) {
			Object.entries(product.highlights).forEach(([key, value]) => {
				items[key] = String(value);
			});
		}

		return items;
	});

	function isOptionValueAvailable(optionId: string, valueId: string): boolean {
		const hypotheticalSelection = { ...selectedOptionValueIds, [optionId]: valueId };
		const selectedIds = Object.values(hypotheticalSelection);

		return product.variants.some(
			(v) => selectedIds.every((id) => v.optionValueIds.includes(id)) && v.stock > 0
		);
	}

	function handleAddToCart() {
		if (!selectedVariant || !isInStock) return;

		const attributes: Record<string, string> = {};
		selectedOptionValues.forEach((val) => {
			const option = product.variantOptions.find((o) => o.values.some((v) => v.id === val.id));
			if (option) attributes[option.name] = val.label;
		});

		cart.addItem({
			id: selectedVariant.id,
			productId: product.id,
			slug: product.slug,
			name: product.title,
			variantLabel: selectedOptionValues.map((v) => v.label).join(' / '),
			attributes,
			price:
				selectedVariant.price?.discountedAmount ??
				selectedVariant.price?.amount ??
				product.price.amount,
			quantity,
			image: selectedVariant.images?.[0]?.url ?? product.images[0]?.url
		});
	}

	$effect(() => {
		cleanDescription = DOMPurify.sanitize(product.description);
	});
</script>

<div class="flex flex-col gap-6 sticky top-24">
	<!-- Title & Price -->
	<div>
		{#if discountPercentage || saleEndDate}
			<div class="flex items-center gap-2 text-sm mb-2">
				{#if discountPercentage}
					<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-orange-100 text-purple-950 font-medium">
						<Tag class="w-4 h-4" />
						Sale
					</span>
				{/if}
				{#if saleEndDate}
					<span class="text-neutral-600">
						Ends {saleEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
					</span>
				{/if}
			</div>
		{/if}
		<h1 class="text-3xl font-bold text-neutral-900">{product.title}</h1>

		<!-- Enhanced Price Section with Sale Info -->
		<div class="mt-2 flex flex-col gap-2">
			<div class="flex items-baseline gap-3">
				<span class="text-3xl font-bold text-neutral-900">{displayPrice.current}</span>
				{#if displayPrice.original}
					<span class="text-xl text-neutral-500 line-through">{displayPrice.original}</span>
					{#if discountPercentage}
						<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
							<Percent class="w-4 h-4" />
							Save {discountPercentage}%
						</span>
					{/if}
				{/if}
			</div>

			<!-- Sale Badge/Info -->

		</div>
	</div>

	<!-- Variant Options (Swatches) -->
	<div class="flex flex-col gap-6">
		{#each product.variantOptions as option}
			{@const selectedValue = option.values.find((v) => v.id === selectedOptionValueIds[option.id])}
			<div>
				<div class="flex items-center justify-between mb-3">
					<span class="text-sm font-medium text-neutral-900">{option.name}</span>
					<span class="text-sm text-neutral-500">{selectedValue?.label}</span>
				</div>
				<div class="flex flex-wrap gap-3">
					{#each option.values as value}
						{@const isSelected = selectedOptionValueIds[option.id] === value.id}
						{@const isAvailable = isOptionValueAvailable(option.id, value.id)}

						<button
							onclick={() => onOptionSelect(option.id, value.id)}
							disabled={!isAvailable}
							class="relative flex items-center justify-center rounded-md overflow-hidden transition-all
                {isSelected
								? 'ring-2 ring-neutral-900 ring-offset-2'
								: 'ring-1 ring-neutral-200 hover:ring-neutral-400'}
                {!isAvailable && 'cursor-not-allowed opacity-50'}"
							aria-label={`Select ${option.name}: ${value.label}`}
							title={value.label}
						>
							{#if value.hexColor}
								<div class="w-8 h-8" style="background-color: {value.hexColor}"></div>
							{:else if value.thumbnailUrl}
								<img src={value.thumbnailUrl} alt={value.label} class="w-8 h-8 object-cover" />
							{:else}
								<span
									class="px-3 py-1.5 text-sm font-medium {isSelected
										? 'bg-neutral-900 text-white'
										: 'bg-white text-neutral-900'}"
								>
									{value.label}
								</span>
							{/if}

							{#if !isAvailable}
								<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
									<div class="w-[150%] h-px bg-neutral-500 rotate-45"></div>
								</div>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- Quantity & Add to Cart -->
	<div class="flex flex-col gap-4 pt-6 border-t">
		<div class="flex items-center gap-4">
			<span class="text-sm font-medium text-neutral-900">Quantity</span>
			<div class="flex items-center rounded-md border border-neutral-200 bg-white">
				<button
					onclick={() => (quantity = Math.max(1, quantity - 1))}
					class="px-3 py-1.5 text-neutral-600 hover:bg-neutral-50 transition-colors"
					aria-label="Decrease quantity">−</button
				>
				<span class="min-w-10 px-2 text-center text-sm tabular-nums">{quantity}</span>
				<button
					onclick={() => (quantity = Math.min(selectedVariant?.stock ?? 99, quantity + 1))}
					class="px-3 py-1.5 text-neutral-600 hover:bg-neutral-50 transition-colors"
					aria-label="Increase quantity">+</button
				>
			</div>
			{#if selectedVariant && selectedVariant.stock < 10 && selectedVariant.stock > 0}
				<span class="text-sm text-orange-600 font-medium">Only {selectedVariant.stock} left!</span>
			{/if}
		</div>
		<div class="grid grid-cols-2 gap-4">
			<button
				onclick={handleAddToCart}
				disabled={!selectedVariant || !isInStock}
				class="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:bg-neutral-500 flex gap-3.5 items-center justify-center cursor-pointer border border-gray-200 hover:border-gray-400 hover:text-black"
			>
				<ShoppingCart class="w-4 h-4" stroke-width="3" />
				{!selectedVariant ? 'Select Options' : !isInStock ? 'Out of Stock' : 'Add to Cart'}
			</button>
			<button
				onclick={handleAddToCart}
				disabled={!selectedVariant || !isInStock}
				class="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300 flex gap-3.5 items-center justify-center cursor-pointer"
			>
				{!selectedVariant ? 'Select Options' : !isInStock ? 'Out of Stock' : 'Buy Now'}
			</button>
		</div>
	</div>

	<!-- Accordion Section -->
	<div class="flex flex-col gap-6 sticky top-24 self-start items-stretch w-full">
		<!-- ... [Keep Title, Price, Variant Options, Quantity & Add to Cart sections exactly as they were] ... -->

		<!-- Accordion Section -->
		<div class="flex flex-col gap-3 pt-6 border-t ">

			<!-- Description Accordion (Open by default) -->
			<Accordion initiallyOpen={true}>
				<AccordionButton>Item Description</AccordionButton>
				<AccordionBody>
					<div class="prose prose-sm max-w-none text-neutral-700">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html cleanDescription}
					</div>
				</AccordionBody>
			</Accordion>

			<!-- Highlights Accordion -->
			{#if Object.keys(highlights).length > 0}
				<Accordion initiallyOpen={true}>
					<AccordionButton>Highlights</AccordionButton>
					<AccordionBody>
						<dl class="space-y-2">
							{#each Object.entries(highlights) as [key, value]}
								<div class="flex justify-between py-1.5 border-b border-neutral-200 last:border-0">
									<dt class="text-sm text-neutral-600">{key}</dt>
									<dd class="text-sm font-medium text-neutral-900">{value}</dd>
								</div>
							{/each}
						</dl>
					</AccordionBody>
				</Accordion>
			{/if}

			<!-- Shipping & Returns Accordion -->
			<Accordion initiallyOpen={true}>
				<AccordionButton>Shipping and return policies</AccordionButton>
				<AccordionBody>
					<div class="space-y-3">
						<!-- Delivery Estimate -->
						<div class="flex items-start gap-3">
							<Calendar class="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
							<div>
								<p class="text-sm text-neutral-900">
									<span class="font-medium">Order today to get by</span>
									<span class="border-b border-dotted border-neutral-400">{shippingInfo.estimatedDelivery}</span>
								</p>
							</div>
						</div>

						<!-- Returns -->
						<div class="flex items-start gap-3">
							<Package class="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
							<div>
								<p class="text-sm text-neutral-900">
									<span class="border-b border-dotted border-neutral-400">Returns & exchanges accepted within {shippingInfo.returnWindow} days</span>
								</p>
							</div>
						</div>

						<!-- Shipping Cost -->
						<div class="flex items-start gap-3">
							<Truck class="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
							<div>
								<p class="text-sm text-neutral-900">
									<span class="font-medium">Cost to ship:</span>
									<span class="border-b border-dotted border-neutral-400">Rs. {shippingInfo.shippingCost.toFixed(2)}</span>
								</p>
							</div>
						</div>

						<!-- Ships From -->
						<div class="flex items-start gap-3">
							<MapPin class="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
							<div>
								<p class="text-sm text-neutral-900">
									<span class="font-medium">Ships from:</span>
									<span class="border-b border-dotted border-neutral-400">{shippingInfo.shipsFrom}</span>
								</p>
							</div>
						</div>

						<!-- Deliver To (with edit) -->
						<div class="flex items-start gap-3 pt-2">
							<div class="flex items-center gap-2">
								<span class="text-sm text-neutral-900">Deliver to {shippingInfo.deliverTo}</span>
								<button class="p-1 hover:bg-neutral-200 rounded transition-colors" aria-label="Edit delivery location">
									<Pen class="w-3.5 h-3.5 text-neutral-600" />
								</button>
							</div>
						</div>
					</div>
				</AccordionBody>
			</Accordion>

		</div>
</div>
</div>
