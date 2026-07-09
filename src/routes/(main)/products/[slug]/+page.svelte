<script lang="ts">
	import MediaGallery from '$lib/components/pdp/MediaGallery.svelte';
	import Configurator from '$lib/components/pdp/Configurator.svelte';
	import type { Product } from '$lib/types/product';

	let { data } = $props();
	let product = $derived<Product>(data.product);

	// State: Maps option.id -> selected value.id
	let selectedOptionValueIds = $state<Record<string, string>>({});

	// Initialize with the first value of each option
	$effect(() => {
		if (product.variantOptions.length > 0 && Object.keys(selectedOptionValueIds).length === 0) {
			const defaults: Record<string, string> = {};
			product.variantOptions.forEach((opt) => {
				defaults[opt.id] = opt.values[0].id;
			});
			selectedOptionValueIds = defaults;
		}
	});

	// Find the exact variant that matches the current selection
	let selectedVariant = $derived.by(() => {
		const selectedIds = Object.values(selectedOptionValueIds);
		if (selectedIds.length !== product.variantOptions.length) return undefined;

		return product.variants.find((v) => selectedIds.every((id) => v.optionValueIds.includes(id)));
	});

	// Determine which images to show: Variant-specific images > Base product images
	let galleryImages = $derived.by(() => {
		if (selectedVariant?.images && selectedVariant.images.length > 0) {
			return selectedVariant.images;
		}
		return product.images;
	});

	function handleOptionSelect(optionId: string, valueId: string) {
		selectedOptionValueIds[optionId] = valueId;
	}
</script>

<div class="px-40 py-16">
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-24">
		<!-- Left: Media Gallery (Receives filtered images) -->
		<MediaGallery images={galleryImages} />

		<!-- Right: Configurator (Receives state and emits selection events) -->
		<Configurator
			{product}
			{selectedVariant}
			{selectedOptionValueIds}
			onOptionSelect={handleOptionSelect}
		/>
	</div>
</div>
