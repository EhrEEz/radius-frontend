<script lang="ts">
	import type { PageData } from './$types';
	import {
		BadgeCheck,
		CalendarDays,
		Clock,
		Fingerprint,
		Globe,
		Laptop,
		Mail,
		MailWarning,
		User
	} from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	const user = data.user;
	const session = data.currentSession;

	// Fallback avatar initials when the user has no profile image
	let initials = $derived.by(() => {
		const source = user.name?.trim() || user.email.split('@')[0] || '?';
		const parts = source.split(/[\s._-]+/).filter(Boolean);
		return (parts.length > 1
			? parts[0][0] + parts[parts.length - 1][0]
			: source.slice(0, 2)
		).toUpperCase();
	});

	function formatDate(value: Date | string | null | undefined) {
		if (!value) return '—';
		return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value));
	}

	function formatDateTime(value: Date | string | null | undefined) {
		if (!value) return '—';
		return new Intl.DateTimeFormat('en-US', {
			dateStyle: 'medium',
			timeStyle: 'short'
		}).format(new Date(value));
	}

	// Light-touch user agent summarizer (e.g. "Chrome on Windows")
	function summarizeUserAgent(ua: string | null | undefined) {
		if (!ua) return 'Unknown device';
		const browser = /edg\//i.test(ua)
			? 'Edge'
			: /opr\//i.test(ua)
				? 'Opera'
				: /firefox/i.test(ua)
					? 'Firefox'
					: /chrome|crios/i.test(ua)
						? 'Chrome'
						: /safari/i.test(ua)
							? 'Safari'
							: 'Browser';
		const os = /windows/i.test(ua)
			? 'Windows'
			: /mac os x/i.test(ua)
				? 'macOS'
				: /android/i.test(ua)
					? 'Android'
					: /iphone|ipad/i.test(ua)
						? 'iOS'
						: /linux/i.test(ua)
							? 'Linux'
							: 'unknown OS';
		return `${browser} on ${os}`;
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="flex justify-between items-end">
		<div>
			<h1 class="text-3xl font-semibold text-gray-900 font-serif tracking-tight">My Profile</h1>
			<p class="mt-1 text-sm text-gray-500">Your account information at a glance.</p>
		</div>

		<!-- Remove this badge once real auth data flows in -->
		<span
			class="rounded-full border border-dashed border-gray-300 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500"
		>
			Preview — mock data
		</span>
	</div>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		<!-- Identity Card -->
		<div class="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-8 text-center">
			{#if user.image}
				<img
					src={user.image}
					alt={user.name ?? 'Profile photo'}
					class="h-24 w-24 rounded-full border border-gray-200 object-cover"
				/>
			{:else}
				<div
					class="flex h-24 w-24 items-center justify-center rounded-full bg-gray-900 font-serif text-3xl text-white"
				>
					{initials}
				</div>
			{/if}

			<h2 class="mt-4 font-serif text-xl font-semibold text-gray-900">
				{user.name || 'Unnamed user'}
			</h2>
			<p class="mt-0.5 text-sm text-gray-500">{user.email}</p>

			{#if user.emailVerified}
				<span
					class="mt-4 inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
				>
					<BadgeCheck class="h-3.5 w-3.5" />
					Email verified
				</span>
			{:else}
				<span
					class="mt-4 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
				>
					<MailWarning class="h-3.5 w-3.5" />
					Email not verified
				</span>
			{/if}

			<p class="mt-6 text-xs text-gray-400">Member since {formatDate(user.createdAt)}</p>
		</div>

		<!-- Details Column -->
		<div class="space-y-6 lg:col-span-2">
			<!-- Account Details -->
			<section class="rounded-lg border border-gray-200 bg-white">
				<header class="border-b border-gray-200 px-6 py-4">
					<h3 class="font-serif font-medium text-gray-900">Account details</h3>
				</header>

				<dl class="divide-y divide-gray-100 text-sm">
					<div class="flex items-center justify-between gap-4 px-6 py-3.5">
						<dt class="flex items-center gap-2 text-gray-500">
							<User class="h-4 w-4 text-gray-400" />
							Full name
						</dt>
						<dd class="font-medium text-gray-900">{user.name || '—'}</dd>
					</div>

					<div class="flex items-center justify-between gap-4 px-6 py-3.5">
						<dt class="flex items-center gap-2 text-gray-500">
							<Mail class="h-4 w-4 text-gray-400" />
							Email address
						</dt>
						<dd class="font-medium text-gray-900">{user.email}</dd>
					</div>

					<div class="flex items-center justify-between gap-4 px-6 py-3.5">
						<dt class="flex items-center gap-2 text-gray-500">
							<CalendarDays class="h-4 w-4 text-gray-400" />
							Member since
						</dt>
						<dd class="font-medium text-gray-900">{formatDate(user.createdAt)}</dd>
					</div>

					<div class="flex items-center justify-between gap-4 px-6 py-3.5">
						<dt class="flex items-center gap-2 text-gray-500">
							<Fingerprint class="h-4 w-4 text-gray-400" />
							User ID
						</dt>
						<dd class="max-w-[16rem] truncate font-mono text-xs text-gray-500" title={user.id}>
							{user.id}
						</dd>
					</div>
				</dl>
			</section>

			<!-- Current Session -->
			<section class="rounded-lg border border-gray-200 bg-white">
				<header class="border-b border-gray-200 px-6 py-4">
					<h3 class="font-serif font-medium text-gray-900">Current session</h3>
				</header>

				<dl class="divide-y divide-gray-100 text-sm">
					<div class="flex items-center justify-between gap-4 px-6 py-3.5">
						<dt class="flex items-center gap-2 text-gray-500">
							<Laptop class="h-4 w-4 text-gray-400" />
							Device
						</dt>
						<dd class="font-medium text-gray-900">{summarizeUserAgent(session.userAgent)}</dd>
					</div>

					<div class="flex items-center justify-between gap-4 px-6 py-3.5">
						<dt class="flex items-center gap-2 text-gray-500">
							<Globe class="h-4 w-4 text-gray-400" />
							IP address
						</dt>
						<dd class="font-medium text-gray-900">{session.ipAddress || '—'}</dd>
					</div>

					<div class="flex items-center justify-between gap-4 px-6 py-3.5">
						<dt class="flex items-center gap-2 text-gray-500">
							<Clock class="h-4 w-4 text-gray-400" />
							Session expires
						</dt>
						<dd class="font-medium text-gray-900">{formatDateTime(session.expiresAt)}</dd>
					</div>
				</dl>
			</section>
		</div>
	</div>
</div>
