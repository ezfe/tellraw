import { Color } from "../classes/Color";
import { ClickEventType } from "../classes/Snippets/ClickEvent";
import { HoverEventType } from "../classes/Snippets/HoverEvent";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";

export function legacy_apply_common_formatting<T extends Snippet>(snippet: T, sf: object): T {
  if (sf["bold"] === true) {
      snippet.bold = true
  }
  if (sf["italic"] === true) {
      snippet.italic = true
  }
  if (sf["underlined"] === true) {
      snippet.underlined = true
  }
  if (sf["strikethrough"] === true) {
      snippet.strikethrough = true
  }
  if (sf["obfuscated"] === true) {
      snippet.obfuscated = true
  }

  snippet.color = sf["color"] as Color
  
  if ("insertion" in sf) {
      snippet.insertion = sf["insertion"]
  }

  if ("clickEvent" in sf) {
    //TODO: Test this!
    snippet.click_event_type = sf["clickEvent"]["action"] as ClickEventType
    if (snippet.click_event_type !== ClickEventType.none) {
        snippet.click_event_value = sf["clickEvent"]["value"]
    }
  }

  if ("hoverEvent" in sf) {
      snippet.hover_event_type = sf["hoverEvent"]["action"] as HoverEventType

      /* Can't import show_text */
      if (snippet.hover_event_type !== HoverEventType.none && snippet.hover_event_type !== HoverEventType.show_text) {
          snippet.hover_event_type = sf["hoverEvent"]["value"]
      }
  }

  return snippet
}