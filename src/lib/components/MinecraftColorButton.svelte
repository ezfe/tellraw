<script lang="ts">
	import type { Color } from '../classes/Color';
	import { getCSSHEX } from '../classes/Color';
	import { highContrastColor } from '../helpers/high_contrast';
	import CheckCircle from './generic/Icons/CheckCircle.svelte';

	interface Props {
		checked: boolean;
		color: Color;
		onClick: (color: Color) => void;
	}

	let { checked, color, onClick }: Props = $props();
</script>

<div
	class="d-flex justify-content-center align-items-center color-button"
	style={`background-color: ${getCSSHEX(color)}`}
	onclick={() => {
		onClick(color);
	}}
>
	{#if checked}
		<CheckCircle style={`color: ${highContrastColor(getCSSHEX(color), 'white', 'black')}`} />
	{/if}
</div>

<style>
	.color-button {
		width: calc(1.5em + 0.75rem + 2px);
		height: calc(1.5em + 0.75rem + 2px);
	}
</style>
