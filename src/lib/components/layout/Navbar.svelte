<script lang="ts">
	import {
		Search,
		Menu,
		X,
		Heart,
		ShoppingCart,
		User,
		ChevronDown,
		Shirt,
		Monitor,
		House as HomeIcon,
		Sparkles,
		Zap,
		BookOpen,
		Flame,
		TicketPercent
	} from '@lucide/svelte';
	import { cart } from '$lib/components/cart/cart.svelte';

	// Reactive state using Svelte 5 runes
	let mobileMenuOpen = $state(false);
	let searchQuery = $state('');
	let categoriesOpen = $state(false);
	let userMenuOpen = $state(false);
	let mobileSearchOpen = $state(false);

	// Mock data - replace with your actual data
	let cartCount = $state(3);
	let wishlistCount = $state(5);
	let isLoggedIn = $state(false);

	const categories = [
		{
			name: 'Fashion',
			icon: Shirt,
			href: '/categories/fashion'
		},
		{
			name: 'Electronics',
			icon: Monitor,
			href: '/categories/electronics'
		},
		{
			name: 'Home',
			icon: HomeIcon,
			href: '/categories/home'
		},
		{
			name: 'Beauty',
			icon: Sparkles,
			href: '/categories/beauty'
		},
		{
			name: 'Sports',
			icon: Zap,
			href: '/categories/sports'
		},
		{
			name: 'Books',
			icon: BookOpen,
			href: '/categories/books'
		}
	];

	const collections = [
		{ name: 'New Arrivals', href: '/collections/new-arrivals' },
		{ name: 'Best Sellers', href: '/collections/best-sellers' },
		{ name: 'Sale', href: '/collections/sale', icon: TicketPercent },
		{ name: 'Trending', href: '/collections/trending', icon: Flame },
		{ name: 'Featured', href: '/collections/featured' },
		{ name: 'Clearance', href: '/collections/clearance' }
	];

	function handleSearch(e: Event) {
		e.preventDefault();
		if (searchQuery.trim()) {
			console.log('Searching for:', searchQuery);
		}
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
		mobileSearchOpen = false;
		document.body.style.overflow = '';
	}

	function toggleMobileSearch() {
		mobileSearchOpen = !mobileSearchOpen;
	}

	// Close dropdowns when clicking outside
	$effect(() => {
		function handleClickOutside(event: MouseEvent) {
			const target = event.target as HTMLElement;
			if (!target.closest('.categories-dropdown') && !target.closest('.categories-button')) {
				categoriesOpen = false;
			}
			if (!target.closest('.user-menu-dropdown') && !target.closest('.user-menu-button')) {
				userMenuOpen = false;
			}
		}

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<header class="sticky top-0 z-50 bg-white border-b border-b-gray-200">
	<div class="relative">
		<div class="px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between pt-2 lg:pt-3 pb-1">
				<!-- Left Side: Logo, Categories, Search -->
				<div class="flex items-center gap-2 lg:gap-4 flex-1">
					<!-- Mobile Menu Button -->
					<button
						onclick={toggleMobileMenu}
						class="lg:hidden p-2 -ml-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
						aria-label="Toggle menu"
					>
						{#if mobileMenuOpen}
							<X class="w-6 h-6" />
						{:else}
							<Menu class="w-6 h-6" />
						{/if}
					</button>

					<!-- Logo -->
					<a href="/" class="flex items-center gap-2 shrink-0">
						<div
							class="w-8 h-8 lg:w-10 lg:h-10 bg-black rounded-full flex items-center justify-center"
						>
							<span class="text-white font-bold text-sm lg:text-base leading-tight">R</span>
						</div>
						<span class="text-xl lg:text-2xl font-bold text-gray-900 hidden sm:block">Radius</span>
					</a>

					<!-- Categories Button (Desktop) -->
					<div class="relative hidden lg:block">
						<button
							onclick={() => (categoriesOpen = !categoriesOpen)}
							class="categories-button flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
						>
							<Menu class="w-4 h-4" />
							<span class="font-medium">Categories</span>
							<ChevronDown
								class="w-4 h-4 transition-transform {categoriesOpen ? 'rotate-180' : ''}"
							/>
						</button>

						<!-- Categories Dropdown -->
						{#if categoriesOpen}
							<div
								class="categories-dropdown absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl py-2 z-50"
							>
								{#each categories as category (category)}
									<a
										href={category.href}
										class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
									>
										<category.icon class="w-5 h-5" />
										<span>{category.name}</span>
									</a>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Search Bar (Desktop) -->
					<form onsubmit={handleSearch} class="hidden lg:flex flex-1 mx-4">
						<div class="relative w-full">
							<input
								type="text"
								bind:value={searchQuery}
								placeholder="Search for products, brands and more..."
								class="w-full px-4 py-2.5 pl-11 bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
							/>
							<Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
						</div>
					</form>

					<!-- Mobile Search Button -->
					<button
						onclick={toggleMobileSearch}
						class="lg:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
						aria-label="Search"
					>
						<Search class="w-5 h-5" />
					</button>
				</div>

				<!-- Right Side: Wishlist, Cart, User -->
				<div class="flex items-center gap-1 lg:gap-3">
					<!-- Wishlist -->
					<a
						href="/wishlist"
						class="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
						aria-label="Wishlist"
					>
						<Heart class="w-5 h-5" />
						{#if wishlistCount > 0}
							<span
								class="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex place-content-center"
							>
								{wishlistCount}
							</span>
						{/if}
					</a>

					<!-- Cart -->
					<button
						class="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
						aria-label="Cart"
						onclick={() => {
							cart.toggle();
						}}
					>
						<ShoppingCart class="w-5 h-5" />
						{#if cartCount > 0}
							<span
								class="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 bg-black text-white text-xs font-bold rounded-full w-4 h-4 flex place-content-center"
							>
								{cartCount}
							</span>
						{/if}
					</button>

					<!-- User Auth (Desktop) -->
					<div class="relative hidden lg:block">
						{#if isLoggedIn}
							<button
								onclick={() => (userMenuOpen = !userMenuOpen)}
								class="user-menu-button flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
							>
								<div
									class="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm leading-tight"
								>
									JD
								</div>
								<span class="font-medium">John</span>
								<ChevronDown
									class="w-4 h-4 transition-transform {categoriesOpen ? 'rotate-180' : ''}"
								/>
							</button>

							<!-- User Menu Dropdown -->
							{#if userMenuOpen}
								<div
									class="user-menu-dropdown absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl py-2 z-50"
								>
									<a
										href="/account"
										class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
									>
										My Account
									</a>
									<a
										href="/orders"
										class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
									>
										Orders
									</a>
									<a
										href="/wishlist"
										class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
									>
										Wishlist
									</a>
									<hr class="my-2 border-gray-100" />
									<button
										class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
									>
										Logout
									</button>
								</div>
							{/if}
						{:else}
							<a
								href="/login"
								class="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-full transition-colors font-semibold"
							>
								<span>Login</span>
							</a>
						{/if}
					</div>

					<!-- Mobile User Button -->
					<button
						class="lg:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
						aria-label="User menu"
					>
						<User class="w-5 h-5" />
					</button>
				</div>
			</div>

			<!-- Mobile Search Bar -->
			{#if mobileSearchOpen}
				<div class="lg:hidden pb-4 animate-slideDown">
					<form onsubmit={handleSearch}>
						<div class="relative">
							<input
								type="text"
								bind:value={searchQuery}
								placeholder="Search for products..."
								class="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
							/>
							<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
						</div>
					</form>
				</div>
			{/if}
		</div>
	</div>

	<!-- Second Row: Collections -->
	<div class="px-4 sm:px-6 lg:px-8">
		<div class="flex place-content-center gap-1 overflow-x-auto scrollbar-hide py-1">
			{#each collections as collection}
				<a
					href={collection.href}
					class="flex items-center gap-1.5 px-3 lg:px-4 py-2 text-gray-700 border border-transparent hover:text-gray-900 hover:bg-gray-50 hover:border-gray-100 rounded-full transition-colors whitespace-nowrap shrink-0"
				>
					{#if collection.icon}
						<collection.icon class="w-4.5 h-4.5" stroke-width="2"></collection.icon>
					{/if}
					<span class="text-sm lg:text-[0.9rem] font-semibold">{collection.name}</span>
				</a>
			{/each}
		</div>
	</div>

	<!-- Mobile Menu Drawer -->
	{#if mobileMenuOpen}
		<div class="fixed inset-0 z-50 lg:hidden">
			<!-- Backdrop -->
			<div
				class="fixed inset-0 bg-[#00000065] bg-opacity-50 animate-fadeIn"
				onclick={closeMobileMenu}
				role="presentation"
				onkeypress={(e) => {
					if (e.key === 'Esc') {
						closeMobileMenu();
					}
				}}
			></div>

			<!-- Drawer -->
			<div class="fixed inset-y-0 left-0 w-full max-w-sm bg-white animate-slideInLeft">
				<div class="flex flex-col h-full">
					<!-- Header -->
					<div class="flex items-center justify-between px-4 py-4">
						<span class="text-xl font-bold text-gray-900">Menu</span>
						<button
							onclick={closeMobileMenu}
							class="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
							aria-label="Close menu"
						>
							<X class="w-6 h-6" />
						</button>
					</div>

					<!-- Content -->
					<div class="flex-1 overflow-y-auto">
						<!-- Categories -->
						<div class="px-4 py-4">
							<h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
								Categories
							</h3>
							<div class="space-y-1">
								{#each categories as category}
									<a
										href={category.href}
										class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
										onclick={closeMobileMenu}
									>
										<category.icon class="w-5 h-5" />
										<span>{category.name}</span>
									</a>
								{/each}
							</div>
						</div>

						<!-- Collections -->
						<div class="px-4 py-4">
							<h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
								Collections
							</h3>
							<div class="space-y-1">
								{#each collections as collection}
									<a
										href={collection.href}
										class="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
										onclick={closeMobileMenu}
									>
										{collection.name}
									</a>
								{/each}
							</div>
						</div>

						<!-- User Actions -->
						<div class="px-4 py-4">
							{#if isLoggedIn}
								<a
									href="/account"
									class="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
									onclick={closeMobileMenu}
								>
									My Account
								</a>
								<a
									href="/orders"
									class="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
									onclick={closeMobileMenu}
								>
									Orders
								</a>
								<button
									class="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
								>
									Logout
								</button>
							{:else}
								<a
									href="/auth/login"
									class="block px-3 py-2 bg-black text-white hover:bg-gray-800 rounded-full transition-colors font-medium text-center"
									onclick={closeMobileMenu}
								>
									Login
								</a>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>

<style>
	/* Custom animations */
	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideInLeft {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-slideDown {
		animation: slideDown 0.2s ease-out;
	}

	.animate-slideInLeft {
		animation: slideInLeft 0.3s ease-out;
	}

	.animate-fadeIn {
		animation: fadeIn 0.2s ease-out;
	}

	/* Hide scrollbar for collections row */
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
