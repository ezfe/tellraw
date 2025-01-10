<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	interface Props {
		checked: boolean;
		children?: import('svelte').Snippet;
	}

	let { checked, children }: Props = $props();

	let randomUUID = crypto.randomUUID();

	function onChange(event: any) {
		dispatch('change', event.currentTarget.checked);
	}
</script>

<div class="custom-control custom-checkbox">
	<input
		{checked}
		onchange={onChange}
		type="checkbox"
		class="custom-control-input"
		id={randomUUID}
	/>
	<label class="custom-control-label" for={randomUUID}>{@render children?.()}</label>
</div>
