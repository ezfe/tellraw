<script lang="ts">
	interface Props {
		fileIdentifier: string;
		values: string[] | Promise<string[]>;
	}

	let { fileIdentifier, values: valuesPromise }: Props = $props();

	
</script>

<datalist id={`datalist-${fileIdentifier}`}>
	{#await valuesPromise then list}
		{#each list as value}
			<option {value}></option>
		{/each}
	{/await}
</datalist>
