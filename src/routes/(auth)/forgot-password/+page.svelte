<!-- src/routes/(auth)/forgot-password/+page.svelte -->
<script lang="ts">
	import { Input } from '$lib/components/ui/Input';
	import { Button } from '$lib/components/ui/Button';
	import Label from '$lib/components/ui/Input/Label.svelte';
	import { CircleCheck, ShieldCheck } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	let email = $state('');
	let isLoading = $state(false);
	let isSuccess = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isLoading = true;

		// Simulate API call to send reset link
		await new Promise((resolve) => setTimeout(resolve, 1500));

		isLoading = false;
		isSuccess = true;
	}
</script>

<div class="w-full max-w-lg" in:fly={{ duration: 500, y: -20 }}>
	{#if isSuccess}
		<!-- Success State -->
		<div class="overflow-hidden rounded-2xl bg-white px-8 py-14 ring-1 ring-gray-900/5 text-center">
			<div
				class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
			>
				<CircleCheck class="h-8 w-8 text-green-600" />
			</div>

			<h1 class="mb-2 text-3xl font-semibold tracking-tight text-gray-900 font-serif">
				Check your email
			</h1>
			<p class="mb-8 text-gray-600">
				We've sent a password reset link to<br />
				<span class="font-medium text-gray-900">{email}</span>
			</p>

			<div class="space-y-4">
				<Button variant="outline" size="full" onclick={() => (isSuccess = false)}>
					Didn't receive it? Try another email
				</Button>

				<a
					href="/login"
					class="mt-4 inline-flex items-center justify-center text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 hover:underline"
				>
					Back to sign in
				</a>
			</div>
		</div>
	{:else}
		<!-- Form State -->
		<div class="overflow-hidden rounded-2xl bg-white px-8 py-14 ring-1 ring-gray-900/5">
			<!-- Heading -->
			<h1 class="mb-2 text-center text-3xl font-semibold tracking-tight text-gray-900 font-serif">
				Forgot password?
			</h1>
			<p class="mb-8 text-center text-gray-600">No worries, we'll send you reset instructions.</p>

			<!-- Form -->
			<form onsubmit={handleSubmit} class="space-y-6">
					<Input id="email" name="email" type="email" placeholder=" " bind:value={email} required>
						<Label for="email">Email *</Label>
					</Input>

				<Button type="submit" size="full" disabled={isLoading || !email}>
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
						Sending...
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
