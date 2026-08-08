<script lang="ts">
	import { FileText, ShieldAlert, CheckCircle, Scale, Printer } from '@lucide/svelte';

	const lastUpdated = 'June 1, 2026';

	const sections = [
		{ id: 'acceptance', label: '1. Acceptance of Terms' },
		{ id: 'accounts', label: '2. Account Obligations' },
		{ id: 'buying', label: '3. Buying & Custom Orders' },
		{ id: 'selling', label: '4. Maker Standards' },
		{ id: 'payments', label: '5. Payments & Taxes' },
		{ id: 'guarantee', label: '6. 10-Year Repair Warranty' },
		{ id: 'liability', label: '7. Limitation of Liability' },
		{ id: 'disputes', label: '8. Dispute Resolution' }
	];

	let activeSection = $state('acceptance');

	function printTerms() {
		window.print();
	}
</script>

<svelte:head>
	<title>Terms of Service | Radius</title>
	<meta
		name="description"
		content="Radius Terms of Service: Agreement governing marketplace usage, buyer protections, artisan obligations, and guarantees."
	/>
</svelte:head>

<div class="py-8 sm:py-12 max-w-7xl mx-auto space-y-10">
	<!-- 1. HEADER -->
	<header class="border-b border-gray-200 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
		<div>
			<div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-700">
				<Scale class="h-3.5 w-3.5" />
				<span>Legal Agreement</span>
			</div>
			<h1 class="mt-1 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-gray-900 tracking-tight">
				Terms of Service
			</h1>
			<p class="mt-2 text-sm text-gray-500">
				Version 4.2 • Effective Date: <span class="font-medium text-gray-900">{lastUpdated}</span>
			</p>
		</div>

		<button
			onclick={printTerms}
			class="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer w-fit"
		>
			<Printer class="h-4 w-4" />
			<span>Print Terms</span>
		</button>
	</header>

	<!-- 2. MAIN LAYOUT: STICKY SIDEBAR + TERMS PROSE -->
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
		<!-- Left Sidebar (4 Cols) -->
		<aside class="lg:col-span-4 sticky top-24 rounded-3xl bg-gray-50 border border-gray-200/80 p-6 space-y-4">
			<h3 class="text-xs font-semibold uppercase tracking-wider text-gray-500">
				Sections
			</h3>
			<nav class="space-y-1">
				{#each sections as sec}
					<a
						href="#{sec.id}"
						onclick={() => (activeSection = sec.id)}
						class={[
							'block rounded-xl px-3 py-2 text-xs font-medium transition-colors',
							activeSection === sec.id
								? 'bg-white font-semibold text-violet-900 shadow-sm'
								: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
						]}
					>
						{sec.label}
					</a>
				{/each}
			</nav>

			<div class="pt-4 border-t border-gray-200 text-xs text-gray-500 space-y-2">
				<p>
					Questions about these terms? Reach our compliance legal desk at <a href="mailto:legal@radius.com" class="text-violet-900 underline font-medium">legal@radius.com</a>.
				</p>
			</div>
		</aside>

		<!-- Right Terms Content (8 Cols) -->
		<div class="lg:col-span-8 space-y-12 text-gray-700 leading-relaxed text-sm sm:text-base">
			<!-- Section 1 -->
			<section id="acceptance" class="space-y-4 scroll-mt-28">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">1. Acceptance of Terms</h2>
				<p>
					By browsing, registering an account, or placing an order on Radius ("Platform", "we", "us"),
					you enter into a legally binding agreement subject to these Terms of Service. If you do not
					consent to all terms, you must refrain from accessing the service.
				</p>
			</section>

			<!-- Section 2 -->
			<section id="accounts" class="space-y-4 scroll-mt-28 border-t border-gray-200 pt-8">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">2. Account Obligations</h2>
				<p>
					You must be at least 18 years old to create an account. You are responsible for safeguarding
					your login credentials and are strictly liable for all activities conducted under your user
					session.
				</p>
			</section>

			<!-- Section 3 -->
			<section id="buying" class="space-y-4 scroll-mt-28 border-t border-gray-200 pt-8">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">3. Buying & Custom Craftsmanship</h2>
				<p>
					Radius facilitates direct purchases from verified artisan workshops. Because many items are
					hand-finished or made-to-order (including hot-foil monogramming and custom sizing):
				</p>
				<ul class="list-disc pl-5 space-y-2 text-sm text-gray-600">
					<li>
						<strong class="text-gray-900">Lead Times:</strong> Estimated crafting windows are displayed on
						each product page. Slight variations in natural grain and hand stitching are marks of authentic
						artistry, not defects.
					</li>
					<li>
						<strong class="text-gray-900">Monogrammed Goods:</strong> Personalized items cannot be returned
						unless a structural defect exists upon delivery.
					</li>
				</ul>
			</section>

			<!-- Section 4 -->
			<section id="selling" class="space-y-4 scroll-mt-28 border-t border-gray-200 pt-8">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">4. Maker Standards & Code of Conduct</h2>
				<p>
					All studio partners must comply with our Environmental and Labor Standard: zero counterfeit
					goods, verified material provenance (e.g. vegetable-tanned hides, certified non-mulesed wool),
					and fair artisan wages.
				</p>
			</section>

			<!-- Section 5 -->
			<section id="payments" class="space-y-4 scroll-mt-28 border-t border-gray-200 pt-8">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">5. Payments, Taxes & Duties</h2>
				<p>
					Prices are billed in the selected currency. For international shipments, applicable customs
					duties and VAT are calculated at checkout with Guaranteed Landed Cost where supported.
				</p>
			</section>

			<!-- Section 6 -->
			<section id="guarantee" class="space-y-4 scroll-mt-28 border-t border-gray-200 pt-8">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">6. 10-Year Repair Warranty & 30-Day Returns</h2>
				<p>
					Core leather goods and luggage carry a 10-year hardware and seam repair warranty. Non-personalized
					pieces in original unworn condition may be returned within 30 days of delivery for a full refund.
				</p>
			</section>

			<!-- Section 7 -->
			<section id="liability" class="space-y-4 scroll-mt-28 border-t border-gray-200 pt-8">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">7. Limitation of Liability</h2>
				<p>
					To the maximum extent permitted by applicable law, Radius shall not be liable for indirect,
					punitive, or consequential damages resulting from platform downtime or third-party courier
					delays.
				</p>
			</section>

			<!-- Section 8 -->
			<section id="disputes" class="space-y-4 scroll-mt-28 border-t border-gray-200 pt-8">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">8. Dispute Resolution & Governing Law</h2>
				<p>
					These terms are governed by the laws of the State of California, United States. Any disputes
					shall be resolved by binding individual arbitration under the American Arbitration Association
					(AAA) rules.
				</p>
			</section>
		</div>
	</div>
</div>
