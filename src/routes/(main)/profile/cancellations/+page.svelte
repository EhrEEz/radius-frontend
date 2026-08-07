<script lang="ts">
  import { getProfileContext, type Cancellation } from '$lib/profile/profile.context.svelte';
  import { Package, Clock, CheckCircle, AlertCircle, XCircle } from '@lucide/svelte';

  // ✅ Synchronous context initialization (Svelte 5 requirement)
  const ctx = getProfileContext();

  // Helper to map status to Tailwind badge styles
  function getStatusStyles(status: Cancellation['status']) {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
      case 'Approved':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
      case 'Refunded':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'Rejected':
        return 'bg-red-50 text-red-700 ring-red-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  }

  // Helper to map status to Lucide icons
  function getStatusIcon(status: Cancellation['status']) {
    switch (status) {
      case 'Pending': return Clock;
      case 'Approved': return CheckCircle;
      case 'Refunded': return CheckCircle;
      case 'Rejected': return AlertCircle;
      default: return XCircle;
    }
  }
</script>

<div class="space-y-8">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-semibold text-gray-900 font-serif tracking-tight">Order Cancellations</h1>
    <p class="mt-1 text-sm text-gray-500">Track the status of your cancelled orders and refunds.</p>
  </div>

  <!-- Empty State -->
  {#if ctx.cancellations.length === 0}
    <div class="bg-white p-12 rounded-lg border border-dashed border-gray-300 text-center">
      <Package class="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <p class="text-base font-medium text-gray-900 mb-1">No cancellations found</p>
      <p class="text-sm text-gray-500">You haven't cancelled any orders yet.</p>
    </div>

  <!-- Cancellations List -->
  {:else}
    <div class="space-y-4">
      {#each ctx.cancellations as cancellation (cancellation.id)}
        <!-- Dynamic Icon Component -->
        {@const StatusIcon = getStatusIcon(cancellation.status)}

        <div class="bg-white rounded-lg border border-gray-200">

          <!-- Card Header: Order Info & Status -->
          <div class="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-gray-100 rounded-md">
                <Package class="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p class="text-sm font-bold text-gray-900">Order {cancellation.orderId}</p>
                <p class="text-xs text-gray-500">Cancelled on {cancellation.date}</p>
              </div>
            </div>

            <!-- Status Badge -->
            <span class="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset {getStatusStyles(cancellation.status)}">
              <StatusIcon class="w-3.5 h-3.5" />
              {cancellation.status}
            </span>
          </div>

          <!-- Card Body: Details & Items -->
          <div class="px-6 py-5">
            <!-- Reason -->
            <div class="mb-4">
              <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Reason for Cancellation</p>
              <p class="text-sm text-gray-700">{cancellation.reason}</p>
            </div>

            <!-- Items List -->
            <div class="border-t border-gray-100 pt-4">
              <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Cancelled Items</p>
              <ul class="space-y-2">
                {#each cancellation.items as item}
                  <li class="flex justify-between text-sm">
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">{item.quantity}x</span> {item.name}
                    </span>
                    <span class="font-medium text-gray-900 tabular-nums">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                {/each}
              </ul>
            </div>

            <!-- Refund Total -->
            <div class="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
              <span class="text-sm font-semibold text-gray-600">Total Refund Amount</span>
              <span class="text-lg font-bold text-gray-900 font-serif tabular-nums">
                ₱{cancellation.refundAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
