<script lang="ts">
  import { getProfileContext, type Return } from '$lib/profile/profile.context.svelte';
  import { Button } from '$lib/components/ui/Button';
  import { RotateCcw, Package, Clock, CheckCircle, CheckCheck, XCircle } from '@lucide/svelte';

  // ✅ Synchronous context initialization (Svelte 5 requirement)
  const ctx = getProfileContext();

  // Helper to map status to Tailwind badge styles (No shadows, using rings)
  function getStatusStyles(status: Return['status']) {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
      case 'Approved':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
      case 'Completed':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'Rejected':
        return 'bg-red-50 text-red-700 ring-red-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  }

  // Helper to map status to Lucide icons
  function getStatusIcon(status: Return['status']) {
    switch (status) {
      case 'Pending': return Clock;
      case 'Approved': return CheckCircle;
      case 'Completed': return CheckCheck;
      case 'Rejected': return XCircle;
      default: return Package;
    }
  }
</script>

<div class="space-y-8">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-semibold text-gray-900 font-serif tracking-tight">Returns & Refunds</h1>
    <p class="mt-1 text-sm text-gray-500">Track the status of your returned items and refunds.</p>
  </div>

  <!-- Empty State -->
  {#if ctx.returns.length === 0}
    <div class="bg-white p-16 rounded-lg border border-dashed border-gray-300 text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
        <RotateCcw class="w-8 h-8 text-gray-300" />
      </div>
      <p class="text-base font-medium text-gray-900 mb-1">No returns found</p>
      <p class="text-sm text-gray-500 mb-6">You haven't requested any returns yet.</p>
      <Button variant="outline">
        <Package class="w-4 h-4 mr-2" />
        View Orders
      </Button>
    </div>

  <!-- Returns List -->
  {:else}
    <div class="space-y-4">
      {#each ctx.returns as returnReq (returnReq.id)}
        {@const StatusIcon = getStatusIcon(returnReq.status)}

        <!-- Return Card (Zero Shadows, relying on borders and subtle backgrounds) -->
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">

          <!-- Card Header: Return Info & Status -->
          <div class="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-gray-100 rounded-md">
                <RotateCcw class="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p class="text-sm font-bold text-gray-900">Return #{returnReq.id}</p>
                <p class="text-xs text-gray-500">For Order {returnReq.orderId} · Requested {returnReq.date}</p>
              </div>
            </div>

            <!-- Status Badge -->
            <span class="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset {getStatusStyles(returnReq.status)}">
              <StatusIcon class="w-3.5 h-3.5" />
              {returnReq.status}
            </span>
          </div>

          <!-- Card Body: Details & Items -->
          <div class="px-6 py-5">
            <!-- Reason -->
            <div class="mb-4">
              <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Reason for Return</p>
              <p class="text-sm text-gray-700">{returnReq.reason}</p>
            </div>

            <!-- Items List -->
            <div class="border-t border-gray-100 pt-4">
              <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Returned Items</p>
              <ul class="space-y-2">
                {#each returnReq.items as item}
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

            <!-- Footer: Refund Total & Actions -->
            <div class="border-t border-gray-100 mt-4 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <!-- Refund Amount -->
              <div class="flex items-baseline gap-2">
                <span class="text-sm font-semibold text-gray-600">Refund Amount:</span>
                <span class="text-xl font-bold text-gray-900 font-serif tabular-nums">
                  ₱{returnReq.refundAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

              <!-- Action Button (Conditional based on status) -->
              <div class="flex gap-3">
                {#if returnReq.status === 'Approved'}
                  <Button variant="outline" size="sm">
                    <Package class="w-4 h-4 mr-1.5" />
                    Track Return Shipment
                  </Button>
                {:else if returnReq.status === 'Completed'}
                  <Button variant="outline" size="sm">
                    View Refund Details
                  </Button>
                {/if}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
