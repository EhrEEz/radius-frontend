<!-- src/routes/(auth)/verify-email/+page.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/Button';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import {OTPInput} from '$lib/components/ui/OTPInput';
	import { ShieldCheck } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	let otpCode = $state('');
	let email = 'user@example.com'; // This would come from session or URL params
	let isLoading = $state(false);

	// Auto-focus the input on mount
	let inputRef = $state<HTMLInputElement | undefined>();

	onMount(() => {
		inputRef?.focus();
	});

	function handleResend() {
		// Implement resend logic
		console.log('Resending verification code to:', email);
	}
</script>

<div class="w-full max-w-lg" in:fly={{ duration: 400, y: -20 }}>
		<!-- Card Container -->
		<div class="overflow-hidden rounded-2xl bg-white px-8 py-14 ring-1 ring-gray-900/5">

			<!-- Heading -->
			<h1 class="mb-2 text-center text-3xl font-semibold tracking-tight text-gray-900 font-serif">
				Verify your email
			</h1>
			<p class="mb-8 text-center text-gray-600">
				We've sent a verification code to
				<span class="font-medium text-gray-900">{email}</span>
			</p>

			<!-- OTP Form -->
			<form method="POST" use:enhance class="space-y-6">
				<div>
					<OTPInput length={6} bind:value={otpCode}/>
					<p class="mt-2 text-center text-sm text-gray-500">
						Enter the 6-digit code sent to your email
					</p>
				</div>

				<Button type="submit" size="full" disabled={isLoading || otpCode.length !== 6}>
					{#if isLoading}
						<svg
							class="mr-2 h-5 w-5 animate-spin"
							fill="none"
							viewBox="0 0 24 24"
						>
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
						Verifying...
					{:else}
						Verify Email
					{/if}
				</Button>
			</form>

			<!-- Resend Code -->
			<div class="mt-6 text-center">
				<p class="text-sm text-gray-600">
					Didn't receive the code?
					<button
						type="button"
						onclick={handleResend}
						class="ml-1 font-medium text-primary-500 transition-colors hover:text-primary-600 hover:underline"
					>
						Resend
					</button>
				</p>
				<p class="mt-1 text-xs text-gray-500">
					Code expires in 10 minutes
				</p>
			</div>

			<!-- Back to Login -->
			<div class="mt-6 text-center">
				<a
					href="/login"
					class="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 hover:underline"
				>
				 Back to sign in
				</a>
			</div>
		</div>

		<!-- Security Note -->
		<div class="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
			<ShieldCheck class="h-4 w-4"/>
			<span>Your information is secure and encrypted</span>
		</div>
	</div>
