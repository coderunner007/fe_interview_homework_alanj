<script lang="ts">
	import Timeline from './lib/Timeline.svelte';
	import LinkSidebar from './lib/LinkSidebar.svelte';
	import { onMount } from 'svelte';

	onMount(function exitLoadingScreen() {
		document.body.setAttribute('data-loaded', 'true');
	});
</script>

<main class="grid h-screen grid-cols-[50px_1fr]">
	<LinkSidebar />
	<Timeline />
</main>
