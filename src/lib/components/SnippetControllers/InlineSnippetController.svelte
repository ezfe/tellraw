<script lang="ts">
	import { Col, Row } from '@sveltestrap/sveltestrap';
	import { genericSnippet } from '../../classes/Snippets/SnippetTypes/GenericFieldCompatable';
	import { GroupSnippet } from '../../classes/Snippets/SnippetTypes/GroupSnippet';
	import { LinebreakSnippet } from '../../classes/Snippets/SnippetTypes/LinebreakSnippet';
	import { NBTSnippet } from '../../classes/Snippets/SnippetTypes/NBTSnippet';
	import { PagebreakSnippet } from '../../classes/Snippets/SnippetTypes/PagebreakSnippet';
	import type { Snippet } from '../../classes/Snippets/SnippetTypes/Snippet';
	import { TextSnippet } from '../../classes/Snippets/SnippetTypes/TextSnippet';
	import { TranslateSnippet } from '../../classes/Snippets/SnippetTypes/TranslateSnippet';
	import { CommandType } from '../../data/templates';
	import { duplicate_snippet } from '../../helpers/duplicate_snippet';
	import Clone from '../generic/Icons/Clone.svelte';
	import Edit from '../generic/Icons/Edit.svelte';
	import FileAlt from '../generic/Icons/FileAlt.svelte';
	import TrashAlt from '../generic/Icons/TrashAlt.svelte';
	import SplitDropdown from '../generic/SplitDropdown.svelte';
	import MinecraftColorWell from '../MinecraftColorWell.svelte';
	import SnippetCollection from '../SnippetCollection.svelte';
	import GenericSnippetController from './GenericSnippetController.svelte';
	import NBTSnippetController from './NBTSnippetController.svelte';
	import { version } from '$lib/persistence/stores';
	import { versionAtLeast } from '$lib/helpers/versions';

	type SnippetFn = (snippet: Snippet) => void;
	type OptionalSnippetFn = SnippetFn | undefined;

	interface Props {
		snippet?: Snippet;
		commandType?: CommandType;
		colorManaging?: boolean;
		startEditing?: SnippetFn;
		updateSnippet?: SnippetFn;
		removeSnippet?: SnippetFn;
		duplicateSnippet?: OptionalSnippetFn;
	}

	let {
		snippet = new TextSnippet(),
		commandType = CommandType.tellraw,
		colorManaging = $bindable(false),
		startEditing = () => {},
		updateSnippet = () => {},
		removeSnippet = () => {},
		duplicateSnippet
	}: Props = $props();

	function changeGroupSnippetChildren(snippets: Array<Snippet>) {
		let newSnippet = duplicate_snippet(snippet);
		if (newSnippet instanceof GroupSnippet) {
			newSnippet.children = snippets;
			updateSnippet(newSnippet);
		}
	}

	function actionsFor(snippet: Snippet) {
		const deleteAction = {
			label: 'Delete',
			icon: TrashAlt,
			onClick: () => {
				removeSnippet(snippet);
			}
		};

		const duplicateAction = {
			label: 'Duplicate',
			icon: Clone,
			onClick: () => {
				if (duplicateSnippet) {
					duplicateSnippet(snippet);
				}
			}
		};

		if (duplicateSnippet) {
			return [deleteAction, duplicateAction];
		} else {
			return [deleteAction];
		}
	}

	let editingEnabled = $derived(
		!(snippet instanceof LinebreakSnippet || snippet instanceof PagebreakSnippet)
	);
</script>

<Row class="mb-2">
	<div class="col-4 col-md-3 col-lg-2 d-flex flex-column justify-content-center">
		<SplitDropdown
			color="secondary"
			disabled={!editingEnabled}
			block
			on:click={() => {
				startEditing(snippet);
			}}
			dropdowns={actionsFor(snippet)}
		>
			<Edit />
			Edit
		</SplitDropdown>
	</div>

	<!--
	  Flex justification is for text fields
	  which are used for page and linebreaks
	-->
	<Col class="d-flex flex-column justify-content-center">
		{#if snippet instanceof LinebreakSnippet}
			<span>Line Break ⏎</span>
		{:else if snippet instanceof PagebreakSnippet}
			<span>Page Break <FileAlt /></span>
		{:else if snippet instanceof NBTSnippet}
			<NBTSnippetController {snippet} {updateSnippet} />
		{:else if snippet instanceof TranslateSnippet}
			<span>Translation Snippet ({snippet.translate}) - Click Edit to modify</span>
		{:else if snippet instanceof GroupSnippet}
			<div class="col">
				<SnippetCollection
					{commandType}
					snippets={snippet.children}
					updateSnippets={changeGroupSnippetChildren}
					deleteAll={() => {
						changeGroupSnippetChildren([]);
					}}
					bind:colorManaging
				/>
			</div>
		{:else if genericSnippet(snippet)}
			<!-- Generic Snippet will be nil if it's not a generic snippet -->
			<!-- by if-ing first, can assure it's not null -->
			<GenericSnippetController snippet={genericSnippet(snippet)} {updateSnippet} />
		{:else}
			<span>{typeof snippet} isn't implemented :(S</span>
		{/if}
	</Col>

	{#if !(snippet instanceof GroupSnippet)}
		<div class="col-1">
			<MinecraftColorWell color={snippet.color} />
		</div>
	{/if}
</Row>
