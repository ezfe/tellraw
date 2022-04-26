<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
	import '../app.css';
	import { browser } from '$app/env';
	if (browser) {
		setTimeout(() => {
			document.scrollingElement.scrollIntoView();
		}, 100);
	}
</script>

<svelte:head>
	<title>Tellraw Generator for Minecraft</title>
</svelte:head>

<slot />
