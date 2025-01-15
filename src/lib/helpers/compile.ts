import { HoverEvent } from '$lib/classes/Snippets/HoverEvent';
import { GroupSnippet } from '../classes/Snippets/SnippetTypes/GroupSnippet';
import { KeybindSnippet } from '../classes/Snippets/SnippetTypes/KeybindSnippet';
import { LinebreakSnippet } from '../classes/Snippets/SnippetTypes/LinebreakSnippet';
import { NBTSnippet, NBTType } from '../classes/Snippets/SnippetTypes/NBTSnippet';
import { PagebreakSnippet } from '../classes/Snippets/SnippetTypes/PagebreakSnippet';
import { ScoreboardObjectiveSnippet } from '../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet';
import { SelectorSnippet } from '../classes/Snippets/SnippetTypes/SelectorSnippet';
import type { Snippet } from '../classes/Snippets/SnippetTypes/Snippet';
import { TextSnippet } from '../classes/Snippets/SnippetTypes/TextSnippet';
import { TranslateSnippet } from '../classes/Snippets/SnippetTypes/TranslateSnippet';
import { CommandType, FeatureType, isFeatureAvailable } from '../data/templates';
import type { Version } from './versions';
import { versionAtLeast } from './versions';
import { compile as compileSnbt } from '../snbt/compile';

function compile_section(
	section_snippets: Snippet[],
	type: CommandType,
	version: Version
): Record<string, unknown>[] {
	const results: Record<string, unknown>[] = [];
	for (const snippet of section_snippets) {
		const pending: Record<string, any> = {};

		if (snippet instanceof TextSnippet) {
			pending['text'] = snippet.text;
		} else if (snippet instanceof SelectorSnippet) {
			pending['selector'] = snippet.selector;
		} else if (snippet instanceof ScoreboardObjectiveSnippet) {
			pending['score'] = {
				name: snippet.score_name,
				objective: snippet.score_objective
			};

			if (snippet.score_value !== null) {
				pending['score']['value'] = snippet.score_value;
			}
		} else if (snippet instanceof NBTSnippet) {
			if (!isFeatureAvailable(type, version, FeatureType.nbtComponent)) {
				continue;
			}

			if (
				snippet.type == NBTType.storage &&
				!isFeatureAvailable(type, version, FeatureType.nbtStorageComponent)
			) {
				continue;
			}

			pending['nbt'] = snippet.nbt;
			// this works because of how enums
			// work in TypeScript
			pending[NBTType[snippet.type]] = snippet.storage;
			if (snippet.interpret) {
				pending['interpret'] = snippet.interpret;
			}
		} else if (snippet instanceof KeybindSnippet) {
			pending['keybind'] = snippet.keybind;
		} else if (snippet instanceof TranslateSnippet) {
			pending['translate'] = snippet.translate;
			if (snippet.parameters.length > 0) {
				pending['with'] = compile_section(snippet.parameters, type, version);
			}
		} else if (snippet instanceof GroupSnippet) {
			pending['text'] = '';
			pending['extra'] = compile_section(snippet.children, type, version);
		}

		/* Style Transfer */
		if (snippet.bold) pending['bold'] = true;
		if (snippet.italic) pending['italic'] = true;
		if (snippet.underlined) pending['underlined'] = true;
		if (snippet.strikethrough) pending['strikethrough'] = true;
		if (snippet.obfuscated) pending['obfuscated'] = true;
		if (snippet.color != 'none') pending['color'] = snippet.color;

		if (snippet.font) {
			if (isFeatureAvailable(type, version, FeatureType.font)) {
				pending['font'] = snippet.font;
			} else {
				console.warn(`Skipping font attribute, since ${version} doesn't qualify.`);
			}
		}

		if (snippet.insertion.length > 0) {
			pending['insertion'] = snippet.insertion;
		}

		// If the clicking feature is available and
		// it is not a sign with more than one snippet
		// in this section, process the click event
		if (snippet.click_event_type != 'none') {
			if (
				isFeatureAvailable(type, version, FeatureType.clicking) &&
				!(type == CommandType.sign && section_snippets.length > 1)
			) {
				const clickEventKey = versionAtLeast(version, '1.22') ? 'click_event' : 'clickEvent';
				if (snippet.click_event_type == 'open_url') {
					const urlKey = versionAtLeast(version, '1.22') ? 'url' : 'value';
					pending[clickEventKey] = {
						action: snippet.click_event_type,
						[urlKey]: snippet.click_event_value
					};
				} else if (
					snippet.click_event_type == 'run_command' ||
					snippet.click_event_type == 'suggest_command'
				) {
					const commandKey = versionAtLeast(version, '1.22') ? 'command' : 'value';
					pending[clickEventKey] = {
						action: snippet.click_event_type,
						[commandKey]: snippet.click_event_value
					};
				} else if (snippet.click_event_type == 'change_page') {
					if (versionAtLeast(version, '1.22')) {
						try {
							pending[clickEventKey] = {
								action: snippet.click_event_type,
								page: parseInt(snippet.click_event_value)
							};
						} catch (error) {
							console.warn(
								'Failed to parse page number for change_page click event',
								snippet.click_event_value
							);
						}
					} else {
						pending[clickEventKey] = {
							action: snippet.click_event_type,
							value: snippet.click_event_value
						};
					}
				} else {
					pending[clickEventKey] = {
						action: snippet.click_event_type,
						value: snippet.click_event_value
					};
				}
			}
		}

		if (isFeatureAvailable(type, version, FeatureType.hovering)) {
			const hoverEventKey = versionAtLeast(version, '1.22') ? 'hover_event' : 'hoverEvent';
			if (snippet.hover_event_type == 'show_text') {
				const recursive_result = compile_section(
					snippet.hover_event_children,
					CommandType.hovertext,
					version
				);
				const contents_key = determineHoverEventShowTextContentsKey(version);
				pending[hoverEventKey] = {
					action: snippet.hover_event_type,
					[contents_key]: recursive_result
				};
			} else if (snippet.hover_event_type != 'none') {
				if (versionAtLeast(version, '1.16')) {
					try {
						const parsedValue = JSON.parse(snippet.hover_event_value);
						if (versionAtLeast(version, '1.22')) {
							pending[hoverEventKey] = {
								...parsedValue,
								action: snippet.hover_event_type
							};
						} else {
							pending[hoverEventKey] = {
								action: snippet.hover_event_type,
								contents: parsedValue
							};
						}
					} catch (error) {
						pending[hoverEventKey] = {
							action: HoverEvent.show_text,
							contents: `Cannot parse as JSON:\n${snippet.hover_event_value}`
						};
					}
				} else {
					pending[hoverEventKey] = {
						action: snippet.hover_event_type,
						value: snippet.hover_event_value
					};
				}
			}
		}

		results.push(pending);
	}
	return results;
}

export function compile_section_list(
	sections: Snippet[][],
	type: CommandType,
	version: Version,
	litSign: boolean
): string {
	// Depending on whether a sign click
	// event is used, sections may be single
	// tellraw snippets instead of normal arrays
	type BaseType = string | Record<string, unknown>;
	type FullType = BaseType | BaseType[];

	const results = Array<FullType>();

	for (const section_snippets of sections) {
		const section_results = [{ text: '' }, ...compile_section(section_snippets, type, version)];

		// If there are 2 elements
		// (the first element is always "")
		// then replace it all with that one blob
		if (section_results.length == 2) {
			results.push(section_results[1]);
		} else {
			results.push(section_results);
		}
	}

	if (type == CommandType.book) {
		if (versionAtLeast(version, '1.22')) {
			return compileSnbt(results) ?? '';
		} else {
			return JSON.stringify(
				results.map((e) => {
					return JSON.stringify(e);
				})
			);
		}
	} else if (type == CommandType.sign) {
		let ret = '';
		if (versionAtLeast(version, '1.20')) {
			let blockEntityData: Record<string, any> = {
				id: 'sign'
			};

			const front_text_results = [...results].slice(0, 4);
			const front_text_lines = [...front_text_results, [''], [''], [''], ['']].slice(0, 4);
			if (versionAtLeast(version, '1.22')) {
				blockEntityData['front_text'] = {
					messages: front_text_lines,
					has_glowing_text: litSign ? true : undefined
				};
			} else {
				const front_text_mapped = front_text_lines.map((line) => JSON.stringify(line));
				blockEntityData['front_text'] = {
					messages: front_text_mapped,
					has_glowing_text: litSign ? true : undefined
				};
			}

			if (results.length > 4) {
				const back_text_results = [...results].slice(4);
				const back_text_lines = [...back_text_results, [''], [''], [''], ['']].slice(0, 4);
				if (versionAtLeast(version, '1.22')) {
					blockEntityData['back_text'] = { messages: back_text_lines };
				} else {
					const back_text_mapped = back_text_lines.map((line) => JSON.stringify(line));
					blockEntityData['back_text'] = { messages: back_text_mapped };
				}
			}

			if (versionAtLeast(version, '1.20.5')) {
				ret = `[block_entity_data=${compileSnbt(blockEntityData)}]`;
			} else {
				ret = compileSnbt({ BlockEntityTag: blockEntityData }) ?? '';
			}
		} else {
			let blockEntityData: Record<string, any> = {
				id: 'sign'
			};
			if (results.length >= 1) {
				blockEntityData['Text1'] = JSON.stringify(results[0]);

				if (results.length >= 2) {
					blockEntityData['Text2'] = JSON.stringify(results[1]);

					if (results.length >= 3) {
						blockEntityData['Text3'] = JSON.stringify(results[2]);

						if (results.length >= 4) {
							blockEntityData['Text4'] = JSON.stringify(results[3]);
						}
					}
				}
			}
			if (litSign && isFeatureAvailable(type, version, FeatureType.litSign)) {
				blockEntityData['GlowingText'] = true;
			}

			ret = compileSnbt({ BlockEntityTag: blockEntityData }) ?? '';
		}

		return ret;
	} else if (results.length > 0) {
		if (versionAtLeast(version, '1.22')) {
			return compileSnbt(results[0]) ?? '';
		} else {
			return JSON.stringify(results[0]);
		}
	} else {
		console.error('No elements case identified to compile this');
		return '';
	}
}

/**
 * Compile a set of snippets to a final string
 * @param snippets Snippets to compile
 * @param command Command to inject compiled text into
 * @param type Command type (books, tellraw, signs, etc.)
 * @param version Minecraft version compiling for
 * @returns Compiled string to run in Minecraft
 */
export function compile(
	snippets: Array<Snippet>,
	command: string,
	type: CommandType,
	version: Version,
	litSign: boolean
): string {
	const section_list = Array<Array<Snippet>>();
	const unprocessed = [...snippets];

	if (isFeatureAvailable(type, version, FeatureType.pages) || type == CommandType.sign) {
		while (unprocessed.length > 0) {
			const applyLinebreaks = type == CommandType.sign;

			const index = unprocessed.findIndex((s) => {
				return s instanceof PagebreakSnippet || (applyLinebreaks && s instanceof LinebreakSnippet);
			});

			if (index == -1) {
				section_list.push(unprocessed.splice(0, unprocessed.length));
			} else {
				section_list.push(unprocessed.splice(0, index));
			}
			unprocessed.splice(0, 1);
		}
	} else {
		section_list.push(
			unprocessed.filter((e) => {
				return !(e instanceof PagebreakSnippet);
			})
		);
	}

	let results = compile_section_list(section_list, type, version, litSign);

	if (!command) {
		console.error("Command isn't available", command);
		return '';
	}

	if (command.indexOf('%s') === -1) {
		// error
		console.error('No %s to replace');
		return results;
	} else {
		return command.replace('%s', results);
	}
}

function determineHoverEventShowTextContentsKey(version: Version): string {
	if (versionAtLeast(version, '1.22')) {
		return 'value';
	} else if (versionAtLeast(version, '1.16')) {
		return 'contents';
	} else {
		return 'value';
	}
}
