<script lang="ts">
	export let fileIdentifier: string;
	let valuesPromise: string[] | Promise<string[]>;

	export { valuesPromise as values };
</script>

<datalist id={`datalist-${fileIdentifier}`}>
	{#await valuesPromise then list}
		{#each list as value}
			<option {value} />
		{/each}
	{/await}
</datalist>
