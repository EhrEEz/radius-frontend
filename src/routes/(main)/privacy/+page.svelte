<script lang="ts">
	import {
		Shield,
		Lock,
		Eye,
		Cookie,
		FileText,
		CheckCircle2,
		Mail,
		Globe,
		Printer
	} from '@lucide/svelte';
	import { Button } from '$lib/components/ui/Button';

	const lastUpdated = 'June 1, 2026';

	const sections = [
		{ id: 'collection', label: '1. Information We Collect' },
		{ id: 'usage', label: '2. How We Use Data' },
		{ id: 'cookies', label: '3. Cookies & Tracking' },
		{ id: 'sharing', label: '4. Third-Party Sharing' },
		{ id: 'rights', label: '5. Your Rights (GDPR & CCPA)' },
		{ id: 'security', label: '6. Security & Storage' },
		{ id: 'contact', label: '7. Contact Privacy Officer' }
	];

	let activeSection = $state('collection');

	function printPolicy() {
		window.print();
	}
</script>

<svelte:head>
	<title>Privacy Policy | Radius</title>
	<meta
		name="description"
		content="Radius Privacy Policy: Learn how we collect, protect, and respect your personal information and transaction data."
	/>
</svelte:head>

<div class="py-8 sm:py-12 max-w-7xl mx-auto space-y-10">
	<!-- 1. HEADER -->
	<header class="border-b border-gray-200 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
		<div>
			<div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-700">
				<Shield class="h-3.5 w-3.5" />
				<span>Trust & Transparency</span>
			</div>
			<h1 class="mt-1 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-gray-900 tracking-tight">
				Privacy Policy
			</h1>
			<p class="mt-2 text-sm text-gray-500">
				Last Updated: <span class="font-medium text-gray-900">{lastUpdated}</span> • Effective Immediately
			</p>
		</div>

		<button
			onclick={printPolicy}
			class="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer w-fit"
		>
			<Printer class="h-4 w-4" />
			<span>Print Policy</span>
		</button>
	</header>

	<!-- 2. MAIN LAYOUT: STICKY SIDEBAR + CONTENT -->
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
		<!-- Left Sidebar Nav (4 Cols) -->
		<aside class="lg:col-span-4 sticky top-24 rounded-3xl bg-gray-50 border border-gray-200/80 p-6 space-y-4">
			<h3 class="text-xs font-semibold uppercase tracking-wider text-gray-500">
				Table of Contents
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

			<div class="pt-4 border-t border-gray-200">
				<div class="rounded-2xl bg-violet-900 text-white p-4 text-xs space-y-2">
					<p class="font-semibold">Questions about your data?</p>
					<p class="text-violet-200">
						Our Data Protection Officer responds to all inquiries within 48 business hours.
					</p>
					<a href="mailto:privacy@radius.com" class="inline-block text-amber-300 underline font-medium">
						privacy@radius.com
					</a>
				</div>
			</div>
		</aside>

		<!-- Right Content Prose (8 Cols) -->
		<div class="lg:col-span-8 space-y-12 text-gray-700 leading-relaxed text-sm sm:text-base">
			<!-- Section 1 -->
			<section id="collection" class="space-y-4 scroll-mt-28">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">1. Information We Collect</h2>
				<p>
					Radius is a conscious marketplace connecting independent makers with discerning customers.
					We collect only the minimum data required to facilitate custom craftsmanship, process secure
					transactions, and deliver your orders worldwide.
				</p>
				<ul class="list-disc pl-5 space-y-2 text-sm text-gray-600">
					<li>
						<strong class="text-gray-900">Account Credentials:</strong> Full name, verified email address,
						encrypted password hash, and communication preferences.
					</li>
					<li>
						<strong class="text-gray-900">Transaction & Delivery Data:</strong> Shipping destination, billing
						address, and order history. Full credit card numbers are tokenized by PCI-DSS Level 1 certified gateways (Stripe/PayPal) and are never stored on Radius servers.
					</li>
					<li>
						<strong class="text-gray-900">Studio & Customization Notes:</strong> Monogramming initials, custom
						sizing, and direct correspondence with artisans.
					</li>
				</ul>
			</section>

			<!-- Section 2 -->
			<section id="usage" class="space-y-4 scroll-mt-28 border-t border-gray-200 pt-8">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">2. How We Use Your Data</h2>
				<p>We utilize the collected information strictly for legitimate commercial purposes:</p>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
					<div class="rounded-2xl border border-gray-200 p-4 bg-white">
						<CheckCircle2 class="h-5 w-5 text-emerald-600 mb-2" />
						<h4 class="font-semibold text-gray-900 text-sm">Order Fulfillment</h4>
						<p class="mt-1 text-gray-500">Transmitting shipping manifests to carriers (DHL Express, FedEx) and workshop dispatchers.</p>
					</div>
					<div class="rounded-2xl border border-gray-200 p-4 bg-white">
						<Lock class="h-5 w-5 text-violet-600 mb-2" />
						<h4 class="font-semibold text-gray-900 text-sm">Fraud Prevention</h4>
						<p class="mt-1 text-gray-500">Real-time risk evaluation to protect buyers and independent artisans from payment fraud.</p>
					</div>
				</div>
			</section>

			<!-- Section 3 -->
			<section id="cookies" class="space-y-4 scroll-mt-28 border-t border-gray-200 pt-8">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">3. Cookies & Tracking</h2>
				<p>
					We use essential cookies to maintain shopping cart sessions and remember user preferences.
					We do NOT engage in third-party behavioral ad network tracking across external websites.
					You can adjust or revoke your cookie preferences at any time in your browser settings.
				</p>
			</section>

			<!-- Section 4 -->
			<section id="sharing" class="space-y-4 scroll-mt-28 border-t border-gray-200 pt-8">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">4. Third-Party Sharing</h2>
				<p>
					<strong class="text-gray-900 font-semibold">We never sell, rent, or trade your personal information.</strong>
					Data is shared solely with trusted service providers under strict data processing agreements:
				</p>
				<p class="text-sm text-gray-600">
					Carriers (DHL, UPS), Payment Processors (Stripe), and transactional email providers (SendGrid).
				</p>
			</section>

			<!-- Section 5 -->
			<section id="rights" class="space-y-4 scroll-mt-28 border-t border-gray-200 pt-8">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">5. Your Rights (GDPR & CCPA)</h2>
				<p>Depending on your location, you have statutory rights over your personal data:</p>
				<ul class="list-disc pl-5 space-y-2 text-sm text-gray-600">
					<li><strong>Right of Access:</strong> Request a complete JSON export of your personal data archive.</li>
					<li><strong>Right to Erasure ("Be Forgotten"):</strong> Delete your account and purge transaction identifiers where permitted by tax law.</li>
					<li><strong>Right to Rectification:</strong> Update inaccurate contact or shipping records.</li>
					<li><strong>Do Not Sell My Info:</strong> Radius does not sell data, guaranteeing CCPA compliance by default.</li>
				</ul>
			</section>

			<!-- Section 6 -->
			<section id="security" class="space-y-4 scroll-mt-28 border-t border-gray-200 pt-8">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">6. Security & Storage</h2>
				<p>
					All network traffic is encrypted via TLS 1.3. Databases are stored in encrypted volumes with
					strict role-based access control (RBAC) and automated daily backups.
				</p>
			</section>

			<!-- Section 7 -->
			<section id="contact" class="space-y-4 scroll-mt-28 border-t border-gray-200 pt-8">
				<h2 class="text-2xl font-serif font-semibold text-gray-900">7. Contact the Data Protection Officer</h2>
				<p>
					If you have inquiries regarding this policy or wish to exercise statutory data rights:
				</p>
				<div class="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm">
					<p class="font-semibold text-gray-900">Radius Inc. — Privacy & Legal Counsel</p>
					<p class="text-gray-600 mt-1">100 Artisan Way, Suite 400, San Francisco, CA 94107</p>
					<p class="text-gray-600">Email: <a href="mailto:privacy@radius.com" class="text-violet-900 underline font-medium">privacy@radius.com</a></p>
				</div>
			</section>
		</div>
	</div>
</div>
