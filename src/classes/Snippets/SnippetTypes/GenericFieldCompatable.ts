import { GroupSnippet } from "./GroupSnippet";
import { KeybindSnippet } from "./KeybindSnippet";
import { ScoreboardObjectiveSnippet } from "./ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "./SelectorSnippet";
import type { Snippet } from "./Snippet";
import { TextSnippet } from "./TextSnippet";
import { TranslateSnippet } from "./TranslateSnippet";

export type GenericFieldCompatable = ScoreboardObjectiveSnippet | KeybindSnippet | SelectorSnippet | TextSnippet | TranslateSnippet

export function genericSnippet(snippet: Snippet): GenericFieldCompatable {
  if (
    snippet instanceof ScoreboardObjectiveSnippet
    || snippet instanceof KeybindSnippet
    || snippet instanceof SelectorSnippet
    || snippet instanceof TextSnippet
    || snippet instanceof TranslateSnippet
  ) {
    return snippet
  } else {
    return null
  }
}