<!-- src/routes/(auth)/login/+page.svelte -->
<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Logo } from '$lib/components/ui/Logo';
	import { Input, Label } from '$lib/components/ui/Input';
	import { Button } from '$lib/components/ui/Button'; // Adjust path if needed
	import { Slider, Slide } from '$lib/components/ui/AuthSlider';
	import { enhance } from '$app/forms';

	let email = $state('');
	let password = $state('');
</script>

<div
	class="flex lg:min-h-200 w-full md:max-w-2xl lg:max-w-7xl overflow-hidden rounded-2xl bg-white ring-1 ring-gray-900/5"
	in:fly={{ duration: 500, y: -20 }}
>
	<!-- Left Side - Slider (Hidden on mobile) -->
	<div class="hidden lg:block bg-gray-200 relative m-3 rounded-xl overflow-hidden min-w-1/2">
		<div class="absolute left-8 top-12 z-20">
			<Logo color="white" />
		</div>
		<Slider loop={false}>
			<Slide>
				<div class="flex h-full flex-col justify-end py-24 px-16 bg-amber-950">
					<span
						class="mb-4 inline-block w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
					>
						Welcome Back
					</span>
					<p class="mb-4 text-lg font-medium leading-relaxed text-white">
						"Streamline your workflow and boost your productivity with our all-in-one platform."
					</p>
					<div class="mt-2">
						<p class="font-semibold text-white">Jane Doe</p>
						<p class="text-sm text-white/80">Product Manager</p>
					</div>
				</div>
			</Slide>
			<Slide>
				<div class="flex h-full flex-col justify-end py-24 px-16 bg-blue-950">
					<span
						class="mb-4 inline-block w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
					>
						Welcome Back
					</span>
					<p class="mb-4 text-lg font-medium leading-relaxed text-white">
						"Streamline your workflow and boost your productivity with our all-in-one platform."
					</p>
					<div class="mt-2">
						<p class="font-semibold text-white">Jane Doe</p>
						<p class="text-sm text-white/80">Product Manager</p>
					</div>
				</div>
			</Slide>

			<Slide>
				<div class="flex h-full flex-col justify-end py-24 px-16 bg-green-950">
					<span
						class="mb-4 inline-block w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
					>
						Seamless Integration
					</span>
					<p class="mb-4 text-lg font-medium leading-relaxed text-white">
						"Connect all your favorite tools and manage everything from a single, unified
						dashboard."
					</p>
					<div class="mt-2">
						<p class="font-semibold text-white">John Smith</p>
						<p class="text-sm text-white/80">Lead Developer</p>
					</div>
				</div>
			</Slide>
		</Slider>
	</div>

	<!-- Right Side - Login Form -->
	<div class="flex flex-col grow justify-center py-12 px-8 lg:py-24 md:px-12 xl:px-16 w-full min-w-1/2">
		<!-- Heading -->
		<h1 class="mb-2 text-4xl font-semibold tracking-tight text-gray-900 font-serif">Sign in</h1>
		<p class="mb-6 lg:mb-10 text-gray-600">Welcome back! Please enter your details.</p>

		<!-- Social Login Buttons -->
		<div class="space-y-3 lg:space-y-4">
			<Button
				variant="secondary"
				size="lg"
				class="w-full justify-center font-medium border-gray-200"
			>
				<svg class="mr-3 h-5 w-5" viewBox="0 0 24 24">
					<path
						fill="#4285F4"
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
					/>
					<path
						fill="#34A853"
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
					/>
					<path
						fill="#FBBC05"
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
					/>
					<path
						fill="#EA4335"
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
					/>
				</svg>
				Sign in with Google
			</Button>

			<Button
				variant="secondary"
				size="lg"
				class="w-full justify-center font-medium border-gray-200"
			>
				<svg class="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
					<path
						d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
					/>
				</svg>
				Sign in with Facebook
			</Button>
		</div>

		<!-- Divider -->
		<div class="my-6 lg:my-10 flex items-center">
			<div class="flex-1 border-t border-gray-200"></div>
			<span class="px-4 text-sm text-gray-500">or continue with email</span>
			<div class="flex-1 border-t border-gray-200"></div>
		</div>

		<!-- Email/Password Form -->
		<form method="POST" use:enhance class="space-y-4">
			<div>
				<Input id="email" name="email" type="email" placeholder=" " bind:value={email} required>
					<Label for="email">Email *</Label>
				</Input>
			</div>

			<div>
				<Input
					id="password"
					name="password"
					type="password"
					placeholder=" "
					bind:value={password}
					required
				>
					<Label for="password">Password *</Label>
				</Input>
			</div>

			<div class="flex items-center justify-between">
				<label class="flex items-center">
					<input
						type="checkbox"
						class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
					/>
					<span class="ml-2 text-sm text-gray-600">Remember me</span>
				</label>
				<a
					href="/forgot-password"
					class="text-sm font-medium text-primary-500 transition-colors hover:text-primary-600 hover:underline"
				>
					Forgot password?
				</a>
			</div>

			<Button type="submit" size="full">Sign in</Button>
		</form>

		<!-- Sign Up Link -->
		<p class="mt-6 text-center text-sm text-gray-600">
			Don't have an account?
			<a
				href="/signup"
				class="font-medium text-primary-500 transition-colors hover:text-primary-600 hover:underline"
			>
				Sign up
			</a>
		</p>
	</div>
</div>
