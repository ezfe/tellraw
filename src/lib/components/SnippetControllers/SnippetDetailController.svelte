<script lang="ts">
	import { ClickEvent } from '$lib/classes/Snippets/ClickEvent';
	import { HoverEvent } from '$lib/classes/Snippets/HoverEvent';
	import { Button, Col, Row } from '@sveltestrap/sveltestrap';
	import type { Color } from '../../classes/Color';
	import { getCSSHEX, minecraftColorSet } from '../../classes/Color';
	import { genericSnippet } from '../../classes/Snippets/SnippetTypes/GenericFieldCompatable';
	import { GroupSnippet } from '../../classes/Snippets/SnippetTypes/GroupSnippet';
	import { NBTSnippet } from '../../classes/Snippets/SnippetTypes/NBTSnippet';
	import type { Snippet } from '../../classes/Snippets/SnippetTypes/Snippet';
	import { TranslateSnippet } from '../../classes/Snippets/SnippetTypes/TranslateSnippet';
	import { CommandType, FeatureType, isFeatureAvailable } from '../../data/templates';
	import { duplicate_snippet } from '../../helpers/duplicate_snippet';
	import type { TranslationSet } from '../../helpers/translation_processor';
	import { customColors, version } from '../../persistence/stores';
	import Checkbox from '../generic/Checkbox.svelte';
	import MinecraftColorButton from '../MinecraftColorButton.svelte';
	import PreviewContents from '../Previews/PreviewContents.svelte';
	import SnippetCollection from '../SnippetCollection.svelte';
	import GenericSnippetController from './GenericSnippetController.svelte';
	import NbtSnippetController from './NBTSnippetController.svelte';
	import TranslateSnippetController from './TranslateSnippetController.svelte';

	interface Props {
		snippet: Snippet;
		stopEditing: (save: boolean) => void;
		colorManaging: boolean;
		commandType: CommandType;
		translationSet: TranslationSet;
	}

	let {
		snippet = $bindable(),
		stopEditing,
		colorManaging = $bindable(),
		commandType,
		translationSet
	}: Props = $props();

	let nestedEditing = $state(false);


	function changeClickEventType(event: any) {
		updateField('click_event_type', event.target.value);
	}

	function changeClickEventValue(event: any) {
		updateField('click_event_value', event.target.value);
	}

	function changeHoverEventType(event: any) {
		updateField('hover_event_type', event.target.value);
	}

	function changeHoverEventValue(event: any) {
		updateField('hover_event_value', event.target.value);
	}

	function changeHoverEventChildren(snippets: Array<Snippet>) {
		let newSnippet = duplicate_snippet(snippet);
		newSnippet.hover_event_children = snippets;
		snippet = newSnippet;
	}

	function changeInsertion(event: any) {
		updateField('insertion', event.target.value);
	}

	function changeFont(event: any) {
		updateField('font', event.target.value);
	}

	function updateField(field: string, value: any) {
		let newSnippet = duplicate_snippet(snippet);
		newSnippet[field] = value;
		snippet = newSnippet;
	}

	function changeGroupSnippetChildren(snippets: Array<Snippet>) {
		let newSnippet = duplicate_snippet(snippet);
		if (newSnippet instanceof GroupSnippet) {
			newSnippet.children = snippets;
			updateSnippet(newSnippet);
		}
	}

	function updateSnippet(newSnippet: Snippet) {
		// snippet = duplicate_snippet(newSnippet);
		snippet = newSnippet;
	}

	function updateFontCheckbox(newValue: boolean) {
		let newSnippet = duplicate_snippet(snippet);
		if (newValue) {
			newSnippet.font = 'minecraft:default';
		} else {
			newSnippet.font = null;
		}
		snippet = newSnippet;
	}

	function fullColorSet(): Color[] {
		return [...Object.keys(minecraftColorSet), ...$customColors];
	}
	let filteredColorSet = $derived(fullColorSet().filter((color) => {
		return color != 'none';
	}));
	let clickEventTypeIsCommand =
		$derived(snippet.click_event_type == 'run_command' || snippet.click_event_type == 'suggest_command');
</script>

{#if !nestedEditing}
	<!-- Preview -->

	<div class="row mb-2">
		<div class="col">
			<h4>Preview:</h4>
		</div>
	</div>

	<div class="row mb-2">
		<div class="col">
			<p>
				<PreviewContents snippets={[snippet]} bookPage={undefined} {translationSet} />
			</p>
		</div>
	</div>

	<hr />
{/if}

<div class="row">
	<div class="col">
		{#if snippet instanceof NBTSnippet}
			<NbtSnippetController {snippet} {updateSnippet} />
		{:else if snippet instanceof GroupSnippet}
			<SnippetCollection
				{commandType}
				snippets={snippet.children}
				updateSnippets={changeGroupSnippetChildren}
				deleteAll={() => {
					changeGroupSnippetChildren([]);
				}}
				{translationSet}
				bind:colorManaging
			/>
		{:else if snippet instanceof TranslateSnippet}
			<TranslateSnippetController
				{snippet}
				{commandType}
				{updateSnippet}
				{translationSet}
				bind:hideExteriorWrapper={nestedEditing}
			/>
		{:else if genericSnippet(snippet)}
			<GenericSnippetController snippet={genericSnippet(snippet)} {updateSnippet} />
		{:else}
			<span>{typeof snippet} isn't implemented supported renderer</span>
		{/if}
	</div>
</div>
{#if !nestedEditing}
	<hr />
	<div class="row">
		<div class="col">
			<h4>Formatting Options:</h4>
		</div>
	</div>
	<div class="row">
		<div class="col-4">
			<div class="row mb-1">
				<div class="col">
					<span style="font-weight: bold"> Preset Colors: </span>
				</div>
			</div>
			<div class="row mb-2">
				<div class="col d-flex flex-wrap">
					{#each filteredColorSet as color}
						<MinecraftColorButton
							{color}
							checked={snippet.color == color}
							onClick={(newColor) => {
								updateField('color', newColor);
							}}
						/>
					{/each}
				</div>
			</div>
			{#if isFeatureAvailable(commandType, $version, FeatureType.customColor)}
				<div class="row mb-1">
					<div class="col">
						<span style="font-weight: bold;"> Custom Color: </span>
						<input
							type="color"
							value={getCSSHEX(snippet.color)}
							oninput={(evt) => {
								updateField('color', evt.currentTarget.value.toUpperCase());
							}}
						/>
					</div>
				</div>
				<!-- <div class="row mb-1">
          <div class="col">
            <button onClick={() => { props.setColorManaging(true) }}>Color Manager...</button>
          </div>
        </div> -->
			{/if}
			<div class="row mb-2">
				<Col>
					{#if snippet.color != 'none'}
						<Button
							color="secondary"
							on:click={() => {
								updateField('color', 'none');
							}}
						>
							Unset Color
						</Button>
					{:else}
						<p class="mb-0">
							No color is selected, so it will appear the default color in-game, usually white or
							black.
						</p>
					{/if}
				</Col>
			</div>
		</div>
		<div class="col-4">
			<Checkbox checked={snippet.bold} on:change={(event) => updateField('bold', event.detail)}>
				Bold
			</Checkbox>
			<Checkbox checked={snippet.italic} on:change={(event) => updateField('italic', event.detail)}>
				Italic
			</Checkbox>
			<Checkbox
				checked={snippet.underlined}
				on:change={(event) => updateField('underlined', event.detail)}
			>
				Underlined
			</Checkbox>
			<Checkbox
				checked={snippet.strikethrough}
				on:change={(event) => updateField('strikethrough', event.detail)}
			>
				Strikethrough
			</Checkbox>
			<Checkbox
				checked={snippet.obfuscated}
				on:change={(event) => updateField('obfuscated', event.detail)}
			>
				Obfuscated
			</Checkbox>
		</div>
		{#if isFeatureAvailable(commandType, $version, FeatureType.font)}
			<div class="col-4">
				<div class="row">
					<div class="col">
						<Checkbox
							checked={snippet.font !== null}
							on:change={(event) => {
								updateFontCheckbox(event.detail);
							}}
						>
							Custom Font
						</Checkbox>
					</div>
				</div>
				<div class="row">
					<div class="col">
						{#if snippet.font !== null}
							<input type="text" class="form-control" value={snippet.font} oninput={changeFont} />
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
	<hr />

	{#if isFeatureAvailable(commandType, $version, FeatureType.clicking)}
		<div class="row">
			<div class="col">
				<h4>Click Event:</h4>
			</div>
		</div>

		<Row class="mb-2">
			<div class="col-4">
				<select
					class="form-select"
					value={snippet.click_event_type}
					oninput={changeClickEventType}
				>
					<option selected={snippet.click_event_type == 'none'} value={ClickEvent.none}>
						None
					</option>
					<option selected={snippet.click_event_type == 'open_url'} value={ClickEvent.open_url}>
						Open URL
					</option>
					<option
						selected={snippet.click_event_type == 'run_command'}
						value={ClickEvent.run_command}
					>
						Run Command
					</option>
					<option
						selected={snippet.click_event_type == 'suggest_command'}
						value={ClickEvent.suggest_command}
					>
						Suggest Command
					</option>
					{#if isFeatureAvailable(commandType, $version, FeatureType.pages)}
						<option
							selected={snippet.click_event_type == 'change_page'}
							value={ClickEvent.change_page}
						>
							Change Page
						</option>
					{:else}
						<option
							disabled
							selected={snippet.click_event_type == 'change_page'}
							value={ClickEvent.change_page}
						>
							Change Page (Books Only)
						</option>
					{/if}
					<option
						selected={snippet.click_event_type == 'copy_to_clipboard'}
						value={ClickEvent.copy_to_clipboard}
					>
						Copy to Clipboard
					</option>
				</select>
			</div>
			{#if snippet.click_event_type != 'none'}
				<div class="col">
					<div class="row">
						<div class="col">
							<input
								list={clickEventTypeIsCommand ? 'datalist-commands' : null}
								type="text"
								class="form-control"
								value={snippet.click_event_value}
								oninput={changeClickEventValue}
							/>
						</div>
					</div>
					{#if commandType == CommandType.sign}
						<div class="row mt-2">
							<div class="col">
								<div class="alert alert-warning" role="alert">
									If you have more than one text entry for each line in the sign, the click event
									will not be applied. This is due to Minecraft limitations with signs.
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</Row>
		<hr />
	{/if}

	{#if isFeatureAvailable(commandType, $version, FeatureType.hovering)}
		<div class="row">
			<div class="col">
				<h4>Hover Event:</h4>
			</div>
		</div>
		<div class="row mb-2">
			<div class="col-4">
				<select
					class="form-select"
					value={snippet.hover_event_type}
					oninput={changeHoverEventType}
				>
					<option selected={snippet.hover_event_type == 'none'} value={HoverEvent.none}>
						None
					</option>
					<option
						selected={snippet.hover_event_type == 'show_entity'}
						value={HoverEvent.show_entity}
					>
						Show Entity
					</option>
					<option selected={snippet.hover_event_type == 'show_item'} value={HoverEvent.show_item}>
						Show Item
					</option>
					<option selected={snippet.hover_event_type == 'show_text'} value={HoverEvent.show_text}>
						Show Text
					</option>
				</select>
			</div>
			{#if snippet.hover_event_type == 'show_text'}
				<div class="col">
					<div class="row">
						<div class="col inline-snippet-collection">
							<SnippetCollection
								commandType={CommandType.hovertext}
								snippets={snippet.hover_event_children}
								updateSnippets={changeHoverEventChildren}
								deleteAll={() => {
									changeHoverEventChildren([]);
								}}
								{translationSet}
								bind:colorManaging
							/>
						</div>
					</div>
				</div>
			{:else if snippet.hover_event_type != 'none'}
				<div class="col">
					<input
						type="text"
						class="form-control"
						value={snippet.hover_event_value}
						onchange={changeHoverEventValue}
					/>
				</div>
			{/if}
		</div>
		<hr />
	{/if}

	{#if isFeatureAvailable(commandType, $version, FeatureType.insertion)}
		<div class="row">
			<div class="col-4">
				<h4>Insertion:</h4>
			</div>
			<div class="col">
				<input class="form-control" value={snippet.insertion} oninput={changeInsertion} />
			</div>
		</div>
	{/if}

	<!-- Exit Controls -->

	<div class="row mt-5">
		<div class="offset-8 col-2">
			<button
				class="btn btn-secondary w-100"
				onclick={() => {
					stopEditing(false);
				}}
			>
				Cancel
			</button>
		</div>
		<div class="col-2">
			<button
				class="btn btn-primary w-100"
				onclick={() => {
					stopEditing(true);
				}}
			>
				Save
			</button>
		</div>
	</div>
{/if}

<style>
	.inline-snippet-collection {
		border-style: solid;
		border-width: 3px;
		border-radius: 10px;
		padding: 15px;
		border-color: grey;
	}
</style>
