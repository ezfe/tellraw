<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { CommandType, template_lookup } from '../data/templates';
	import { command, commandType } from '../persistence/stores';
	import CheckCircle from './generic/Icons/CheckCircle.svelte';
	import SplitDropdown from './generic/SplitDropdown.svelte';

	interface SelectableState {
		type: CommandType;
		name: string;
		isSelected: boolean;
		isLast: boolean;
	}

	const selectableStates: SelectableState[] = [
		{
			type: CommandType.tellraw,
			name: 'Basic Tellraw',
			isSelected: false,
			isLast: false
		},
		{
			type: CommandType.overlay,
			name: 'Screen Overlay',
			isSelected: false,
			isLast: false
		},
		{
			type: CommandType.sign,
			name: 'Sign',
			isSelected: false,
			isLast: false
		},
		{
			type: CommandType.book,
			name: 'Book',
			isSelected: false,
			isLast: false
		}
	];

	function makeSelection(type: CommandType, template?: string) {
		commandType.set(type);
		command.set(template || template_lookup(type)[0]);
	}

	$: mapped = selectableStates.map((typeInfo, index) => {
		return {
			...typeInfo,
			isSelected: typeInfo.type === $commandType,
			isLast: index >= selectableStates.length - 1
		};
	});
</script>

<div class="row">
	{#each mapped as typeInfo, index (typeInfo)}
		<div class={`col-12 col-sm-5 col-md-4 col-lg-3 ${typeInfo.isLast ? 'mb-4' : 'mb-2'}`}>
			<SplitDropdown
				block
				color={typeInfo.isSelected ? 'success' : 'light'}
				on:click={() => {
					makeSelection(typeInfo.type);
				}}
				dropdowns={template_lookup(typeInfo.type).map((template) => {
					return {
						label: template,
						onClick: () => {
							makeSelection(typeInfo.type, template);
						}
					};
				})}
			>
				{#if typeInfo.isSelected}
					<CheckCircle />
				{/if}
				{typeInfo.name}
			</SplitDropdown>
		</div>
	{/each}
</div>
