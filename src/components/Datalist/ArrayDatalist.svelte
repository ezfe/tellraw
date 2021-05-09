<script lang="ts">
	import { version } from "../../persistence/stores";
	import Datalist from "./Datalist.svelte";

	export let fileIdentifier: string;
	export let versioned: boolean = false;
	export let newFileContents: ((fileContents: string[]) => void) | undefined;

	export let mergeContents: string[] = [];

	$: url = versioned ? `datafiles/${$version}/${fileIdentifier}.json` : `datafiles/${fileIdentifier}.json`;
	$: responsePromise = fetch(url);
	$: jsonPromise = responsePromise.then(res => res.ok ? res.json() : []);
	$: listPromise = jsonPromise.then(json => [
		...json,
		...mergeContents,
	]);

	$: {
		if (newFileContents) {
			jsonPromise.then(json => {
				newFileContents([
					...json,
					...mergeContents
				]);
			});
		}
	}
</script>

<Datalist {fileIdentifier} values={listPromise} />
