<!-- src/routes/(auth)/reset-password/+page.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/Button';
	import { Input } from '$lib/components/ui/Input';
	import Label from '$lib/components/ui/Input/Label.svelte';
	import { Eye, EyeOff, ArrowLeft, ShieldCheck, CircleCheck } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	let newPassword = $state('');
	let confirmPassword = $state('');
	let isLoading = $state(false);
	let isSuccess = $state(false);

	let showNewPassword = $state(false);
	let showConfirmPassword = $state(false);

	// Derived validation state
	const passwordsMatch = $derived(newPassword === confirmPassword && newPassword.length >= 8);
	const isFormValid = $derived(passwordsMatch && newPassword.length > 0);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!isFormValid) return;

		isLoading = true;

		// Simulate API call to reset password
		await new Promise((resolve) => setTimeout(resolve, 1500));

		isLoading = false;
		isSuccess = true;
	}
</script>

<div class="flex min-h-dvh items-center justify-center p-4" in:fly={{ duration: 400, y: -20 }}>
	<div class="w-full max-w-lg">
		{#if isSuccess}
			<!-- Success State -->
			<div
				class="overflow-hidden rounded-2xl bg-white px-8 py-14 ring-1 ring-gray-900/5 text-center"
			>
				<div
					class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
				>
					<CircleCheck class="h-8 w-8 text-green-600" />
				</div>

				<h1 class="mb-2 text-3xl font-semibold tracking-tight text-gray-900 font-serif">
					Password reset successful
				</h1>
				<p class="mb-8 text-gray-600">
					Your password has been updated. You can now log in with your new credentials.
				</p>

				<a href="/login">
					<Button size="full">Back to sign in</Button>
				</a>
			</div>
		{:else}
			<!-- Form State -->
			<div class="overflow-hidden rounded-2xl bg-white px-8 py-14 ring-1 ring-gray-900/5">
				<!-- Heading -->
				<h1 class="mb-2 text-center text-3xl font-semibold tracking-tight text-gray-900 font-serif">
					Set new password
				</h1>
				<p class="mb-8 text-center text-gray-600">
					Your new password must be different from previously used passwords.
				</p>

				<!-- Form -->
				<form onsubmit={handleSubmit} class="space-y-5">
					<!-- New Password -->
					<div class="relative">
						<Input
							id="newPassword"
							name="newPassword"
							type={showNewPassword ? 'text' : 'password'}
							placeholder=" "
							bind:value={newPassword}
							required
							minlength={8}
						>
							<Label for="newPassword">New Password *</Label>
						</Input>
						<button
							type="button"
							onclick={() => (showNewPassword = !showNewPassword)}
							class="absolute right-3 top-5 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
							aria-label={showNewPassword ? 'Hide password' : 'Show password'}
						>
							{#if showNewPassword}
								<EyeOff class="h-5 w-5" />
							{:else}
								<Eye class="h-5 w-5" />
							{/if}
						</button>
					</div>

					<!-- Confirm Password -->
					<div class="relative">
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type={showConfirmPassword ? 'text' : 'password'}
							placeholder=" "
							bind:value={confirmPassword}
							required
						>
							<Label for="confirmPassword">Confirm Password *</Label>
						</Input>
						<button
							type="button"
							onclick={() => (showConfirmPassword = !showConfirmPassword)}
							class="absolute right-3 top-5 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
							aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
						>
							{#if showConfirmPassword}
								<EyeOff class="h-5 w-5" />
							{:else}
								<Eye class="h-5 w-5" />
							{/if}
						</button>

						<!-- Validation Message -->
						{#if confirmPassword.length > 0 && !passwordsMatch}
							<p class="mt-1.5 text-xs text-red-500">Passwords do not match</p>
						{/if}
					</div>

					<Button type="submit" size="full" disabled={isLoading || !isFormValid} class="mt-2">
						{#if isLoading}
							<svg class="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								/>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							Resetting...
						{:else}
							Reset password
						{/if}
					</Button>
				</form>

				<!-- Back to Login -->
				<div class="mt-8 text-center">
					<a
						href="/login"
						class="inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 hover:underline"
					>
						<ArrowLeft class="mr-2 h-4 w-4" />
						Back to sign in
					</a>
				</div>
			</div>
		{/if}

		<!-- Security Note -->
		<div class="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
			<ShieldCheck class="h-4 w-4" />

			<span>Your information is secure and encrypted</span>
		</div>
	</div>
</div>
