<script lang="ts">
  import { getProfileContext, type Order } from '$lib/profile/profile.context.svelte';
  import { Button } from '$lib/components/ui/Button';
  import { Package, Clock, Truck, CheckCircle, XCircle, Eye } from '@lucide/svelte';

  // ✅ Synchronous context initialization
  const ctx = getProfileContext();

  // Helper to map status to Tailwind badge styles (No shadows, using rings)
  function getStatusStyles(status: Order['status']) {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
      case 'Shipped':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
      case 'Delivered':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 ring-red-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  }

  // Helper to map status to Lucide icons
  function getStatusIcon(status: Order['status']) {
    switch (status) {
      case 'Processing': return Clock;
      case 'Shipped': return Truck;
      case 'Delivered': return CheckCircle;
      case 'Cancelled': return XCircle;
      default: return Package;
    }
  }
</script>

<div class="space-y-8">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-semibold text-gray-900 font-serif tracking-tight">My Orders</h1>
    <p class="mt-1 text-sm text-gray-500">Track and manage your recent purchases.</p>
  </div>

  <!-- Empty State -->
  {#if ctx.orders.length === 0}
    <div class="bg-white p-16 rounded-lg border border-dashed border-gray-300 text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
        <Package class="w-8 h-8 text-gray-300" />
      </div>
      <p class="text-base font-medium text-gray-900 mb-1">No orders yet</p>
      <p class="text-sm text-gray-500 mb-6">When you place an order, it will appear here.</p>
      <Button variant="outline">
        <Package class="w-4 h-4 mr-2" />
        Start Shopping
      </Button>
    </div>

  <!-- Orders List -->
  {:else}
    <div class="space-y-6">
      {#each ctx.orders as order (order.id)}
        {@const StatusIcon = getStatusIcon(order.status)}

        <!-- Order Card (Zero Shadows, relying on borders and subtle backgrounds) -->
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">

          <!-- Order Header: ID, Date, Status -->
          <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p class="text-sm font-bold text-gray-900">Order {order.id}</p>
              <p class="text-xs text-gray-500 mt-0.5">Placed on {order.date}</p>
            </div>

            <!-- Status Badge -->
            <span class="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset {getStatusStyles(order.status)}">
              <StatusIcon class="w-3.5 h-3.5" />
              {order.status}
            </span>
          </div>

          <!-- Order Items -->
          <div class="divide-y divide-gray-100">
            <p class="px-6 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Order Items
            </p>
            {#each order.items as item (item.id)}
              <div class="px-6 py-4 flex gap-4 items-center">
                <!-- Item Image -->
                <a href="/products/{item.id}" class="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                  <img src={item.image} alt={item.name} class="h-full w-full object-cover" />
                </a>

                <!-- Item Details -->
                <div class="flex flex-1 flex-col min-w-0">
                  <a href="/products/{item.id}" class="text-sm font-medium text-gray-900 hover:text-primary truncate transition-colors">
                    {item.name}
                  </a>
                  <p class="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                </div>

                <!-- Item Price -->
                <p class="text-sm font-semibold text-gray-900 tabular-nums shrink-0">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            {/each}
          </div>

          <!-- Order Footer: Total & Actions -->
          <div class="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <!-- Total -->
            <div class="flex items-baseline gap-2">
              <span class="text-sm font-medium text-gray-600">Total:</span>
              <span class="text-xl font-bold text-gray-900 font-serif tabular-nums">
                ₱{order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex gap-3">
              <Button variant="outline" size="sm">
                <Eye class="w-4 h-4 mr-1.5" />
                View Details
              </Button>
              {#if order.status === 'Delivered'}
                <Button size="sm">
                  Buy Again
                </Button>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
