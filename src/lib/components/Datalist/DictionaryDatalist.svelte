<script lang="ts">
	import { run } from 'svelte/legacy';

	import { version } from '../../persistence/stores';
	import Datalist from './Datalist.svelte';


	interface Props {
		fileIdentifier: string;
		versioned?: boolean;
		newFileContents: ((fileContents: { [key: string]: string }) => void) | undefined;
		mergeContents?: { [key: string]: string };
	}

	let {
		fileIdentifier,
		versioned = false,
		newFileContents,
		mergeContents = {}
	}: Props = $props();

	let url = $derived(versioned
		? `datafiles/${$version}/${fileIdentifier}.json`
		: `datafiles/${fileIdentifier}.json`);
	let responsePromise = $derived(fetch(url));
	let jsonPromise = $derived(responsePromise.then((res) => (res.ok ? res.json() : {})));
	let listPromise = $derived(jsonPromise.then((json) => [
		...Object.keys(json),
		...Object.keys(mergeContents)
	]));

	$effect(() => {
		jsonPromise.then((json) => {
			if (newFileContents) {
				newFileContents({
					...json,
					...mergeContents
				});
			}
		});
	});
</script>

<Datalist {fileIdentifier} values={listPromise} />
