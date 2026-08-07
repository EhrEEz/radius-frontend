<script lang="ts">
  import { getProfileContext } from '$lib/profile/profile.context.svelte';
  import { Button } from '$lib/components/ui/Button';
  import { Input, Label } from '$lib/components/ui/Input';
  import { User, Bell, Lock, Save } from '@lucide/svelte';

  // ✅ Synchronous context initialization
  const ctx = getProfileContext();

  // Local state for Profile Form
  let profileForm = $state({
    name: ctx.user?.name || '',
    email: ctx.user?.email || ''
  });

  // Local state for Password Form
  let passwordForm = $state({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  function handleProfileUpdate(e: Event) {
    e.preventDefault();
    // Update the context (and eventually the API)
    ctx.updateUser({ name: profileForm.name, email: profileForm.email });
    alert('Profile updated successfully!');
  }

  function handlePasswordUpdate(e: Event) {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // API call would go here
    passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
    alert('Password updated successfully!');
  }

  function togglePreference(key: keyof typeof ctx.preferences) {
    ctx.updatePreferences({ [key]: !ctx.preferences[key] });
  }
</script>

<div class="space-y-8">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-semibold text-gray-900 font-serif tracking-tight">Account Settings</h1>
    <p class="mt-1 text-sm text-gray-500">Manage your profile information and notification preferences.</p>
  </div>

  <!-- Section 1: Profile Information -->
  <section class="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
      <User class="w-5 h-5 text-gray-600" />
      <h2 class="text-xs font-semibold uppercase tracking-wider text-gray-500">Profile Information</h2>
    </div>

    <form onsubmit={handleProfileUpdate} class="p-6 space-y-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input type="text" id="name" bind:value={profileForm.name} placeholder=" " required>
          <Label for="name">Full Name</Label>
        </Input>
        <Input type="email" id="email" bind:value={profileForm.email} placeholder=" " required>
          <Label for="email">Email Address</Label>
        </Input>
      </div>

      <div class="flex justify-end pt-2">
        <Button type="submit">
          <Save class="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </form>
  </section>

  <!-- Section 2: Notification Preferences -->
  <section class="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
      <Bell class="w-5 h-5 text-gray-600" />
      <h2 class="text-xs font-semibold uppercase tracking-wider text-gray-500">Notification Preferences</h2>
    </div>

    <div class="divide-y divide-gray-100">
      <!-- Newsletter Toggle -->
      <div class="px-6 py-5 flex items-center justify-between gap-4">
        <div>
          <p class="text-sm font-semibold text-gray-900">Email Newsletter</p>
          <p class="text-xs text-gray-500 mt-0.5">Receive weekly updates about new products and features.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={ctx.preferences.newsletter}
          onclick={() => togglePreference('newsletter')}
          class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary {ctx.preferences.newsletter ? 'bg-primary' : 'bg-gray-200'}"
        >
          <span
            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white border border-gray-200 transition duration-200 ease-in-out {ctx.preferences.newsletter ? 'translate-x-5' : 'translate-x-0'}"
          ><span class="sr-only">{ctx.preferences.newsletter}</span></span>
        </button>
      </div>

      <!-- Promotions Toggle -->
      <div class="px-6 py-5 flex items-center justify-between gap-4">
        <div>
          <p class="text-sm font-semibold text-gray-900">Promotional Offers</p>
          <p class="text-xs text-gray-500 mt-0.5">Get notified about special discounts and seasonal sales.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={ctx.preferences.promotions}
          onclick={() => togglePreference('promotions')}
          class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary {ctx.preferences.promotions ? 'bg-primary' : 'bg-gray-200'}"
        >
          <span
            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white border border-gray-200 transition duration-200 ease-in-out {ctx.preferences.promotions ? 'translate-x-5' : 'translate-x-0'}"
          ><span class="sr-only">{ctx.preferences.promotions}</span></span>
        </button>
      </div>

      <!-- SMS Toggle -->
      <div class="px-6 py-5 flex items-center justify-between gap-4">
        <div>
          <p class="text-sm font-semibold text-gray-900">SMS Notifications</p>
          <p class="text-xs text-gray-500 mt-0.5">Receive text messages for order updates and delivery alerts.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={ctx.preferences.smsNotifications}
          onclick={() => togglePreference('smsNotifications')}
          class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary {ctx.preferences.smsNotifications ? 'bg-primary' : 'bg-gray-200'}"
        >
          <span
            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white border border-gray-200 transition duration-200 ease-in-out {ctx.preferences.smsNotifications ? 'translate-x-5' : 'translate-x-0'}"
          ><span class="sr-only">{ctx.preferences.smsNotifications}</span></span>
        </button>
      </div>
    </div>
  </section>

  <!-- Section 3: Change Password -->
  <section class="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
      <Lock class="w-5 h-5 text-gray-600" />
      <h2 class="text-xs font-semibold uppercase tracking-wider text-gray-500">Change Password</h2>
    </div>

    <form onsubmit={handlePasswordUpdate} class="p-6 space-y-5">
      <Input type="password" id="currentPassword" bind:value={passwordForm.currentPassword} placeholder=" " required>
        <Label for="currentPassword">Current Password</Label>
      </Input>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input type="password" id="newPassword" bind:value={passwordForm.newPassword} placeholder=" " required>
          <Label for="newPassword">New Password</Label>
        </Input>
        <Input type="password" id="confirmPassword" bind:value={passwordForm.confirmPassword} placeholder=" " required>
          <Label for="confirmPassword">Confirm New Password</Label>
        </Input>
      </div>

      <div class="flex justify-end pt-2">
        <Button type="submit" variant="outline">
          Update Password
        </Button>
      </div>
    </form>
  </section>
</div>
