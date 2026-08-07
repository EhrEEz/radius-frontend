<script lang="ts">
  import { getProfileContext } from '$lib/profile/profile.context.svelte';
  import { Button } from '$lib/components/ui/Button';
  import { Star, MessageSquareQuote, PenLine, Trash2, ShoppingBag } from '@lucide/svelte';

  // ✅ Synchronous context initialization (Svelte 5 requirement)
  const ctx = getProfileContext();

  function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this review?')) {
      // In a real app, this would call an API and then update the context
      // For now, we can add a removeReview method to the context if needed
      console.log('Deleting review:', id);
    }
  }
</script>

<div class="space-y-8">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-semibold text-gray-900 font-serif tracking-tight">My Reviews</h1>
    <p class="mt-1 text-sm text-gray-500">See what you've shared with the community.</p>
  </div>

  <!-- Empty State -->
  {#if ctx.reviews.length === 0}
    <div class="bg-white p-16 rounded-lg border border-dashed border-gray-300 text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
        <MessageSquareQuote class="w-8 h-8 text-gray-300" />
      </div>
      <p class="text-base font-medium text-gray-900 mb-1">No reviews yet</p>
      <p class="text-sm text-gray-500 mb-6">Share your thoughts on products you've purchased.</p>
      <Button variant="outline">
        <ShoppingBag class="w-4 h-4 mr-2" />
        View Orders
      </Button>
    </div>

  <!-- Reviews List -->
  {:else}
    <div class="space-y-4">
      {#each ctx.reviews as review (review.id)}
        <!-- Review Card (Zero Shadows, relying on borders) -->
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">

          <!-- Card Header: Product Info & Rating -->
          <div class="p-6 border-b border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row gap-4">
            <!-- Product Image -->
            <a
              href="/products/{review.productSlug}"
              class="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50"
            >
              <img src={review.productImage} alt={review.productName} class="h-full w-full object-cover" />
            </a>

            <!-- Product Details & Stars -->
            <div class="flex flex-1 flex-col justify-center">
              <a
                href="/products/{review.productSlug}"
                class="text-base font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-1"
              >
                {review.productName}
              </a>

              <!-- Star Rating Display -->
              <div class="flex items-center gap-2 mt-1.5">
                <div class="flex items-center">
                  {#each Array.from({ length: 5 }, (_, i) => i < review.rating) as filled}
                    <Star
                      class="w-4 h-4 {filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}"
                    />
                  {/each}
                </div>
                <span class="text-xs text-gray-500">
                  Reviewed on {review.date}
                </span>
              </div>
            </div>
          </div>

          <!-- Card Body: Comment & Actions -->
          <div class="p-6">
            <!-- The Review Text -->
            <p class="text-sm text-gray-700 leading-relaxed">
              "{review.comment}"
            </p>

            <!-- Action Buttons -->
            <div class="flex gap-4 mt-5 pt-4 border-t border-gray-100">
              <button
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <PenLine class="w-3.5 h-3.5" />
                PenLine Review
              </button>
              <button
                onclick={() => handleDelete(review.id)}
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 class="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
