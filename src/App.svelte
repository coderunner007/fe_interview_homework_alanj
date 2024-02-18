<script lang="ts">
	import Timeline from './lib/Timeline.svelte';
	import LinkSidebar from './lib/LinkSidebar.svelte';
	import { onMount } from 'svelte';

	onMount(function exitLoadingScreen() {
		document.body.setAttribute('data-loaded', 'true');
	});
</script>

<main class="h-screen font-sans">
	<LinkSidebar />
	<Timeline />
</main>
