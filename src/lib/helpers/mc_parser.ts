import { SelectorSnippet } from '$lib/classes/Snippets/SnippetTypes/SelectorSnippet';
import type { Snippet } from '$lib/classes/Snippets/SnippetTypes/Snippet';
import { TextSnippet } from '$lib/classes/Snippets/SnippetTypes/TextSnippet';
import { LinebreakSnippet } from '$lib/classes/Snippets/SnippetTypes/LinebreakSnippet';
import { ScoreboardObjectiveSnippet } from '$lib/classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet';
import { HoverEvent } from '$lib/classes/Snippets/HoverEvent';

const type_handlers = [
	{ regex: /(\/| )tellraw/, routine: parse_tellraw_type },
	{ regex: /^\/?title/, routine: parse_overlay_type },
	// { regex: /Text[0-9]:/, routine: parse_legacy_sign_type },
	{ regex: /[a-z]+_sign\{.*messages:.*\}/, routine: parse_sign_type },
	{ regex: /pages:/, routine: parse_book_type }
];

export function parse_mc_command(input: string): Snippet[] {
	for (const handler of type_handlers) {
		if (handler.regex.test(input)) {
			return handler.routine(input);
		}
	}
	return [];
}

function parse_tellraw_type(input: string): Snippet[] {
	const extract_regex = /tellraw [^ ]+ (({.*})|(".*")|(\[.*\]))$/;
	const matches = input.match(extract_regex);
	if (matches) {
		const inserted_value = matches[1];

		return parse_snippet_multiobj(JSON.parse(inserted_value));
	} else {
		return [];
	}
}

function parse_overlay_type(input: string): Snippet[] {
	const extract_regex = /title [^ ]+ [a-z]+ (({.*})|(".*")|(\[.*\]))$/;
	const matches = input.match(extract_regex);
	if (matches) {
		const inserted_value = matches[1];

		return parse_snippet_multiobj(JSON.parse(inserted_value));
	} else {
		return [];
	}
}

function parse_sign_type(input: string): Snippet[] {
	const extract_regex =
		/[a-z]+_sign\{.*BlockEntityTag:\{.*front_text:\{messages:(\[.*\])\}.*\}.*\}$/;
	const matches = input.match(extract_regex);
	if (matches) {
		const inserted_value = matches[1];
		const front_sign_lines = JSON.parse(inserted_value)
			.map((str) => JSON.parse(str))
			.map((line) => parse_snippet_multiobj(line));

		const full_list = [];
		for (const line of front_sign_lines) {
			for (const el of line) {
				full_list.push(el);
			}
			full_list.push(new LinebreakSnippet());
		}
		console.log(full_list);
		return full_list;
	} else {
		console.log('no matches');
		return [];
	}
}

function parse_book_type(input: string): Snippet[] {
	return [];
}

function detect_command(input: string): string | null {
	const command_regex = /^\/?([a-zA-Z]+)/;
	const matches = input.match(command_regex);
	if (matches) {
		const command_first = matches[1];
		if (command_first == 'execute') {
			if (/ title/.test(input)) {
				return 'title';
			} else if (/ tellraw/.test(input)) {
				return 'tellraw';
			} else if (/ give/.test(input)) {
				return 'give';
			} else if (/ data/.test(input)) {
				return 'data';
			} else {
				console.error('Failed to determine command', input);
				return null;
			}
		} else {
			return command_first;
		}
	} else {
		return null;
	}
}

function parse_snippet_multiobj(parsed: any): Snippet[] {
	if (!Array.isArray(parsed)) {
		// Handle non-list inputs (typically either a raw string or a single object)
		// by encapsulating in `[...]` array
		console.log('parsed is object', parsed);
		parsed = [parsed];
	}
	if (Array.isArray(parsed)) {
		if (parsed.length >= 2) {
			// If there's more than one item, perform inheritance string search
			// and removal
			if (parsed[0] == '') {
				// If the first item is an empty string, remove it. This is
				// included by this site to prevent attribute inheritance
				parsed = parsed.slice(1);
			} else {
				// If the first item is not an empty string (and there are more
				// than 1 snippets) then this is unexpected, because inheritance may occur
				// and that logic isn't accounted for here
				console.error("Array doesn't start with empty string");
			}
		} else if (parsed.length == 1 && parsed[0] == '') {
			// Single length lists of empty strings should be ignored
			return [];
		}
		// Handle plain strings remaining inside the list
		parsed = parsed.map((item) => {
			if (typeof item == 'string') {
				return { text: item };
			} else {
				return item;
			}
		});
	}
	if (Array.isArray(parsed)) {
		// Handle happy-path scenario of an array of non-string objects
		console.log('parsed is array', parsed);
		return parsed.map((obj) => parse_snippet(obj));
	} else {
		console.error('Failed to parse tellraw', parsed);
		return [];
	}
}

function parse_snippet(obj): Snippet {
	let snippet: Snippet;

	if (typeof obj['text'] == 'string') {
		snippet = new TextSnippet().setText(obj['text']);
	} else if (typeof obj['selector'] == 'string') {
		snippet = new SelectorSnippet().setSelector(obj['selector']);
	} else if (typeof obj['score'] == 'object') {
		snippet = new ScoreboardObjectiveSnippet()
			.setScoreName(obj['score']['name'] ?? '')
			.setScoreObjective(obj['score']['objective'] ?? '')
			.setScoreValue(obj['score']['value'] ?? null);
	} else {
		console.error('Failed to parse tellraw', obj);
		return new TextSnippet().setText('Failed to parse tellraw');
	}

	snippet
		.setBold(obj['bold'] ?? false)
		.setItalic(obj['italic'] ?? false)
		.setUnderlined(obj['underlined'] ?? false)
		.setStrikethrough(obj['strikethrough'] ?? false)
		.setObfuscated(obj['obfuscated'] ?? false)
		.setFont(obj['font'] ?? null)
		.setColor(obj['color'] ?? 'none');

	if (obj['clickEvent']) {
		snippet.click_event_type = obj['clickEvent']['action'];
		snippet.click_event_value = obj['clickEvent']['value'];
	}

	if (obj['hoverEvent']) {
		snippet.hover_event_type = obj['hoverEvent']['action'];
		if (snippet.hover_event_type == HoverEvent.show_text) {
			snippet.hover_event_children = parse_snippet_multiobj(obj['hoverEvent']['contents']);
		} else {
			snippet.hover_event_value = JSON.stringify(obj['hoverEvent']['contents']);
		}
	}

	return snippet;
}
