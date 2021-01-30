import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { duplicate_snippet } from "./duplicate_snippet";

export function copy_standard_attributes(source: Snippet, destination: Snippet) {
  destination.bold = source.bold
  destination.italic = source.italic
  destination.underlined = source.underlined
  destination.strikethrough = source.strikethrough
  destination.obfuscated = source.obfuscated

  destination.font = source.font

  destination.color = source.color

  destination.insertion = source.insertion

  destination.click_event_type = source.click_event_type
  destination.click_event_value = source.click_event_value

  destination.hover_event_type = source.hover_event_type
  destination.hover_event_value = source.hover_event_value
  destination.hover_event_children = source.hover_event_children.map(snippet => duplicate_snippet(snippet))
}