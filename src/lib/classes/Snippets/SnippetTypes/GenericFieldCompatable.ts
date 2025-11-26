import { AtlasObjectSnippet } from './AtlasObjectSnippet';
import { KeybindSnippet } from './KeybindSnippet';
import { PlayerObjectSnippet } from './PlayerObjectSnippet';
import { ScoreboardObjectiveSnippet } from './ScoreboardObjectiveSnippet';
import { SelectorSnippet } from './SelectorSnippet';
import type { Snippet } from './Snippet';
import { TextSnippet } from './TextSnippet';

export type GenericFieldCompatable =
	| ScoreboardObjectiveSnippet
	| KeybindSnippet
	| SelectorSnippet
	| TextSnippet
	| AtlasObjectSnippet
	| PlayerObjectSnippet;

export function genericSnippet(snippet: Snippet): GenericFieldCompatable {
	if (
		snippet instanceof ScoreboardObjectiveSnippet ||
		snippet instanceof KeybindSnippet ||
		snippet instanceof SelectorSnippet ||
		snippet instanceof TextSnippet ||
		snippet instanceof AtlasObjectSnippet ||
		snippet instanceof PlayerObjectSnippet
	) {
		return snippet;
	} else {
		return null;
	}
}
