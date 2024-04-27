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

	export let color: ButtonColor;
	export let disabled = false;
	export let block = false;
	export let dropdowns: DropdownAction[];
</script>

<ButtonDropdown class={block ? 'w-100' : ''}>
	<Button {color} {disabled} {block} on:click>
		<slot />
	</Button>
	<DropdownToggle split {color} />
	<DropdownMenu>
		{#each dropdowns as dropdown}
			<DropdownItem on:click={dropdown.onClick}>
				<svelte:component this={dropdown.icon} />
				{#if dropdown.label}
					{#if dropdown.icon}
						{' '}
					{/if}
					{dropdown.label}
					{#if dropdown.iconRight}
						{' '}
					{/if}
				{/if}
				<svelte:component this={dropdown.iconRight} />
			</DropdownItem>
		{/each}
	</DropdownMenu>
</ButtonDropdown>
