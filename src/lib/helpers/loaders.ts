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

export function legacyStatePreparation() {
	let lsformat = parseInt(localStorage.getItem('jformat') || VERSION.toString());
	console.log('Verifying format...');
	console.log('Currently', lsformat);
	console.log('Wanted', VERSION);

	if (lsformat < 7) {
		console.warn("Resetting local state instead of upgrading")
		localStorage.clear()
		return
	}

	if (lsformat == 7) {
		console.log(`Upgrading ClickEvent types from numerical to strings`)

		const source_str = localStorage.getItem(LSKEY_SNIPPET_ARR)
		const source_array = JSON.parse(source_str || "[]") as Array<object>

		const correctedSnippetArray = upgradeV7State(source_array)

		localStorage.setItem(LSKEY_SNIPPET_ARR, JSON.stringify(correctedSnippetArray))

		lsformat = 8
	}

	localStorage.setItem('jformat', VERSION.toString());
}

export function upgradeV7State(source_array: Array<object>): Array<object> {
	const clickEventTypeLookup: ClickEventType[] = ["none", "open_url", "run_command", "suggest_command", "change_page", "copy_to_clipboard"]
	const hoverEventTypeLookup: HoverEventType[] = ["none", "show_text", "show_item", "show_entity"]
	return source_array.map((s): object => {
		const found_click_event_type = s["click_event_type"];
		const found_hover_event_type = s["hover_event_type"];
		return {
			...s,
			click_event_type: clickEventTypeLookup[found_click_event_type] ?? "none",
			hover_event_type: hoverEventTypeLookup[found_hover_event_type] ?? "none",
		};
	})
}

// Version 8
export function loadCurrentVersionState(
	source_array: Array<object>,
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

			if (s.hasOwnProperty('hover_event_children')) {
				s['hover_event_children'] = loadCurrentVersionState(s['hover_event_children']);
			}

			if (s.hasOwnProperty('text')) {
				if (s['text'] === '\n') {
					return (Object as any).assign(new LinebreakSnippet(), s);
				} else {
					return (Object as any).assign(new TextSnippet(), s);
				}
			} else if (s.hasOwnProperty('keybind')) {
				return (Object as any).assign(new KeybindSnippet(), s);
			} else if (s.hasOwnProperty('score') || s.hasOwnProperty('score_name')) {
				return (Object as any).assign(new ScoreboardObjectiveSnippet(), s);
			} else if (s.hasOwnProperty('selector')) {
				return (Object as any).assign(new SelectorSnippet(), s);
			} else if (s.hasOwnProperty('nbt')) {
				return (Object as any).assign(new NBTSnippet(), s);
			} else if (s.hasOwnProperty('translate')) {
				if (Array.isArray(s['parameters'])) {
					const singlesFlattened: object[] = [];
					s['parameters'].forEach((param) => {
						if (Array.isArray(param)) {
							if (param.length === 1) {
								singlesFlattened.push(param[0]);
							} else {
								singlesFlattened.push(param);
							}
						} else {
							singlesFlattened.push(param);
						}
					});
					s['parameters'] = loadCurrentVersionState(singlesFlattened);
				} else {
					console.error('Found unexpected non-array parameter value', s);
					s['parameters'] = [];
				}
				return (Object as any).assign(new TranslateSnippet(), s);
			} else if (s.hasOwnProperty('isPagebreak')) {
				return (Object as any).assign(new PagebreakSnippet(), s);
			} else if (s.hasOwnProperty('children')) {
				s['children'] = loadCurrentVersionState(s['children']);
				return (Object as any).assign(new GroupSnippet(), s);
			} else {
				const snippet = new TextSnippet();
				snippet.text = `Failed to claim ${JSON.stringify(s)}`;
				return snippet;
			}
		});
}
