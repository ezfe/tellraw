import { TextSnippet } from "../classes/Snippets/TextSnippet";
import { Snippet } from "../classes/Snippets/Snippet";
import { LinebreakSnippet } from "../classes/Snippets/LinebreakSnippet";
import { SelectorSnippet } from "../classes/Snippets/SelectorSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/ScoreboardObjectiveSnippet";
import { KeybindSnippet } from "../classes/Snippets/KeybindSnippet";

export function copy(snippet: Snippet) {
  if (snippet instanceof LinebreakSnippet) {
    return snippet.copy()
  } else if (snippet instanceof TextSnippet) {
    return snippet.copy()
  } else if (snippet instanceof SelectorSnippet) {
    return snippet.copy()
  } else if (snippet instanceof ScoreboardObjectiveSnippet) {
    return snippet.copy()
  } else if (snippet instanceof KeybindSnippet) {
    return snippet.copy()
  } else {
    let x = new TextSnippet(null)
    x.text = "A copy error occurred"
    return x
  }
}