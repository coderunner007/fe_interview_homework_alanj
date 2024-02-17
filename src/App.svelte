<script lang="ts">
	import Timeline from './lib/Timeline.svelte';
	import LinkSidebar from './lib/LinkSidebar.svelte';
	import { onMount } from 'svelte';
	import { tasksStore } from './lib/stores';

	tasksStore.subscribe((value) => console.log(value));
	onMount(function exitLoadingScreen() {
		document.body.setAttribute('data-loaded', 'true');
	});
</script>

<main class="h-screen font-sans">
	<LinkSidebar />
	<Timeline />
</main>
