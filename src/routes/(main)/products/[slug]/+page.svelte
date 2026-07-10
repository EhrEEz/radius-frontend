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

	// Determine which images to show in the main gallery: Variant-specific images > Base product images
	let galleryImages = $derived.by(() => {
		if (selectedVariant?.images && selectedVariant.images.length > 0) {
			return selectedVariant.images;
		}
		return product.images;
	});

	// Combine base images and ALL variant images for the lightbox, avoiding duplicates by URL
	let allImages = $derived.by(() => {
			// We use 'any[]' here because we are dynamically adding a 'variantName' property
			const combined: any[] = [];
			const seenUrls = new Set<string>();

			// 1. Add base product images (Categorized as "General" or "Base")
			product.images.forEach((img) => {
				if (!seenUrls.has(img.url)) {
					combined.push({ ...img, variantName: 'General' });
					seenUrls.add(img.url);
				}
			});

			// 2. Add variant images
			product.variants.forEach((variant) => {
				// ⚠️ UPDATE THIS: Use the actual property that identifies your variant
				// (e.g., variant.name, variant.color, variant.sku, etc.)
				const variantLabel = variant.name || `Variant ${variant.id}`;

				if (variant.images) {
					variant.images.forEach((img) => {
						if (!seenUrls.has(img.url)) {
							combined.push({ ...img, variantName: variantLabel });
							seenUrls.add(img.url);
						}
					});
				}
			});

			return combined;
		});

	function handleOptionSelect(optionId: string, valueId: string) {
		selectedOptionValueIds[optionId] = valueId;
	}
</script>

<div class="py-16">
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8">
		<!-- Left: Media Gallery (Receives filtered images and all images for lightbox) -->
		<MediaGallery images={galleryImages} {allImages} />

		<!-- Right: Configurator (Receives state and emits selection events) -->
		<Configurator
			{product}
			{selectedVariant}
			{selectedOptionValueIds}
			onOptionSelect={handleOptionSelect}
		/>
	</div>
</div>
