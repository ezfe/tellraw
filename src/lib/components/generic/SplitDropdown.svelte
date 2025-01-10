<script lang="ts">
	import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import {
		Button,
		ButtonDropdown,
		ButtonGroup,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle
	} from '@sveltestrap/sveltestrap';

	type ButtonColor =
		| 'primary'
		| 'secondary'
		| 'success'
		| 'danger'
		| 'warning'
		| 'info'
		| 'light'
		| 'dark';

	interface DropdownAction {
		label?: string;
		icon?: any;
		iconRight?: IconDefinition;
		onClick?: () => void;
		disabled?: boolean;
	}

	interface Props {
		color: ButtonColor;
		disabled?: boolean;
		block?: boolean;
		dropdowns: DropdownAction[];
		children?: import('svelte').Snippet;
	}

	let {
		color,
		disabled = false,
		block = false,
		dropdowns,
		children
	}: Props = $props();
</script>

<ButtonDropdown class={block ? 'w-100' : ''}>
	<Button {color} {disabled} {block} on:click>
		{@render children?.()}
	</Button>
	<DropdownToggle split {color} />
	<DropdownMenu>
		{#each dropdowns as dropdown}
			<DropdownItem on:click={dropdown.onClick}>
				<dropdown.icon />
				{#if dropdown.label}
					{#if dropdown.icon}
						{' '}
					{/if}
					{dropdown.label}
					{#if dropdown.iconRight}
						{' '}
					{/if}
				{/if}
				<dropdown.iconRight />
			</DropdownItem>
		{/each}
	</DropdownMenu>
</ButtonDropdown>
