<script context="module">
	export const ssr = false;
</script>

<script lang="ts">
	import { legacyStatePreparation } from '$lib/helpers/loaders';
	import { onMount } from 'svelte';
	import Tellraw from '$lib/components/Tellraw.svelte';

	onMount(() => {
		const storageKey = 'performed-www-redirect';
		if (location.href.includes('//minecraftjson.com') && sessionStorage.getItem(storageKey) !== 'yes') {
			sessionStorage.setItem(storageKey, 'yes');
			location.href = 'https://www.minecraftjson.com';
			return;
		}

		// load legacy!
		// this includes ALL localStorage key transformations
		// and should happen first
		legacyStatePreparation();

		// Increment load count
		localStorage.setItem(
			'loadCount',
			(1 + parseInt(localStorage.getItem('loadCount') || '0')).toString()
		);

		// Set initial load
		if (localStorage.getItem('initialTimestamp') === null) {
			localStorage.setItem('initialTimestamp', new Date().getTime().toString());
		}
	});
</script>

<Tellraw />
