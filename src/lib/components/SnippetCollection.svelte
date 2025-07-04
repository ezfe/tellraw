<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { Button, Row } from '@sveltestrap/sveltestrap';
	import type { Snippet } from '../classes/Snippets/SnippetTypes/Snippet';
	import { CommandType } from '../data/templates';
	import { duplicate_snippet } from '../helpers/duplicate_snippet';
	import { loadCurrentVersionState } from '../helpers/loaders';
	import type { TranslationSet } from '../helpers/translation_processor';
	import AddSnippetDropdown from './buttons/AddSnippetDropdown.svelte';
	import TimesCircle from './generic/Icons/TimesCircle.svelte';
	import InlineSnippetController from './SnippetControllers/InlineSnippetController.svelte';
	import SnippetDetailController from './SnippetControllers/SnippetDetailController.svelte';

	let editing: Snippet | null = $state(null);

	interface Props {
		hideExteriorWrapper?: boolean;
		commandType?: CommandType;
		colorManaging?: boolean;
		snippets?: Snippet[];
		translationSet?: TranslationSet;
		updateSnippets?: (newValue: Snippet[]) => void;
		deleteAll?: () => void;
	}

	let {
		hideExteriorWrapper = $bindable(false),
		commandType = $bindable(CommandType.tellraw),
		colorManaging = $bindable(false),
		snippets = $bindable([]),
		translationSet = {},
		updateSnippets = () => {},
		deleteAll = () => {}
	}: Props = $props();

	/**
	 * Add a new snippet to the list.
	 *
	 * - If `option` is pressed, the snippet is added immediately
	 * - If `option` is not pressed, the snippet is not saved, but
	 *   starts being edited. It is added when the edit form is completed.
	 * @param snippet
	 */
	function addSnippet(snippet: Snippet, fast: boolean) {
		if (fast) {
			updateSnippets([...snippets, snippet]);
		} else {
			startEditing(snippet);
		}
	}

	/**
	 * Start editing a specific snippet
	 * @param snippet The snippet to edit
	 */
	function startEditing(snippet: Snippet) {
		hideExteriorWrapper = true;
		editing = snippet;
	}

	/**
	 * Stop editing the current snippet.
	 * @param save Whether to save or discard the current edits
	 */
	function stopEditing(save: boolean) {
		if (save && editing !== null) {
			updateSnippet(editing);
		}

		hideExteriorWrapper = false;
		editing = null;
	}

	/**
	 * Save a new copy of a snippet. The snippet can be
	 * new, or could already exist.
	 *
	 * - New snippets are appended to the end of the set
	 * - Existing snippets are replaced
	 *
	 * @param newSnippet The snippet to insert or replace
	 */
	function updateSnippet(newSnippet: Snippet) {
		console.log('Updating', newSnippet);
		let isNewSnippet = true;
		let updatedSnippets = snippets.map((currentSnippet) => {
			if (currentSnippet.id === newSnippet.id) {
				isNewSnippet = false;
				return newSnippet;
			} else {
				return currentSnippet;
			}
		});

		if (isNewSnippet) {
			updatedSnippets = [...snippets, newSnippet];
		}

		updateSnippets(updatedSnippets);
	}

	/**
	 * Remove a snippet and call `updateSnippets` to
	 * save the new snippet set.
	 * @param snippet The snippet to delete
	 */
	function removeSnippet(snippet: Snippet) {
		updateSnippets(snippets.filter((cs) => cs.id !== snippet.id));
	}

	/**
	 * Duplicate a snippet and call `updateSnippets` to
	 * save the new snippet set.
	 * @param snippet The snippet to duplicate
	 */
	function duplicateSnippet(snippet: Snippet) {
		let now = [...snippets];
		let newSnippet = duplicate_snippet(snippet);
		newSnippet.id = crypto.randomUUID();

		let i = now.indexOf(snippet);
		now.splice(i, 0, newSnippet);

		updateSnippets(now);
	}

	function handleDndConsider(event: any) {
		console.log('Considering event', event);
		snippets = loadCurrentVersionState(event.detail.items, false);
	}

	function handleDndFinalize(event: any) {
		console.log('Finalizing event', event);
		// snippets =
		snippets = loadCurrentVersionState(event.detail.items, false);
		updateSnippets(snippets);
	}
</script>

{#if editing}
	<SnippetDetailController
		{commandType}
		bind:snippet={editing}
		{stopEditing}
		{translationSet}
		bind:colorManaging
	/>
{:else}
	<section
		use:dndzone={{ items: snippets, flipDurationMs: 300 }}
		onconsider={handleDndConsider}
		onfinalize={handleDndFinalize}
	>
		{#each snippets as snippet (snippet.id)}
			<div animate:flip={{ duration: 300 }}>
				<InlineSnippetController
					{snippet}
					{startEditing}
					{updateSnippet}
					{removeSnippet}
					{duplicateSnippet}
					{commandType}
					bind:colorManaging
				/>
			</div>
		{/each}
	</section>

	<Row>
		<div class="col-sm-4 col-md-3 offset-sm-2 mb-2 mb-sm-0">
			<AddSnippetDropdown {addSnippet} {commandType} />
		</div>
		<div class="col-sm-4 col-md-3">
			<Button block color="danger" on:click={deleteAll}>
				<TimesCircle />
				Delete All
			</Button>
		</div>
	</Row>
{/if}
