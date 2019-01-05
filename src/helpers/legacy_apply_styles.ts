import { Snippet } from "../classes/Snippets/Snippet";
import { Color } from "../classes/Color";
import { ClickEventType } from "../classes/Snippets/ClickEvent";

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
    snippet.click_event_value = sf["clickEvent"]["value"]
  }

  return snippet
}