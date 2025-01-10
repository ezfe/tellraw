<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div>
	{@render children?.()}
</div>

<style>
	div {
		background-color: #f5f5f5;
		color: #333333;
		border: 1px solid #e3e3e3;
		border-radius: 4px;
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);

		/* margin: -20px; */
		padding: 20px;
	}
</style>
