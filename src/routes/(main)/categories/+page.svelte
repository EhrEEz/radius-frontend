<script lang="ts">
	import BannerSection from '$lib/components/layout/BannerSection.svelte';
	import { Button } from '$lib/components/ui/Button';
	import { ArrowRight } from '@lucide/svelte';

	interface CategoryItem {
		title: string;
		subtitle: string;
		slug: string;
		href: string;
		bgImage: string;
		align?: 'left' | 'center' | 'right';
		overlayOpacity?: string;
	}

	const categories: CategoryItem[] = [
		{
			title: 'Bags',
			subtitle: 'Crafted for the journey, designed for everyday life.',
			slug: 'bags',
			href: '/categories/bags',
			bgImage: 'https://images.unsplash.com/photo-1524679813234-66a389fe1a42?w=1366&h=600&fit=crop',
			align: 'left',
			overlayOpacity: 'bg-gray-950/45'
		},
		{
			title: 'Apparel & Fashion',
			subtitle: 'Timeless silhouettes tailored from premium natural fabrics.',
			slug: 'fashion',
			href: '/categories/fashion',
			bgImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1366&h=600&fit=crop',
			align: 'left',
			overlayOpacity: 'bg-gray-950/45'
		},
		{
			title: 'Accessories & Wallets',
			subtitle: 'Refined essentials and minimal everyday carry built to last.',
			slug: 'accessories',
			href: '/categories/accessories',
			bgImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=1366&h=600&fit=crop',
			align: 'left',
			overlayOpacity: 'bg-gray-950/45'
		},
		{
			title: 'Footwear',
			subtitle: 'Minimalist sneakers and boots engineered for all-day comfort.',
			slug: 'footwear',
			href: '/categories/footwear',
			bgImage: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1366&h=600&fit=crop',
			align: 'left',
			overlayOpacity: 'bg-gray-950/45'
		},
		{
			title: 'Travel & Outdoor',
			subtitle: 'Weather-resistant gear and smart packing systems for your journeys.',
			slug: 'travel',
			href: '/categories/travel',
			bgImage: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1366&h=600&fit=crop',
			align: 'left',
			overlayOpacity: 'bg-gray-950/45'
		},
		{
			title: 'Electronics & Tech',
			subtitle: 'Modern accessories and protective sleeves for your digital workspace.',
			slug: 'electronics',
			href: '/categories/electronics',
			bgImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1366&h=600&fit=crop',
			align: 'left',
			overlayOpacity: 'bg-gray-950/45'
		},
		{
			title: 'Home & Living',
			subtitle: 'Thoughtfully designed objects and textiles for mindful spaces.',
			slug: 'home',
			href: '/categories/home',
			bgImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1366&h=600&fit=crop',
			align: 'left',
			overlayOpacity: 'bg-gray-950/45'
		},
		{
			title: 'Beauty & Grooming',
			subtitle: 'Organic care essentials crafted with botanical ingredients.',
			slug: 'beauty',
			href: '/categories/beauty',
			bgImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1366&h=600&fit=crop',
			align: 'left',
			overlayOpacity: 'bg-gray-950/45'
		}
	];
</script>

<svelte:head>
	<title>Categories | Radius</title>
	<meta
		name="description"
		content="Explore all product categories at Radius, from handcrafted bags and apparel to travel gear and everyday essentials."
	/>
</svelte:head>

<div class="">
	<!-- Page Header -->
	<header class="mb-8 text-center sm:text-left grid grid-cols-12 py-24">
		<h1 class="text-4xl font-serif font-semibold text-gray-900 tracking-tight md:text-6xl col-span-4">
			All Categories
		</h1>
		<p class="mt-2 text-base text-gray-600 max-w-2xl col-span-5 col-start-7">
			Discover our complete collection of thoughtfully curated categories, designed with intention
			and built to last.
		</p>
	</header>

	<!-- Categories Banner List -->
	<div class="flex flex-col gap-6">
		{#each categories as category (category.slug)}
			<BannerSection
				title={category.title}
				subtitle={category.subtitle}
				bgImage={category.bgImage}
				textColor="text-white"
				overlayOpacity={category.overlayOpacity ?? 'bg-gray-950/40'}
				align={category.align ?? 'left'}
				aspectRatio="aspect-[21/9] sm:aspect-[4/1] lg:aspect-[5/1]"
				class="my-0"
			>
				<Button variant="white" href={category.href} class="group inline-flex items-center gap-2">
					<span>Explore {category.title}</span>
					<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
				</Button>
			</BannerSection>
		{/each}
	</div>
</div>
