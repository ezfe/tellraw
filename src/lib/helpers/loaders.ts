/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import type { ClickEventType } from '$lib/classes/Snippets/ClickEvent';
import type { HoverEventType } from '$lib/classes/Snippets/HoverEvent';
import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
import { GroupSnippet } from '../classes/Snippets/SnippetTypes/GroupSnippet';
import { KeybindSnippet } from '../classes/Snippets/SnippetTypes/KeybindSnippet';
import { LinebreakSnippet } from '../classes/Snippets/SnippetTypes/LinebreakSnippet';
import { NBTSnippet } from '../classes/Snippets/SnippetTypes/NBTSnippet';
import { PagebreakSnippet } from '../classes/Snippets/SnippetTypes/PagebreakSnippet';
import { ScoreboardObjectiveSnippet } from '../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet';
import { SelectorSnippet } from '../classes/Snippets/SnippetTypes/SelectorSnippet';
import { Snippet } from '../classes/Snippets/SnippetTypes/Snippet';
import { TextSnippet } from '../classes/Snippets/SnippetTypes/TextSnippet';
import { TranslateSnippet } from '../classes/Snippets/SnippetTypes/TranslateSnippet';
import { LSKEY_SNIPPET_ARR, VERSION } from '../constants';
import { PlayerObjectSnippet } from '$lib/classes/Snippets/SnippetTypes/PlayerObjectSnippet';
import { AtlasObjectSnippet } from '$lib/classes/Snippets/SnippetTypes/AtlasObjectSnippet';
import * as v from 'valibot';

export function legacyStatePreparation() {
	let lsformat = parseInt(localStorage.getItem('jformat') || VERSION.toString());
	console.log('Verifying format...');
	console.log('Currently', lsformat);
	console.log('Wanted', VERSION);

	if (lsformat < 7) {
		console.warn('Resetting local state instead of upgrading');
		localStorage.clear();
		return;
	}

	if (lsformat == 7) {
		console.log(`Upgrading ClickEvent types from numerical to strings`);

		const source_str = localStorage.getItem(LSKEY_SNIPPET_ARR);
		const source_array = JSON.parse(source_str || '[]') as Array<object>;

		const correctedSnippetArray = upgradeV7State(source_array);

		localStorage.setItem(LSKEY_SNIPPET_ARR, JSON.stringify(correctedSnippetArray));

		lsformat = 8;
	}

	localStorage.setItem('jformat', VERSION.toString());
}

export function upgradeV7State(source_array: Array<object>): Array<object> {
	const clickEventTypeLookup: ClickEventType[] = [
		'none',
		'open_url',
		'run_command',
		'suggest_command',
		'change_page',
		'copy_to_clipboard'
	];
	const hoverEventTypeLookup: HoverEventType[] = ['none', 'show_text', 'show_item', 'show_entity'];
	return source_array.map((s): object => {
		const Schema = v.object({
			click_event_type: v.optional(v.number()),
			hover_event_type: v.optional(v.number())
		});
		const parsed = v.parse(Schema, s);
		return {
			...s,
			click_event_type: parsed.click_event_type
				? (clickEventTypeLookup[parsed.click_event_type] ?? 'none')
				: 'none',
			hover_event_type: parsed.hover_event_type
				? (hoverEventTypeLookup[parsed.hover_event_type] ?? 'none')
				: 'none'
		};
	});
}

// Version 8
export function loadCurrentVersionState(
	source_array: Array<Record<string, unknown>>,
	filterShadowItems = true
): Array<Snippet> {
	if (!Array.isArray(source_array)) {
		console.error('Received a non-array', source_array);
		return [];
	}
	return source_array
		.filter((s: any) => {
			if (filterShadowItems && s[SHADOW_ITEM_MARKER_PROPERTY_NAME]) {
				console.log('Filtering shadow item', s, source_array);
				return false;
			} else {
				return true;
			}
		})
		.map((s): Snippet => {
			console.log('parsing snippet candidate', s);
			if (s instanceof Snippet) {
				return s;
			} else if (typeof s === 'string') {
				const snippet = new TextSnippet(null);
				snippet.text = s;
				return snippet;
			} else if (Array.isArray(s)) {
				const group = new GroupSnippet(null);
				group.children = loadCurrentVersionState(s);
				return group;
			}

			const HoverEventChildrenSchema = v.object({
				hover_event_children: v.optional(
					v.pipe(
						v.array(v.looseObject({})),
						v.transform((children) => loadCurrentVersionState(children))
					)
				)
			});

			const LinebreakSchema = v.pipe(
				v.looseObject({
					text: v.literal('\n'),
					...HoverEventChildrenSchema.entries
				}),
				v.transform((s) => (Object as any).assign(new LinebreakSnippet(), s))
			);

			const TextSchema = v.pipe(
				v.looseObject({
					text: v.string(),
					...HoverEventChildrenSchema.entries
				}),
				v.transform((s) => (Object as any).assign(new TextSnippet(), s))
			);
			const KeybindSchema = v.pipe(
				v.looseObject({
					keybind: v.string(),
					...HoverEventChildrenSchema.entries
				}),
				v.transform((s) => (Object as any).assign(new KeybindSnippet(), s))
			);
			const SelectorSchema = v.pipe(
				v.looseObject({
					selector: v.string(),
					...HoverEventChildrenSchema.entries
				}),
				v.transform((s) => (Object as any).assign(new SelectorSnippet(), s))
			);
			const ScoreboardObjectiveSchema = v.pipe(
				v.looseObject({
					score_name: v.string(),
					...HoverEventChildrenSchema.entries
				}),
				v.transform((s) => (Object as any).assign(new ScoreboardObjectiveSnippet(), s))
			);
			const NBTSchema = v.pipe(
				v.looseObject({
					nbt: v.string(),
					...HoverEventChildrenSchema.entries
				}),
				v.transform((s) => (Object as any).assign(new NBTSnippet(), s))
			);
			const TranslateSchema = v.pipe(
				v.looseObject({
					translate: v.string(),
					parameters: v.optional(
						v.pipe(
							v.array(
								v.pipe(
									v.unknown(),
									v.transform((param) => {
										console.log('transforming translate param', param);
										if (Array.isArray(param)) {
											console.log('found an array, len', param.length);
											if (param.length === 1) {
												return param[0];
											} else {
												return param;
											}
										} else {
											return param;
										}
									})
								)
							),
							v.transform((params) => {
								console.log('sending translate params to loader', params);
								return loadCurrentVersionState(params);
							})
						)
					),
					...HoverEventChildrenSchema.entries
				}),
				v.transform((s) => (Object as any).assign(new TranslateSnippet(), s))
			);
			const PagebreakSchema = v.pipe(
				v.looseObject({
					isPagebreak: v.literal(true),
					...HoverEventChildrenSchema.entries
				}),
				v.transform((s) => (Object as any).assign(new PagebreakSnippet(), s))
			);
			const GroupSchema = v.pipe(
				v.looseObject({
					children: v.pipe(
						v.array(v.record(v.string(), v.unknown())),
						v.transform((children) => loadCurrentVersionState(children))
					),
					...HoverEventChildrenSchema.entries
				}),
				v.transform((s) => (Object as any).assign(new GroupSnippet(), s))
			);
			const PlayerObjectSchema = v.pipe(
				v.looseObject({
					playerName: v.string(),
					...HoverEventChildrenSchema.entries
				}),
				v.transform((s) => (Object as any).assign(new PlayerObjectSnippet(), s))
			);
			const AtlasObjectSchema = v.pipe(
				v.looseObject({
					atlas: v.string(),
					...HoverEventChildrenSchema.entries
				}),
				v.transform((s) => (Object as any).assign(new AtlasObjectSnippet(), s))
			);

			const ComboSchema = v.union([
				LinebreakSchema,
				TextSchema,
				KeybindSchema,
				SelectorSchema,
				ScoreboardObjectiveSchema,
				NBTSchema,
				TranslateSchema,
				PagebreakSchema,
				GroupSchema,
				PlayerObjectSchema,
				AtlasObjectSchema
			]);

			try {
				return v.parse(ComboSchema, s);
			} catch (error) {
				console.error(error);
				alert(`Failed to load state: ${error instanceof Error ? error.message : 'unknown error'}`);
				const snippet = new TextSnippet();
				snippet.text = `Failed to claim: ${error instanceof Error ? error.message : 'unknown error'}`;
				return snippet;
			}
		});
}
