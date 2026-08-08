<script lang="ts">
	import { Globe, Mail, Check, Sparkles, ChevronDown, Smartphone } from '@lucide/svelte';

	let email = $state('');
	let subscribed = $state(false);
	let selectedCurrency = $state('USD ($)');
	let selectedRegion = $state('United States');
	let openSection = $state<string | null>(null);

	function handleSubscribe(e: SubmitEvent) {
		e.preventDefault();
		if (email.trim()) {
			subscribed = true;
		}
	}

	function toggleSection(section: string) {
		openSection = openSection === section ? null : section;
	}

	const footerNav = [
		{
			title: 'Shop',
			links: [
				{ label: 'Gift cards', href: '/collections/gift-cards' },
				{ label: 'Radius Registry', href: '/registry' },
				{ label: 'Sitemap', href: '/sitemap' },
				{ label: 'Radius Blog', href: '/blog' },
				{ label: 'Radius United Kingdom', href: '/regions/uk' },
				{ label: 'Radius Germany', href: '/regions/de' },
				{ label: 'Radius Canada', href: '/regions/ca' },
				{ label: 'Artisan Directory', href: '/artisans' }
			]
		},
		{
			title: 'Sell',
			links: [
				{ label: 'Sell on Radius', href: '/sell' },
				{ label: 'Seller Teams', href: '/teams' },
				{ label: 'Forums & Community', href: '/community' },
				{ label: 'Affiliates & Creators', href: '/affiliates' },
				{ label: 'Seller Handbook', href: '/handbook' },
				{ label: 'Maker Stories', href: '/stories' }
			]
		},
		{
			title: 'About',
			links: [
				{ label: 'Radius, Inc.', href: '/about' },
				{ label: 'Policies', href: '/policies' },
				{ label: 'Investors', href: '/investors' },
				{ label: 'Careers', href: '/careers' },
				{ label: 'Press & Media', href: '/press' },
				{ label: 'Impact & Sustainability', href: '/sustainability' },
				{ label: 'Legal Notice', href: '/legal' }
			]
		},
		{
			title: 'Help',
			links: [
				{ label: 'Help Center', href: '/help' },
				{ label: 'Trust & Safety', href: '/trust' },
				{ label: 'Privacy settings', href: '/privacy-settings' },
				{ label: 'Resolution Center', href: '/resolution' },
				{ label: 'Contact Support', href: '/contact' },
				{ label: 'Download Radius App', href: '/app' }
			]
		}
	];
</script>

<footer
	class="mt-20 w-full bg-[#181d28] text-gray-300 antialiased font-sans border-t border-gray-800 content-grid"
>
	<!-- 1. Top Newsletter & Mission Bar -->
	<div class="border-b border-gray-800/80 bg-[#121620] full-width content-grid">
		<div class="py-12">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
				<!-- Newsletter Subscribe Form -->
				<div class="lg:col-span-7">
					<h3 class="text-xl font-serif font-medium text-white sm:text-2xl">
						Yes! Send me exclusive offers, unique gift ideas, and personalized tips.
					</h3>
					<p class="mt-2 text-sm text-gray-400">
						Stay in the loop with curated drops, designer collaborations, and seasonal releases.
					</p>

					{#if subscribed}
						<div
							class="mt-4 flex items-center gap-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-300"
						>
							<Check class="h-5 w-5 text-emerald-400 shrink-0" />
							<span>Thank you for subscribing! Check your inbox for your 10% welcome gift.</span>
						</div>
					{:else}
						<form onsubmit={handleSubscribe} class="mt-4 flex max-w-md flex-col sm:flex-row gap-2">
							<div class="relative flex-1">
								<Mail
									class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
								/>
								<input
									type="email"
									bind:value={email}
									required
									placeholder="Enter your email"
									class="w-full rounded-full border border-gray-700 bg-[#1f2635] py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-400 transition-colors focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
								/>
							</div>
							<button
								type="submit"
								class="inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100 shrink-0"
							>
								Subscribe
							</button>
						</form>
					{/if}
				</div>

				<!-- Etsy-style Sustainability & Humanity Badge -->
				<div class="lg:col-span-5 rounded-2xl bg-[#1a202d] p-5 border border-gray-800/80">
					<div class="flex items-start gap-4">
						<div class="rounded-xl bg-violet-600/20 p-2.5 text-violet-400 shrink-0">
							<Sparkles class="h-6 w-6" />
						</div>
						<div>
							<h4 class="text-sm font-semibold text-white">Radius is a global marketplace</h4>
							<p class="mt-1 text-xs leading-relaxed text-gray-400">
								Where conscious consumers meet master craftsmen. 100% of our carbon emissions from
								delivery are offset, supporting independent studios worldwide.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 2. Main Navigation Links -->
	<div class="py-12">
			<p class="font-serif text-3xl md:text-4xl mb-12">Where everyone find everything.</p>
		<!-- Desktop Grid -->
		<div class="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-8">
			{#each footerNav as col}
				<div>
					<h4 class="text-sm font-semibold tracking-wider text-white uppercase font-sans">
						{col.title}
					</h4>
					<ul class="mt-4 space-y-2.5 text-sm">
						{#each col.links as link}
							<li>
								<a
									href={link.href}
									class="text-gray-400 hover:text-white transition-colors duration-150 inline-block"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<!-- Mobile Accordion -->
		<div class="divide-y divide-gray-800 sm:hidden">
			{#each footerNav as col}
				<div class="py-3">
					<button
						onclick={() => toggleSection(col.title)}
						class="flex w-full items-center justify-between py-1 text-left text-sm font-semibold text-white"
					>
						<span>{col.title}</span>
						<ChevronDown
							class={[
								'h-4 w-4 text-gray-400 transition-transform duration-200',
								openSection === col.title ? 'rotate-180 text-white' : ''
							]}
						/>
					</button>

					{#if openSection === col.title}
						<ul class="mt-3 space-y-2.5 pb-2 pl-2 text-sm">
							{#each col.links as link}
								<li>
									<a
										href={link.href}
										class="text-gray-400 hover:text-white transition-colors block py-0.5"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- 3. App Banner & Social Connectivity -->
	<div class="border-t border-gray-800/80 bg-[#141822] full-width content-grid">
		<div
			class="py-8 flex flex-col md:flex-row items-center justify-between gap-6"
		>
			<div class="flex items-center gap-4 text-sm text-gray-300">
				<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#222838] text-white">
					<Smartphone class="h-5 w-5" />
				</div>
				<div>
					<p class="font-medium text-white">Download the Radius App</p>
					<p class="text-xs text-gray-400">Discover one-of-a-kind treasures on the go.</p>
				</div>
			</div>

			<!-- Social Icons & Badges -->
			<div class="flex items-center gap-3">
				<a
					href="https://instagram.com"
					target="_blank"
					rel="noreferrer"
					aria-label="Instagram"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e2433] text-gray-400 hover:bg-white hover:text-gray-900 transition-colors"
				>
					<svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
						<path
							d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
						/>
					</svg>
				</a>
				<a
					href="https://pinterest.com"
					target="_blank"
					rel="noreferrer"
					aria-label="Pinterest"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e2433] text-gray-400 hover:bg-white hover:text-gray-900 transition-colors"
				>
					<svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
						<path
							d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.372-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
						/>
					</svg>
				</a>
				<a
					href="https://facebook.com"
					target="_blank"
					rel="noreferrer"
					aria-label="Facebook"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e2433] text-gray-400 hover:bg-white hover:text-gray-900 transition-colors"
				>
					<svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
						<path
							d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
						/>
					</svg>
				</a>
				<a
					href="https://twitter.com"
					target="_blank"
					rel="noreferrer"
					aria-label="Twitter / X"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e2433] text-gray-400 hover:bg-white hover:text-gray-900 transition-colors"
				>
					<svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
						<path
							d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>

	<!-- 4. Bottom Row: Currency/Region & Legal -->
	<div class="border-t border-gray-800 bg-[#0e121a] full-width content-grid">
		<div
			class="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400"
		>
			<!-- Region & Currency Selector Button -->
			<div class="flex flex-wrap items-center gap-3">
				<button
					class="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-[#161c28] px-3.5 py-1.5 text-xs font-medium text-gray-200 hover:bg-[#20283a] hover:border-gray-500 transition-colors"
				>
					<Globe class="h-3.5 w-3.5 text-gray-400" />
					<span>{selectedRegion}</span>
					<span class="text-gray-500">|</span>
					<span>English (US)</span>
					<span class="text-gray-500">|</span>
					<span class="font-semibold text-white">{selectedCurrency}</span>
				</button>
			</div>

			<!-- Copyright & Links -->
			<div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
				<span>© 2026 Radius, Inc.</span>
				<a
					href="/terms"
					class="hover:text-white transition-colors underline-offset-4 hover:underline"
				>
					Terms of Use
				</a>
				<a
					href="/privacy"
					class="hover:text-white transition-colors underline-offset-4 hover:underline"
				>
					Privacy
				</a>

				<a
					href="/regions"
					class="hover:text-white transition-colors underline-offset-4 hover:underline"
				>
					Regions
				</a>
			</div>
		</div>
	</div>
</footer>
