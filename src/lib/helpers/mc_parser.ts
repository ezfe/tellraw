import type { Snippet } from "$lib/classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "$lib/classes/Snippets/SnippetTypes/TextSnippet";

const type_handlers = [
	{ regex: /(\/| )tellraw/, routine: parse_tellraw_type },
	{ regex: /^\/?title/, routine: parse_overlay_type },
	{ regex: /Text[0-9]:/, routine: parse_sign_type },
	{ regex: /pages:/, routine: parse_book_type },
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
		if (inserted_value.startsWith("\"")) {
			const snippet = new TextSnippet();
			snippet.text = JSON.parse(inserted_value);
			return [snippet];
		} else {
			return [];
		}
	} else {
		return [];
	}
}

function parse_overlay_type(input: string): Snippet[] {
	return [];
}

function parse_sign_type(input: string): Snippet[] {
	return [];
}

function parse_book_type(input: string): Snippet[] {
	return [];
}

function detect_command(input: string): string | null {
	const command_regex = /^\/?([a-zA-Z]+)/;
	const matches = input.match(command_regex);
	if (matches) {
		const command_first = matches[1];
		if (command_first == "execute") {
			if (/ title/.test(input)) {
				return "title";
			} else if (/ tellraw/.test(input)) {
				return "tellraw";
			} else if (/ give/.test(input)) {
				return "give";
			} else if (/ data/.test(input)) {
				return "data";
			} else {
				console.error("Failed to determine command", input);
				return null;
			}
		} else {
			return command_first;
		}
	} else {
		return null;
	}
}