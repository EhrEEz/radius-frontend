<script lang="ts">
	import { page } from '$app/state';
	import {
		Clock,
		Calendar,
		ArrowLeft,
		ArrowRight,
		Bookmark,
		Share2,
		Sparkles,
		CheckCircle2,
		Quote
	} from '@lucide/svelte';
	import { Button } from '$lib/components/ui/Button';

	// Mock Article Data Lookup
	const slug = $derived(page.params.slug || 'art-of-vegetable-tanning');

	const article = $derived({
		title: 'The Slow Alchemy of Tuscan Vegetable Tanning',
		subtitle:
			'Inside the medieval tanning pits of Santa Croce sull’Arno, master artisans preserve a sixty-day natural transformation using pure chestnut and mimosa bark.',
		category: 'Craft & Process',
		date: 'June 14, 2026',
		readTime: '6 min read',
		heroImage:
			'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1600&h=900&fit=crop',
		author: {
			name: 'Matteo Bellini',
			role: 'Master Leatherworker & Studio Founder',
			bio: 'Third-generation craftsman in Florence, Italy. Dedicated to preserving historic pit-tanning methods and sustainable vegetable extracts.',
			avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
		}
	});

	let bookmarked = $state(false);
	let copiedLink = $state(false);

	function handleShare() {
		navigator.clipboard.writeText(window.location.href);
		copiedLink = true;
		setTimeout(() => (copiedLink = false), 2500);
	}
</script>

<svelte:head>
	<title>{article.title} | The Radius Journal</title>
	<meta name="description" content={article.subtitle} />
</svelte:head>

<div class="py-6 sm:py-10 max-w-4xl mx-auto space-y-12">
	<!-- 1. BREADCRUMBS & NAVIGATION -->
	<nav class="flex items-center justify-between text-xs font-medium text-gray-500">
		<a
			href="/blog"
			class="inline-flex items-center gap-1.5 hover:text-gray-900 transition-colors font-semibold"
		>
			<ArrowLeft class="h-3.5 w-3.5" />
			<span>Back to all stories</span>
		</a>

		<div class="flex items-center gap-2">
			<button
				onclick={() => (bookmarked = !bookmarked)}
				class={[
					'inline-flex items-center gap-1 rounded-full border px-3 py-1 transition-colors cursor-pointer',
					bookmarked
						? 'border-violet-600 bg-violet-50 text-violet-800 font-semibold'
						: 'border-gray-300 text-gray-700 hover:bg-gray-100'
				]}
			>
				<Bookmark class="h-3.5 w-3.5" />
				<span>{bookmarked ? 'Saved' : 'Save Story'}</span>
			</button>

			<button
				onclick={handleShare}
				class="inline-flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
			>
				<Share2 class="h-3.5 w-3.5" />
				<span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
			</button>
		</div>
	</nav>

	<!-- 2. ARTICLE HEADER -->
	<header class="space-y-4 text-center sm:text-left">
		<span class="inline-flex items-center gap-1.5 rounded-full bg-violet-50 border border-violet-200 px-3 py-1 text-xs font-semibold text-violet-900 uppercase tracking-wider">
			<Sparkles class="h-3.5 w-3.5 text-violet-700" />
			{article.category}
		</span>

		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-gray-950 tracking-tight leading-tight">
			{article.title}
		</h1>

		<p class="text-lg sm:text-xl text-gray-600 leading-relaxed font-serif">
			{article.subtitle}
		</p>

		<!-- Author Meta Row -->
		<div class="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 text-xs text-gray-500">
			<div class="flex items-center gap-3">
				<img
					src={article.author.avatar}
					alt={article.author.name}
					class="h-10 w-10 rounded-full object-cover border border-gray-300"
				/>
				<div>
					<p class="font-semibold text-gray-900 text-sm">{article.author.name}</p>
					<p>{article.author.role}</p>
				</div>
			</div>

			<div class="flex items-center gap-4">
				<span class="inline-flex items-center gap-1">
					<Calendar class="h-3.5 w-3.5" />
					{article.date}
				</span>
				<span class="inline-flex items-center gap-1">
					<Clock class="h-3.5 w-3.5" />
					{article.readTime}
				</span>
			</div>
		</div>
	</header>

	<!-- 3. HERO IMAGE -->
	<div class="overflow-hidden rounded-3xl shadow-xl">
		<img
			src={article.heroImage}
			alt={article.title}
			class="h-[360px] sm:h-[480px] w-full object-cover"
		/>
	</div>

	<!-- 4. ARTICLE BODY -->
	<article class="prose prose-lg prose-gray max-w-none space-y-6 leading-relaxed text-gray-800">
		<p class="text-xl font-serif text-gray-900 leading-relaxed font-normal first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-violet-900">
			Along the winding banks of the Arno River, the unmistakable fragrance of tannin-rich chestnut
			timber and damp raw hide fills the air. Here, in the ancient workshops of Tuscany, leather is
			not merely manufactured; it is slowly nurtured into life over sixty patient days.
		</p>

		<h2 class="text-2xl sm:text-3xl font-serif font-semibold text-gray-900 pt-4">
			1. The Contrast: Chromium vs. Vegetable Tannins
		</h2>
		<p>
			Over ninety percent of the world’s leather today is tanned using harsh chromium mineral salts in
			less than 24 hours. While fast, chrome tanning produces a synthetic, plasticky feel and relies on
			toxic heavy metals that pollute waterways.
		</p>
		<p>
			In contrast, authentic vegetable tanning relies entirely on natural organic extracts derived from
			chestnut bark, quebracho wood, and mimosa pods. The hides are suspended in wooden pits filled with
			gradually concentrated tannin baths, allowing the vegetable liquor to slowly penetrate the deep
			fibers without compromising protein elasticity.
		</p>

		<!-- Pull Quote Callout -->
		<div class="my-8 rounded-2xl bg-violet-50/80 border-l-4 border-violet-800 p-6 sm:p-8">
			<Quote class="h-8 w-8 text-violet-400 mb-2" />
			<blockquote class="font-serif text-xl sm:text-2xl font-medium text-gray-900 italic leading-snug">
				"Chromium hides stay static forever until they crack. Vegetable tanned leather lives with you,
				drinks in your journeys, and remembers your touch."
			</blockquote>
			<cite class="mt-3 block text-xs font-semibold uppercase tracking-wider text-violet-900 not-italic">
				— Matteo Bellini, Master Craftsman
			</cite>
		</div>

		<h2 class="text-2xl sm:text-3xl font-serif font-semibold text-gray-900 pt-4">
			2. The Living Patina: Why Every Scuff Tells a Story
		</h2>
		<p>
			Because vegetable-tanned leather retains its natural pores and untreated surface, it reacts
			organically to ambient sunlight, natural skin oils, and ambient humidity. Within weeks, the pale
			honey color darkens into a deep, lustrous caramel brown. Scratches smooth out naturally when
			buffed with warm palms, and the leather grows softer with every journey.
		</p>

		<!-- Spec Breakdown Box -->
		<div class="my-8 rounded-3xl bg-neutral-900 text-white p-6 sm:p-8">
			<h3 class="text-xl font-serif font-semibold text-white">Craft Profile Summary</h3>
			<div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
				<div class="border-t border-gray-800 pt-3">
					<p class="text-gray-400">Tanning Duration</p>
					<p class="mt-1 font-semibold text-white text-sm">60 Days Slow Immersion</p>
				</div>
				<div class="border-t border-gray-800 pt-3">
					<p class="text-gray-400">Natural Extracts</p>
					<p class="mt-1 font-semibold text-white text-sm">Chestnut & Mimosa Bark</p>
				</div>
				<div class="border-t border-gray-800 pt-3">
					<p class="text-gray-400">Lifespan Expectancy</p>
					<p class="mt-1 font-semibold text-white text-sm">40+ Years With Care</p>
				</div>
			</div>
		</div>

		<h2 class="text-2xl sm:text-3xl font-serif font-semibold text-gray-900 pt-4">
			3. Caring for Heirloom Pieces
		</h2>
		<p>
			To preserve your pieces across generations, treat them with pure beeswax conditioner twice
			annually. Avoid synthetic silicon waterproofing sprays, and allow wet leather to air-dry
			naturally away from direct radiators.
		</p>
	</article>

	<!-- 5. AUTHOR BIO CARD -->
	<section class="rounded-3xl bg-gray-50 border border-gray-200/90 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
		<img
			src={article.author.avatar}
			alt={article.author.name}
			class="h-20 w-20 rounded-full object-cover border-2 border-white shadow-md shrink-0"
		/>
		<div class="text-center sm:text-left space-y-2">
			<span class="text-xs font-semibold text-violet-800 uppercase tracking-wider">About the Author</span>
			<h3 class="text-xl font-serif font-semibold text-gray-900">{article.author.name}</h3>
			<p class="text-sm text-gray-600 leading-relaxed">
				{article.author.bio}
			</p>
			<div class="pt-2">
				<a href="/artisans/bellini" class="inline-flex items-center gap-1 text-xs font-semibold text-violet-900 hover:text-violet-700">
					<span>View Studio Bellini pieces</span>
					<ArrowRight class="h-3.5 w-3.5" />
				</a>
			</div>
		</div>
	</section>

	<!-- 6. NEXT / PREVIOUS ARTICLE NAVIGATION -->
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
		<a
			href="/blog/pack-for-72-hours"
			class="group rounded-2xl border border-gray-200 p-5 hover:border-gray-900 transition-colors text-left"
		>
			<span class="text-xs font-medium text-gray-500">Previous Story</span>
			<p class="mt-1 text-sm font-semibold text-gray-900 group-hover:text-violet-900">
				← The Art of the 72-Hour Carry
			</p>
		</a>
		<a
			href="/blog/scottish-waxed-cotton-heritage"
			class="group rounded-2xl border border-gray-200 p-5 hover:border-gray-900 transition-colors text-right"
		>
			<span class="text-xs font-medium text-gray-500">Next Story</span>
			<p class="mt-1 text-sm font-semibold text-gray-900 group-hover:text-violet-900">
				Scottish Waxed Canvas Heritage →
			</p>
		</a>
	</div>
</div>
