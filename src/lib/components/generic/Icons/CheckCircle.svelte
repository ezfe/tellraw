<script lang="ts">
	import { faCheckCircle as icon } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
	import IconContainer from './IconContainer.svelte';

	interface Props {
		style?: string;
	}

	let { style = '' }: Props = $props();
</script>

<IconContainer {icon} {style} />
