<script lang="ts">
	import {
		Search,
		Sparkles,
		Clock,
		ArrowRight,
		User,
		Calendar,
		Bookmark,
		X,
		BookOpen
	} from '@lucide/svelte';
	import { Button } from '$lib/components/ui/Button';

	interface BlogPost {
		id: string;
		slug: string;
		title: string;
		excerpt: string;
		category: string;
		author: {
			name: string;
			role: string;
			avatar: string;
		};
		date: string;
		readTime: string;
		image: string;
		featured?: boolean;
		tags: string[];
	}

	const posts: BlogPost[] = [
		{
			id: '1',
			slug: 'art-of-vegetable-tanning',
			title: 'The Slow Alchemy of Tuscan Vegetable Tanning',
			excerpt:
				'Deep inside the leather district of Santa Croce sull’Arno, master tanners spend sixty days transforming raw hides using chestnut and mimosa bark extracts.',
			category: 'Craft & Process',
			author: {
				name: 'Matteo Bellini',
				role: 'Master Leatherworker',
				avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
			},
			date: 'June 14, 2026',
			readTime: '6 min read',
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=800&fit=crop',
			featured: true,
			tags: ['Leathercraft', 'Italy', 'Heritage']
		},
		{
			id: '2',
			slug: 'pack-for-72-hours',
			title: 'The Art of the 72-Hour Carry: A Minimalist Packing Study',
			excerpt:
				'How to travel seamlessly across three climates with a single 35L weekender bag, compression packing modules, and crease-resistant merino knits.',
			category: 'Travel Journal',
			author: {
				name: 'Elena Rostova',
				role: 'Design Director',
				avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop'
			},
			date: 'May 28, 2026',
			readTime: '5 min read',
			image:
				'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&h=600&fit=crop',
			tags: ['Travel', 'Packing', 'Weekender']
		},
		{
			id: '3',
			slug: 'scottish-waxed-cotton-heritage',
			title: 'Scottish Waxed Canvas: Two Centuries of Stormproof Weaving',
			excerpt:
				'From North Sea clipper sails to modern chore coats: why waxed cotton remains the gold standard for breathable weather resistance.',
			category: 'Material Studies',
			author: {
				name: 'Alasdair MacLeod',
				role: 'Textile Historian',
				avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
			},
			date: 'May 12, 2026',
			readTime: '7 min read',
			image:
				'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=600&fit=crop',
			tags: ['Materials', 'Scotland', 'Outerwear']
		},
		{
			id: '4',
			slug: 'tokyo-minimal-desk-culture',
			title: 'Inside Atelier Kanto: Designing Quiet Workspace Objects',
			excerpt:
				'A visit to the Meguro studio where aluminum cable docks and wool felt blotters are milled to half-millimeter tolerances.',
			category: 'Studio Profiles',
			author: {
				name: 'Kenji Takahashi',
				role: 'Industrial Designer',
				avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
			},
			date: 'April 30, 2026',
			readTime: '4 min read',
			image:
				'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
			tags: ['Tokyo', 'Design', 'Desk Setup']
		},
		{
			id: '5',
			slug: 'merino-wool-natural-performance',
			title: 'Why Merino Wool Outperforms Modern Synthetic Activewear',
			excerpt:
				'An examination of wool fiber crimp, natural lanolin protection, and keratin moisture buffering across varying temperature extremes.',
			category: 'Material Studies',
			author: {
				name: 'Elena Rostova',
				role: 'Design Director',
				avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop'
			},
			date: 'April 18, 2026',
			readTime: '8 min read',
			image:
				'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=600&fit=crop',
			tags: ['Knitwear', 'Merino', 'Sustainability']
		},
		{
			id: '6',
			slug: 'kyoto-wood-fired-ceramics',
			title: 'The Beauty of Imperfection: Shigaraki Stoneware & Tea Rituals',
			excerpt:
				'How flame paths inside an anagama wood kiln produce spontaneous ash glazes that make every cup and bowl completely singular.',
			category: 'Craft & Process',
			author: {
				name: 'Sora Tanaka',
				role: 'Ceramist',
				avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
			},
			date: 'April 04, 2026',
			readTime: '5 min read',
			image:
				'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop',
			tags: ['Ceramics', 'Home', 'Kyoto']
		}
	];

	const categories = [
		'All Stories',
		'Craft & Process',
		'Travel Journal',
		'Material Studies',
		'Studio Profiles'
	];

	let activeCategory = $state('All Stories');
	let searchQuery = $state('');

	let filteredPosts = $derived.by(() => {
		let list = posts;

		if (activeCategory !== 'All Stories') {
			list = list.filter((p) => p.category === activeCategory);
		}

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			list = list.filter(
				(p) =>
					p.title.toLowerCase().includes(q) ||
					p.excerpt.toLowerCase().includes(q) ||
					p.tags.some((t) => t.toLowerCase().includes(q))
			);
		}

		return list;
	});

	let featuredPost = $derived(posts.find((p) => p.featured) || posts[0]);
</script>

<svelte:head>
	<title>The Journal | Radius Stories & Craft Studies</title>
	<meta
		name="description"
		content="Essays on artisan craftsmanship, material science, minimal travel, and studio profiles from the Radius maker community."
	/>
</svelte:head>

<div class="space-y-16 sm:space-y-20 py-6 sm:py-8">
	<!-- 1. HEADER -->
	<header class="space-y-4">
		<div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-700">
			<BookOpen class="h-3.5 w-3.5" />
			<span>The Radius Journal</span>
		</div>
		<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
			<div>
				<h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-gray-900 tracking-tight">
					Stories of Craft & Living
				</h1>
				<p class="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
					Essays on material provenance, maker workshops, minimal packing philosophy, and the quiet
					satisfaction of objects built to endure.
				</p>
			</div>

			<!-- Search -->
			<div class="relative w-full lg:w-80">
				<Search class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search articles & crafts..."
					class="w-full rounded-full border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors"
				/>
				{#if searchQuery}
					<button
						onclick={() => (searchQuery = '')}
						class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
					>
						<X class="h-4 w-4" />
					</button>
				{/if}
			</div>
		</div>

		<!-- Category Filter Tabs -->
		<div class="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200">
			{#each categories as cat}
				<button
					onclick={() => (activeCategory = cat)}
					class={[
						'rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer',
						activeCategory === cat
							? 'bg-gray-950 text-white shadow-sm'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
					]}
				>
					{cat}
				</button>
			{/each}
		</div>
	</header>

	<!-- 2. HERO FEATURED ARTICLE (IF ON 'ALL' AND NO SEARCH) -->
	{#if activeCategory === 'All Stories' && !searchQuery && featuredPost}
		<section>
			<a
				href="/blog/{featuredPost.slug}"
				class="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-hidden rounded-3xl bg-neutral-900 text-white p-6 sm:p-10 lg:p-12 shadow-2xl transition-all duration-300 hover:shadow-gray-900/30"
			>
				<!-- Left Text (7 Cols) -->
				<div class="lg:col-span-7 space-y-4">
					<div class="flex items-center gap-3">
						<span class="rounded-full bg-amber-400 text-gray-950 px-3 py-1 text-xs font-bold uppercase tracking-wider">
							Featured Essay
						</span>
						<span class="text-xs text-gray-300 font-medium">{featuredPost.category}</span>
						<span class="text-gray-500">•</span>
						<span class="text-xs text-gray-400">{featuredPost.readTime}</span>
					</div>

					<h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-white tracking-tight group-hover:text-amber-200 transition-colors leading-tight">
						{featuredPost.title}
					</h2>

					<p class="text-base text-gray-300 line-clamp-3 leading-relaxed">
						{featuredPost.excerpt}
					</p>

					<!-- Author info -->
					<div class="pt-4 flex items-center justify-between border-t border-gray-800">
						<div class="flex items-center gap-3">
							<img
								src={featuredPost.author.avatar}
								alt={featuredPost.author.name}
								class="h-10 w-10 rounded-full object-cover border border-gray-700"
							/>
							<div>
								<p class="text-sm font-semibold text-white">{featuredPost.author.name}</p>
								<p class="text-xs text-gray-400">{featuredPost.date}</p>
							</div>
						</div>

						<div class="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
							<span>Read Full Story</span>
							<ArrowRight class="h-4 w-4" />
						</div>
					</div>
				</div>

				<!-- Right Image (5 Cols) -->
				<div class="lg:col-span-5 relative aspect-[4/3] overflow-hidden rounded-2xl">
					<img
						src={featuredPost.image}
						alt={featuredPost.title}
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
				</div>
			</a>
		</section>
	{/if}

	<!-- 3. ARTICLE GRID -->
	<section>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each filteredPosts as post (post.id)}
				<article class="group flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300">
					<!-- Thumbnail -->
					<a href="/blog/{post.slug}" class="relative aspect-[16/10] overflow-hidden bg-gray-100 block">
						<img
							src={post.image}
							alt={post.title}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							loading="lazy"
						/>
						<span class="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm">
							{post.category}
						</span>
					</a>

					<!-- Content -->
					<div class="flex flex-1 flex-col p-6 sm:p-7">
						<div class="flex items-center gap-2 text-xs text-gray-500 font-medium">
							<span>{post.date}</span>
							<span>•</span>
							<span>{post.readTime}</span>
						</div>

						<h3 class="mt-2 text-xl font-serif font-semibold text-gray-900 group-hover:text-violet-900 transition-colors leading-snug">
							<a href="/blog/{post.slug}">
								{post.title}
							</a>
						</h3>

						<p class="mt-2 text-sm text-gray-600 line-clamp-3 leading-relaxed">
							{post.excerpt}
						</p>

						<!-- Footer -->
						<div class="mt-auto pt-6 flex items-center justify-between border-t border-gray-100">
							<div class="flex items-center gap-2.5">
								<img
									src={post.author.avatar}
									alt={post.author.name}
									class="h-7 w-7 rounded-full object-cover"
								/>
								<span class="text-xs font-medium text-gray-800">{post.author.name}</span>
							</div>

							<a
								href="/blog/{post.slug}"
								class="inline-flex items-center gap-1 text-xs font-semibold text-violet-900 hover:text-violet-700"
							>
								<span>Read</span>
								<ArrowRight class="h-3 w-3 transition-transform group-hover:translate-x-1" />
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<!-- 4. JOURNAL NEWSLETTER DISPATCH -->
	<section class="rounded-3xl bg-[#181d28] text-white p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl border border-gray-800">
		<span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-amber-300 uppercase tracking-wider">
			<Sparkles class="h-3.5 w-3.5" />
			Weekly Dispatch
		</span>
		<h2 class="mt-4 text-3xl sm:text-4xl font-serif font-semibold text-white">
			Get the Radius Journal in Your Inbox
		</h2>
		<p class="mt-2 text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
			Subscribers receive deep-dive craft studies, maker interviews, and private release invites every Sunday morning.
		</p>
		<form class="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
			<input
				type="email"
				required
				placeholder="Enter your email"
				class="flex-1 rounded-full border border-gray-700 bg-neutral-800 px-5 py-3 text-sm text-white placeholder-gray-400 focus:border-white focus:outline-none"
			/>
			<button
				type="submit"
				class="rounded-full bg-white px-7 py-3 text-sm font-semibold text-gray-950 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
			>
				Subscribe
			</button>
		</form>
	</section>
</div>
