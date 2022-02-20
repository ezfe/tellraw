import { KeybindSnippet } from "./KeybindSnippet";
import { ScoreboardObjectiveSnippet } from "./ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "./SelectorSnippet";
import type { Snippet } from "./Snippet";
import { TextSnippet } from "./TextSnippet";

export type GenericFieldCompatable = ScoreboardObjectiveSnippet | KeybindSnippet | SelectorSnippet | TextSnippet

export function genericSnippet(snippet: Snippet): GenericFieldCompatable {
  if (
    snippet instanceof ScoreboardObjectiveSnippet
    || snippet instanceof KeybindSnippet
    || snippet instanceof SelectorSnippet
    || snippet instanceof TextSnippet
  ) {
    return snippet
  } else {
    return null
  }
}