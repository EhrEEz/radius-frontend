<script lang="ts">
  import { page } from '$app/state';
  import { setProfileContext } from '$lib/profile/profile.context.svelte';

  // Lucide icons for a premium feel
  import {
    User, MapPin, Package, Heart, Star, RotateCcw, Ban, Settings, LogOut, Menu, X
  } from '@lucide/svelte';

  let { data, children } = $props();

  const user = $derived(data.user);
  const addresses = $derived(data.addresses);

  // Initialize the reactive context
  const ctx = setProfileContext(user, addresses || []);


  // Mobile menu state
  let isMobileMenuOpen = $state(false);

  // Navigation configuration
  const navItems = [
    { href: '/profile', label: 'Overview', icon: User },
    { href: '/profile/orders', label: 'Orders', icon: Package },
    { href: '/profile/addresses', label: 'Addresses', icon: MapPin },
    { href: '/profile/favorites', label: 'Favorites', icon: Heart },
    { href: '/profile/reviews', label: 'Reviews', icon: Star },
    { href: '/profile/returns', label: 'Returns', icon: RotateCcw },
    { href: '/profile/cancellations', label: 'Cancellations', icon: Ban },
    { href: '/profile/settings', label: 'Settings', icon: Settings }
  ];

  // Robust active state checking
  function isActive(href: string) {
    if (href === '/profile') {
      return page.url.pathname === '/profile' || page.url.pathname === '/profile/';
    }
    return page.url.pathname.startsWith(href);
  }
</script>

<div>
  <!-- Mobile Header -->
  <header class="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center sticky top-0 z-40">
    <div class="flex items-center gap-3">
      <button
        onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
        class="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
      >
        {#if isMobileMenuOpen}
          <X class="w-5 h-5" />
        {:else}
          <Menu class="w-5 h-5" />
        {/if}
      </button>
      <h1 class="text-lg font-bold text-gray-900 font-serif tracking-tight">My Account</h1>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-sm font-medium text-gray-700">{ctx.user?.name}</span>
    </div>
  </header>

  <div class="flex">
    <!-- Sidebar Navigation -->
    <aside class="
      fixed inset-y-0 left-0 z-30 w-72 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-auto
      {isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
    ">
      <div class="flex flex-col h-full">
        <!-- Desktop User Info -->
        <div class="p-6 border-b border-gray-100 hidden lg:block">
          <h2 class="text-2xl font-bold text-gray-900 font-serif tracking-tight">     {ctx.user?.name}
</h2>
          <p class="text-sm text-gray-500 truncate">{ctx.user?.email}</p>
        </div>

        <!-- Mobile User Info (inside drawer) -->
        <div class="p-6 border-b border-gray-100 lg:hidden">
          <h2 class="text-lg font-bold text-gray-900 font-serif">{ctx.user?.name}</h2>
          <p class="text-sm text-gray-500">{ctx.user?.email}</p>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 overflow-y-auto p-4 space-y-1">
          {#each navItems as item}
            <a
              href={item.href}
              class={["flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",isActive(item.href)
                ? 'bg-primary/5 text-primary ring-1 ring-inset ring-primary/10'
                : 'text-gray-600 hover:bg-white hover:text-gray-900']}
              onclick={() => isMobileMenuOpen = false}
            >
              <!-- Svelte 5 dynamic component syntax -->
              <item.icon class="w-4 h-4" />
              {item.label}
            </a>
          {/each}
        </nav>

        <!-- Logout Section -->
        <div class="p-4 border-t border-gray-100">
          <form method="POST" action="/logout" class="w-full">
            <button
              type="submit"
              class="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut class="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </aside>

    <!-- Mobile Overlay Backdrop -->
    {#if isMobileMenuOpen}
      <button
        class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-20 lg:hidden"
        onclick={() => isMobileMenuOpen = false}
      >
        <span class="sr-only">Close Overlay</span>
      </button>
    {/if}

    <!-- Main Content Area -->
    <main class="flex-1 p-4 lg:p-8 min-h-[calc(100vh-65px)] lg:min-h-screen">
      {@render children()}
    </main>
  </div>
</div>
