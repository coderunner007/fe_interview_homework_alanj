<script lang="ts">
	import type { Task } from './stores';

	export let tasks: Array<Task>;
</script>

{#each tasks as task (task.id)}
	<div>{task.id}, {task.name}</div>
{/each}
