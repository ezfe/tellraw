<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let checked: boolean;

	let randomUUID = crypto.randomUUID();

	function onChange(event: any) {
		dispatch('change', event.currentTarget.checked);
	}
</script>

<div class="custom-control custom-checkbox">
	<input
		{checked}
		on:change={onChange}
		type="checkbox"
		class="custom-control-input"
		id={randomUUID}
	/>
	<label class="custom-control-label" for={randomUUID}><slot /></label>
</div>
