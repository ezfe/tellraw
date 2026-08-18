<script lang="ts">
	interface Props {
		checked: boolean;
		children?: import('svelte').Snippet;
		change: (newValue: boolean) => void;
	}

	let { checked, children, change }: Props = $props();

	let randomUUID = crypto.randomUUID();
</script>

<div class="custom-control custom-checkbox">
	<input
		{checked}
		onchange={(evt) => {
			change(evt.currentTarget.checked);
		}}
		type="checkbox"
		class="custom-control-input"
		id={randomUUID}
	/>
	<label class="custom-control-label" for={randomUUID}>{@render children?.()}</label>
</div>
