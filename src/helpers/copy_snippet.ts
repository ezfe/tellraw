import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";

export function duplicate_snippet(snippet: Snippet) {
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

export function copy_standard_attributes(source: Snippet, destination: Snippet) {
  destination.bold = source.bold
  destination.italic = source.italic
  destination.underlined = source.underlined
  destination.strikethrough = source.strikethrough
  destination.obfuscated = source.obfuscated

  destination.color = source.color

  destination.insertion = source.insertion

  destination.click_event_type = source.click_event_type
  destination.click_event_value = source.click_event_value

  destination.hover_event_type = source.hover_event_type
  destination.hover_event_value = source.hover_event_value
  destination.hover_event_children = source.hover_event_children
}