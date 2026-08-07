<!-- src/routes/profile/addresses/+page.svelte -->
<script lang="ts">
  import { getProfileContext, type Address } from '$lib/profile/profile.context.svelte';
  import { Button } from '$lib/components/ui/Button';
  import { Input, Label } from '$lib/components/ui/Input';
  import { Plus } from '@lucide/svelte';

  const ctx = getProfileContext();

  let showModal = $state(false);
  let editingAddress = $state<Address | undefined>(undefined);

  let form = $state({
    label: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  function resetForm() {
    form = { label: '', fullName: '', phone: '', address: '', city: '', notes: '' };
  }

  function openAddModal() {
    editingAddress = undefined;
    resetForm();
    showModal = true;
  }

  function openEditModal(addr: Address) {
    editingAddress = addr;
    form = {
      label: addr.label,
      fullName: addr.fullName,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      notes: addr.notes || ""
    };
    showModal = true;
  }

  function handleSubmit(e: Event) {
    e.preventDefault();

    if (editingAddress) {
      ctx.updateAddress(editingAddress.id, form);
    } else {
      ctx.addAddress(form);
    }
    showModal = false;
    resetForm();
  }

  function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this address?')) {
      ctx.deleteAddress(id);
    }
  }
</script>

<div class="space-y-8">
  <!-- Header -->
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-semibold text-gray-900 font-serif">Addresses</h1>
    <Button onclick={openAddModal}>
      <div class="flex items-center gap-2">
        <Plus class="w-4 h-4" />
        Add New Address
      </div>
    </Button>
  </div>

  <!-- Empty State -->
  {#if ctx.addresses.length === 0}
    <div class="bg-white p-12 rounded-lg border border-dashed border-gray-300 text-center">
      <p class="text-base font-medium text-gray-500 mb-4">You don't have any saved addresses yet.</p>
      <Button onclick={openAddModal}>Add your first address</Button>
    </div>

  <!-- Address Grid -->
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each ctx.addresses as addr (addr.id)}
        <!-- Reusing the exact card styling from your Checkout flow -->
        <div class="w-full text-left p-5 rounded-lg border bg-white transition-all group relative {addr.isDefault ? 'border-primary ring-1 ring-primary' : 'border-gray-200  hover:border-primary/20 hover:bg-white/90'}">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold uppercase tracking-wider {addr.isDefault ? 'text-primary' : 'text-gray-500'}">
              {addr.label}
            </span>
            {#if addr.isDefault}
              <span class="text-[10px] font-bold text-primary bg-primary-100 px-2 py-0.5 rounded-full">
                DEFAULT
              </span>
            {/if}
          </div>

          <p class="text-sm font-semibold text-gray-900">{addr.fullName}</p>
          <p class="text-sm text-gray-600 mt-1">{addr.address}</p>
          <p class="text-sm text-gray-600">{addr.city}</p>

          <p class="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            {addr.phone}
          </p>

          {#if addr.notes}
            <p class="text-xs text-gray-500 mt-2 italic">"{addr.notes}"</p>
          {/if}

          <div class="flex gap-4 mt-4 pt-3 border-t border-gray-100 text-xs font-medium">
            {#if !addr.isDefault}
              <button onclick={() => ctx.setDefaultAddress(addr.id)} class="text-primary hover:underline">Set as Default</button>
            {/if}
            <button onclick={() => openEditModal(addr)} class="text-gray-600 hover:text-gray-900 hover:underline">Edit</button>
            <button onclick={() => handleDelete(addr.id)} class="text-red-600 hover:text-red-800 hover:underline">Delete</button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- Modal Overlay for Add/Edit -->
{#if showModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
    <form onsubmit={handleSubmit} class="bg-white p-8 rounded-lg border border-gray-200 max-w-lg w-full space-y-6 shadow-xl">
      <h3 class="text-lg font-semibold text-gray-900 font-serif">
        {editingAddress ? 'Edit' : 'Add New'} Address
      </h3>

      <div class="grid gap-4">
        <!-- Passing Label as a child to Input utilizes the relative wrapper perfectly -->
        <Input type="text" id="label" bind:value={form.label} placeholder=" " required>
          <Label for="label">Label (e.g. Home, Office) *</Label>
        </Input>

        <Input type="text" id="fullName" bind:value={form.fullName} placeholder=" " required>
          <Label for="fullName">Full Name *</Label>
        </Input>

        <Input type="tel" id="phone" bind:value={form.phone} placeholder=" " required>
          <Label for="phone">Phone Number *</Label>
        </Input>

        <Input type="text" id="address" bind:value={form.address} placeholder=" " required>
          <Label for="address">Address *</Label>
        </Input>

        <Input type="text" id="city" bind:value={form.city} placeholder=" " required>
          <Label for="city">City / Municipality *</Label>
        </Input>

        <!-- Textarea using the exact same classes as your Input component for consistency -->
        <div class="relative">
          <textarea
            id="notes"
            bind:value={form.notes}
            rows="3"
            placeholder=" "
            class="peer block rounded-lg w-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm px-3.5 pb-2 pt-6 transition-colors resize-none"
          ></textarea>
          <Label for="notes">Order Notes (Optional)</Label>
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-4">
        <Button variant="outline" type="button" onclick={() => showModal = false}>Cancel</Button>
        <Button type="submit">{editingAddress ? 'Update' : 'Add'} Address</Button>
      </div>
    </form>
  </div>
{/if}
