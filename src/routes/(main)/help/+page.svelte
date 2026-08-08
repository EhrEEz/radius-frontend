<script lang="ts">
	import {
		Search,
		Package,
		RefreshCw,
		Truck,
		Scissors,
		ShieldCheck,
		HelpCircle,
		MessageSquare,
		Mail,
		Phone,
		ChevronDown,
		ArrowRight,
		CheckCircle2,
		X
	} from '@lucide/svelte';
	import { Button } from '$lib/components/ui/Button';

	const helpCategories = [
		{
			id: 'orders',
			icon: Package,
			title: 'Orders & Tracking',
			desc: 'Track live shipments, view past receipts, and modify delivery addresses.'
		},
		{
			id: 'returns',
			icon: RefreshCw,
			title: 'Returns & Refunds',
			desc: 'Start a 30-day return, print pre-paid shipping labels, or review policies.'
		},
		{
			id: 'shipping',
			icon: Truck,
			title: 'Shipping & Delivery',
			desc: 'Global transit speeds, customs/duties, and carbon-neutral fulfillment.'
		},
		{
			id: 'custom',
			icon: Scissors,
			title: 'Custom & Monograms',
			desc: 'Lead times for personalized hot-foil embossing and tailor-fit pieces.'
		},
		{
			id: 'warranty',
			icon: ShieldCheck,
			title: '10-Year Warranty',
			desc: 'Complimentary hardware, zipper, and seam repair program.'
		},
		{
			id: 'artisan',
			icon: HelpCircle,
			title: 'Artisan Support',
			desc: 'Direct communication with workshops and studio commission questions.'
		}
	];

	interface FAQItem {
		q: string;
		a: string;
		category: string;
	}

	const faqs: FAQItem[] = [
		{
			category: 'shipping',
			q: 'How long does international shipping take?',
			a: 'Standard international shipping takes 4–7 business days via DHL Express. All orders are 100% carbon-neutral and include doorstep tracking and customs pre-clearance.'
		},
		{
			category: 'shipping',
			q: 'What is Guaranteed Landed Cost at checkout?',
			a: 'We calculate all local VAT, GST, and customs duties at checkout so there are no unexpected carrier fees or import delays upon arrival at your doorstep.'
		},
		{
			category: 'returns',
			q: 'How do I return an item within 30 days?',
			a: 'Visit our Returns Portal, enter your order number and email, and download a pre-paid DHL return label. Once received at our hub, refunds are issued to your original payment method in 2–3 business days.'
		},
		{
			category: 'returns',
			q: 'Can personalized or monogrammed pieces be returned?',
			a: 'Because hot-foil monograms are permanently pressed into natural grain, personalized pieces cannot be returned unless a structural material defect exists upon receipt.'
		},
		{
			category: 'warranty',
			q: 'What is covered under the 10-Year Repair Warranty?',
			a: 'All core luggage, backpacks, and leather goods are protected against zipper failures, torn seams, broken rivets, and brass hardware defects. We repair pieces free of charge at our studio bench.'
		},
		{
			category: 'custom',
			q: 'How do I care for my vegetable-tanned leather?',
			a: 'We recommend applying pure beeswax or lanolin leather balm every six months. Keep away from prolonged soaking and allow wet leather to air-dry at room temperature.'
		}
	];

	let searchQuery = $state('');
	let activeFaqTab = $state('all');
	let openFaq = $state<string | null>(null);

	// Quick tracking lookup simulation
	let trackingOrder = $state('');
	let trackingResult = $state<string | null>(null);

	function handleTrackOrder(e: SubmitEvent) {
		e.preventDefault();
		if (trackingOrder.trim()) {
			trackingResult = `Order ${trackingOrder} is in transit with DHL Express • Estimated delivery in 2 days.`;
		}
	}

	let filteredFaqs = $derived.by(() => {
		let list = faqs;

		if (activeFaqTab !== 'all') {
			list = list.filter((f) => f.category === activeFaqTab);
		}

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			list = list.filter(
				(f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
			);
		}

		return list;
	});

	function toggleFaq(question: string) {
		openFaq = openFaq === question ? null : question;
	}
</script>

<svelte:head>
	<title>Help & Support Concierge | Radius</title>
	<meta
		name="description"
		content="Radius Help Center: Instant order tracking, return requests, warranty claims, and 24/7 concierge assistance."
	/>
</svelte:head>

<div class="space-y-16 sm:space-y-20 py-6 sm:py-8">
	<!-- 1. HERO SEARCH SECTION -->
	<header class="rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent"></div>

		<div class="relative z-10 max-w-2xl mx-auto space-y-4">
			<span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-amber-300 uppercase tracking-wider">
				<HelpCircle class="h-3.5 w-3.5" />
				Support Concierge
			</span>

			<h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-white tracking-tight">
				How can we assist your journey?
			</h1>

			<p class="text-sm sm:text-base text-gray-300">
				Search our knowledge base, track a parcel, or connect with our concierge team.
			</p>

			<!-- Big Search Input -->
			<div class="relative mt-6 max-w-xl mx-auto">
				<Search class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search shipping times, 10-year warranty, returns..."
					class="w-full rounded-full border border-gray-700 bg-neutral-800 py-3.5 pl-12 pr-12 text-sm text-white placeholder-gray-400 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all shadow-inner"
				/>
				{#if searchQuery}
					<button
						onclick={() => (searchQuery = '')}
						class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
					>
						<X class="h-4 w-4" />
					</button>
				{/if}
			</div>
		</div>
	</header>

	<!-- 2. QUICK HELP CATEGORY CARDS (6-GRID) -->
	<section>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each helpCategories as cat}
				<div class="group rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
					<div>
						<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
							<cat.icon class="h-6 w-6" />
						</div>
						<h3 class="mt-4 text-xl font-serif font-semibold text-gray-900 group-hover:text-violet-900 transition-colors">
							{cat.title}
						</h3>
						<p class="mt-1.5 text-sm text-gray-600 leading-relaxed">
							{cat.desc}
						</p>
					</div>

					<div class="mt-6 pt-4 border-t border-gray-100">
						<button
							onclick={() => {
								activeFaqTab = cat.id;
								window.scrollTo({ top: 650, behavior: 'smooth' });
							}}
							class="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-900 hover:text-violet-700 transition-colors cursor-pointer"
						>
							<span>Browse FAQs</span>
							<ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
						</button>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- 3. LIVE ORDER LOOKUP WIDGET -->
	<section class="rounded-3xl bg-gray-50 border border-gray-200/90 p-6 sm:p-10">
		<div class="max-w-xl mx-auto text-center space-y-3">
			<span class="text-xs font-semibold uppercase tracking-wider text-violet-700">Self-Service</span>
			<h2 class="text-2xl sm:text-3xl font-serif font-semibold text-gray-900">Quick Parcel Tracking</h2>
			<p class="text-sm text-gray-600">
				Enter your 8-digit order number from your confirmation email to inspect live carrier telemetry.
			</p>

			<form onsubmit={handleTrackOrder} class="mt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
				<input
					type="text"
					required
					bind:value={trackingOrder}
					placeholder="e.g. RAD-89421"
					class="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-gray-900 focus:outline-none"
				/>
				<button
					type="submit"
					class="rounded-full bg-gray-950 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors cursor-pointer shrink-0"
				>
					Track Parcel
				</button>
			</form>

			{#if trackingResult}
				<div class="mt-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-medium text-emerald-900 flex items-center justify-center gap-2">
					<CheckCircle2 class="h-4 w-4 text-emerald-600 shrink-0" />
					<span>{trackingResult}</span>
				</div>
			{/if}
		</div>
	</section>

	<!-- 4. FAQ ACCORDION SECTION -->
	<section class="space-y-6">
		<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
			<div>
				<h2 class="text-2xl sm:text-3xl font-serif font-semibold text-gray-900 tracking-tight">
					Frequently Asked Questions
				</h2>
				<p class="text-sm text-gray-500 mt-1">Clear answers regarding shipping, craftsmanship warranties, and returns.</p>
			</div>

			<!-- Filter tabs -->
			<div class="flex flex-wrap items-center gap-2">
				{#each ['all', 'shipping', 'returns', 'warranty', 'custom'] as tab}
					<button
						onclick={() => (activeFaqTab = tab)}
						class={[
							'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer capitalize',
							activeFaqTab === tab
								? 'bg-gray-950 text-white'
								: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
						]}
					>
						{tab}
					</button>
				{/each}
			</div>
		</div>

		<!-- Accordion List -->
		<div class="divide-y divide-gray-200 rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm">
			{#each filteredFaqs as faq (faq.q)}
				<div class="p-6">
					<button
						onclick={() => toggleFaq(faq.q)}
						class="flex w-full items-center justify-between text-left text-base font-semibold text-gray-900 cursor-pointer"
					>
						<span>{faq.q}</span>
						<ChevronDown
							class={[
								'h-5 w-5 text-gray-400 transition-transform duration-200 shrink-0 ml-4',
								openFaq === faq.q ? 'rotate-180 text-violet-900' : ''
							]}
						/>
					</button>

					{#if openFaq === faq.q}
						<div class="mt-3 text-sm text-gray-600 leading-relaxed pr-8">
							<p>{faq.a}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- 5. CONCIERGE DIRECT CONTACT CARDS (3-GRID) -->
	<section class="space-y-6">
		<div class="text-center max-w-xl mx-auto">
			<span class="text-xs font-semibold uppercase tracking-wider text-violet-700">Direct Concierge</span>
			<h2 class="mt-1 text-2xl sm:text-3xl font-serif font-semibold text-gray-900">Still need a hand?</h2>
			<p class="text-sm text-gray-600 mt-1">Our support team is based in San Francisco, Florence, and Tokyo.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<!-- Option 1: Live Chat -->
			<div class="rounded-3xl bg-neutral-900 text-white p-7 flex flex-col justify-between shadow-xl">
				<div>
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 text-amber-300 mb-4">
						<MessageSquare class="h-5 w-5" />
					</div>
					<h3 class="text-lg font-serif font-semibold text-white">Live Concierge Chat</h3>
					<p class="mt-1 text-xs text-gray-300 leading-relaxed">
						Instant assistance for sizing, styling, and checkout questions.
					</p>
					<p class="mt-3 text-xs text-emerald-400 font-medium">● Typical wait: &lt; 2 minutes</p>
				</div>
				<div class="mt-6">
					<Button variant="white" size="sm" class="gap-2 w-fit">
						<span>Start Live Chat</span>
						<ArrowRight class="h-3.5 w-3.5" />
					</Button>
				</div>
			</div>

			<!-- Option 2: Email -->
			<div class="rounded-3xl bg-white border border-gray-200 p-7 flex flex-col justify-between shadow-sm">
				<div>
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-violet-900 mb-4">
						<Mail class="h-5 w-5" />
					</div>
					<h3 class="text-lg font-serif font-semibold text-gray-900">Email Concierge Desk</h3>
					<p class="mt-1 text-xs text-gray-600 leading-relaxed">
						In-depth order inquiries, custom commission requests, and repair claims.
					</p>
					<p class="mt-3 text-xs text-gray-500 font-medium">● Response within 4 hours</p>
				</div>
				<div class="mt-6">
					<Button variant="outline" href="mailto:support@radius.com" size="sm" class="gap-2 w-fit text-gray-900 border-gray-400">
						<span>support@radius.com</span>
						<ArrowRight class="h-3.5 w-3.5" />
					</Button>
				</div>
			</div>

			<!-- Option 3: Phone / Appointment -->
			<div class="rounded-3xl bg-white border border-gray-200 p-7 flex flex-col justify-between shadow-sm">
				<div>
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-violet-900 mb-4">
						<Phone class="h-5 w-5" />
					</div>
					<h3 class="text-lg font-serif font-semibold text-gray-900">Studio Phone Concierge</h3>
					<p class="mt-1 text-xs text-gray-600 leading-relaxed">
						Speak directly with our San Francisco flagship team during studio hours.
					</p>
					<p class="mt-3 text-xs text-gray-500 font-medium">Mon–Fri • 8am – 6pm PST</p>
				</div>
				<div class="mt-6">
					<Button variant="outline" href="tel:+18005550199" size="sm" class="gap-2 w-fit text-gray-900 border-gray-400">
						<span>+1 (800) 555-0199</span>
					</Button>
				</div>
			</div>
		</div>
	</section>
</div>
