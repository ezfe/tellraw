<script type="typescript">
	import { createEventDispatcher } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	const dispatch = createEventDispatcher();

	export let checked: boolean;

	let randomUUID = uuidv4();

	function onChange(event) {
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
