import { AtlasObjectSnippet } from '$lib/classes/Snippets/SnippetTypes/AtlasObjectSnippet';
import { PlayerObjectSnippet } from '$lib/classes/Snippets/SnippetTypes/PlayerObjectSnippet';
import { GroupSnippet } from '../classes/Snippets/SnippetTypes/GroupSnippet';
import { KeybindSnippet } from '../classes/Snippets/SnippetTypes/KeybindSnippet';
import { LinebreakSnippet } from '../classes/Snippets/SnippetTypes/LinebreakSnippet';
import { NBTSnippet } from '../classes/Snippets/SnippetTypes/NBTSnippet';
import { PagebreakSnippet } from '../classes/Snippets/SnippetTypes/PagebreakSnippet';
import { ScoreboardObjectiveSnippet } from '../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet';
import { SelectorSnippet } from '../classes/Snippets/SnippetTypes/SelectorSnippet';
import type { Snippet } from '../classes/Snippets/SnippetTypes/Snippet';
import { TextSnippet } from '../classes/Snippets/SnippetTypes/TextSnippet';
import { TranslateSnippet } from '../classes/Snippets/SnippetTypes/TranslateSnippet';

export function duplicate_snippet(snippet: Snippet) {
	if (snippet instanceof LinebreakSnippet) {
		return snippet.copy();
	} else if (snippet instanceof PagebreakSnippet) {
		return snippet.copy();
	} else if (snippet instanceof TextSnippet) {
		return snippet.copy();
	} else if (snippet instanceof SelectorSnippet) {
		return snippet.copy();
	} else if (snippet instanceof ScoreboardObjectiveSnippet) {
		return snippet.copy();
	} else if (snippet instanceof KeybindSnippet) {
		return snippet.copy();
	} else if (snippet instanceof NBTSnippet) {
		return snippet.copy();
	} else if (snippet instanceof TranslateSnippet) {
		return snippet.copy();
	} else if (snippet instanceof GroupSnippet) {
		return snippet.copy();
	} else if (snippet instanceof PlayerObjectSnippet) {
		return snippet.copy();
	} else if (snippet instanceof AtlasObjectSnippet) {
		return snippet.copy();
	} else {
		console.error(
			"An error occurred copying a snippet. \
    It probably hasn't been implemented yet in the duplicate_snippet function.",
			snippet
		);

		let x = new TextSnippet(null);
		x.text = 'A copy error occurred';
		return x;
	}
}
