<script lang="ts">
	import { legacyStatePreparation } from './helpers/loaders';
	import { onMount } from 'svelte';
	import Tellraw from './components/Tellraw.svelte';

	onMount(() => {
		// load legacy!
		// this includes ALL localStorage key transformations
		// and should happen first
		legacyStatePreparation()

		// Increment load count
		localStorage.setItem("loadCount", (1 + parseInt(localStorage.getItem("loadCount") || "0")).toString())

		// Set initial load
		if (localStorage.getItem("initialTimestamp") === null) {
			localStorage.setItem("initialTimestamp", new Date().getTime().toString());
		}

		if (localStorage.getItem("donateStatus") === null) {
			localStorage.setItem("donateStatus", "unprompted");
		}
	})

</script>

<Tellraw />
