<!-- src/lib/components/pdp/RelatedSearchCard.svelte -->
<script lang="ts">
	let {
		title,
		imageUrl,
		href = '#'
	}: {
		title: string;
		imageUrl: string;
		href?: string;
	} = $props();
</script>

<a
	href={href}
	class="flex items-center gap-4 p-3 border border-neutral-200 rounded-xl hover:border-neutral-400 hover:shadow-sm transition-all bg-white group"
>
	<div class="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
		<img
			src={imageUrl}
			alt={title}
			class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
		/>
	</div>
	<span class="text-sm font-medium text-neutral-900 leading-snug">
		{title}
	</span>
</a>
