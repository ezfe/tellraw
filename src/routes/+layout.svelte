<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import '../app.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>Tellraw Generator for Minecraft</title>
</svelte:head>

{@render children?.()}
