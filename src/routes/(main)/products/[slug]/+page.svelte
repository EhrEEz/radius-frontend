<!-- src/routes/product/[slug]/+page.svelte -->
<script lang="ts">
	import { error } from '@sveltejs/kit';
	import MediaGallery from '$lib/components/pdp/MediaGallery.svelte';
	import Configurator from '$lib/components/pdp/Configurator.svelte';
	import RelatedSearches from '$lib/components/pdp/RelatedSearches.svelte';
	import FrequentlyBoughtTogether from '$lib/components/pdp/FrequentlyBoughtTogether.svelte';
	import RelatedProducts from '$lib/components/pdp/RelatedProducts.svelte';
	import SimilarKeywords from '$lib/components/pdp/SimilarKeywords.svelte';
	// ⬇️ Import ProductCard here
	import type { Product, ProductCard } from '$lib/types/product';
	import { SvelteSet } from 'svelte/reactivity';

	let { data } = $props();

	if (!data?.product) {
		error(404, 'Product not found');
	}

	let product = $derived<Product>(data.product);

	let selectedOptionValueIds = $state<Record<string, string>>({});

	$effect(() => {
		if (product.variantOptions.length > 0 && Object.keys(selectedOptionValueIds).length === 0) {
			const defaults: Record<string, string> = {};
			product.variantOptions.forEach((opt) => {
				defaults[opt.id] = opt.values[0].id;
			});
			selectedOptionValueIds = defaults;
		}
	});

	let selectedVariant = $derived.by(() => {
		const selectedIds = Object.values(selectedOptionValueIds);
		if (selectedIds.length !== product.variantOptions.length) return undefined;
		return product.variants.find((v) => selectedIds.every((id) => v.optionValueIds.includes(id)));
	});

	let galleryImages = $derived.by(() => {
		if (selectedVariant?.images && selectedVariant.images.length > 0) {
			return selectedVariant.images;
		}
		return product.images;
	});

	let allImages = $derived.by(() => {
		const combined: any[] = [];
		const seenUrls = new SvelteSet<string>();

		product.images.forEach((img) => {
			if (!seenUrls.has(img.url)) {
				combined.push({ ...img, variantName: 'General' });
				seenUrls.add(img.url);
			}
		});

		product.variants.forEach((variant) => {
			const variantLabel = variant.sku || `Variant ${variant.id}`;
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

	let relatedSearches = $derived([
		{ title: 'Photo Jewelry Dish', imageUrl: '/images/related/photo-jewelry-dish.jpg', href: '/search?q=photo+jewelry+dish' },
		{ title: 'Ring Holder Dish', imageUrl: '/images/related/ring-holder-dish.jpg', href: '/search?q=ring+holder+dish' },
		{ title: 'Wedding Photo Gift', imageUrl: '/images/related/wedding-photo-gift.jpg', href: '/search?q=wedding+photo+gift' },
		{ title: 'Sister Wedding Day Gift', imageUrl: '/images/related/sister-wedding-gift.jpg', href: '/search?q=sister+wedding+gift' },
		{ title: 'Ring Dishes', imageUrl: '/images/related/ring-dishes.jpg', href: '/search?q=ring+dishes' },
		{ title: 'Trinket Dish', imageUrl: '/images/related/trinket-dish.jpg', href: '/search?q=trinket+dish' },
		{ title: 'Jewelry Plate', imageUrl: '/images/related/jewelry-plate.jpg', href: '/search?q=jewelry+plate' },
		{ title: 'Bridesmaid Proposal', imageUrl: '/images/related/bridesmaid-proposal.jpg', href: '/search?q=bridesmaid+proposal' }
	]);

	// ⬇️ Changed from Product[] to ProductCard[]
	let frequentlyBoughtTogether = $derived<ProductCard[]>(
		data.frequentlyBoughtTogether || []
	);

	// ⬇️ Changed from Product[] to ProductCard[]
	let relatedProducts = $derived<ProductCard[]>(
		data.relatedProducts || []
	);

	let similarKeywords = $derived<string[]>(
		data.similarKeywords || ['Handmade', 'Gift', 'Wedding', 'Personalized', 'Custom']
	);

	// ⬇️ Changed parameter from Product to ProductCard
	function handleAddToCart(product: ProductCard) {
		console.log('Adding to cart:', product.title);
		// You can implement the actual cart logic here
	}
</script>

<!-- The rest of your HTML remains exactly the same -->
<svelte:head>
	<title>{product.title} | Radius</title>
	<meta name="description" content={product.description} />
	{#if product.seo}
		{#if product.seo.title}<title>{product.seo.title}</title>{/if}
		{#if product.seo.description}<meta name="description" content={product.seo.description} />{/if}
		{#if product.seo.keywords}<meta name="keywords" content={product.seo.keywords.join(', ')} />{/if}
	{/if}
</svelte:head>

<div class="py-16">
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8">
		<div class="col-span-7">
			<MediaGallery images={galleryImages} {allImages} />
			<RelatedSearches searches={relatedSearches} />

			{#if frequentlyBoughtTogether.length > 0}
				<FrequentlyBoughtTogether
					products={frequentlyBoughtTogether}
					onAddToCart={handleAddToCart}
				/>
			{/if}
		</div>

		<div class="col-span-5 self-start lg:ps-16">
			<Configurator
				{product}
				{selectedVariant}
				{selectedOptionValueIds}
				onOptionSelect={handleOptionSelect}
			/>
		</div>
	</div>

	{#if relatedProducts.length > 0}
		<RelatedProducts products={relatedProducts} title="You May Also Like" />
	{/if}

	{#if similarKeywords.length > 0}
		<SimilarKeywords keywords={similarKeywords} title="Shop by Keywords" />
	{/if}
</div>
