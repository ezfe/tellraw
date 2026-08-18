<script lang="ts">
	import { Col, Row } from '@sveltestrap/sveltestrap';
	import { NBTSnippet, NBTType } from '../../classes/Snippets/SnippetTypes/NBTSnippet';
	import type { Snippet } from '../../classes/Snippets/SnippetTypes/Snippet';
	import { FeatureType, isFeatureAvailable } from '../../data/templates';
	import { commandType, version } from '../../persistence/stores';
	import Checkbox from '../generic/Checkbox.svelte';

	interface Props {
		snippet: NBTSnippet;
		updateSnippet: (snippet: Snippet) => void;
	}

	let { snippet, updateSnippet }: Props = $props();

	function updateStringValue(field: 'nbt' | 'storage', target: HTMLInputElement) {
		let newSnippet = snippet.copy();
		newSnippet[field] = target.value;
		updateSnippet(newSnippet);
	}

	function updateBooleanValue(field: 'plain' | 'interpret', value: boolean) {
		let newSnippet = snippet.copy();
		newSnippet[field] = value;
		updateSnippet(newSnippet);
	}

	function changeNBTType(event: any) {
		let newSnippet = snippet.copy();
		newSnippet.type = event.target.value;
		updateSnippet(newSnippet);
	}
</script>

{#if !isFeatureAvailable($commandType, $version, FeatureType.nbtComponent)}
	<Row>
		<Col>
			<p>NBT Components require Minecraft 1.14+</p>
		</Col>
	</Row>
{:else}
	<Row class="mb-2">
		<Col>
			<select class="form-select" value={snippet.type} oninput={changeNBTType}>
				<option
					value={`${NBTType.storage}`}
					disabled={!isFeatureAvailable($commandType, $version, FeatureType.nbtStorageComponent)}
				>
					Storage
					{#if !isFeatureAvailable($commandType, $version, FeatureType.nbtStorageComponent)}
						{' (Requires 1.15+)'}
					{/if}
				</option>
				<option value={`${NBTType.entity}`}>Entity</option>
				<option value={`${NBTType.block}`}>Block</option>
			</select>
		</Col>
		<Col>
			<input
				class="form-control"
				value={snippet.storage}
				placeholder="Identifier"
				onchange={(evt) => {
					updateStringValue('storage', evt.currentTarget);
				}}
			/>
		</Col>
	</Row>
	<Row>
		<Col>
			<input
				class="form-control"
				value={snippet.nbt}
				placeholder="NBT Path"
				oninput={(evt) => {
					updateStringValue('nbt', evt.currentTarget);
				}}
			/>
		</Col>
	</Row>
	<Row>
		<Col>
			<Checkbox
				checked={snippet.interpret}
				change={(newValue) => {
					updateBooleanValue('interpret', newValue);
				}}
			>
				Interpret
			</Checkbox>
			{#if isFeatureAvailable($commandType, $version, FeatureType.nbtPlainAttribute)}
				<Checkbox
					checked={snippet.plain}
					change={(newValue) => {
						updateBooleanValue('plain', newValue);
					}}
				>
					Plain
				</Checkbox>
				<p>Interpret & Plain should not be enabled at the same time.</p>
			{/if}
		</Col>
	</Row>
{/if}
