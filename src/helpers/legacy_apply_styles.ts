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

  const unknownColor: Color | undefined = (<any>Color)[sf["color"]]
  if (unknownColor !== undefined) {
      snippet.color = unknownColor
  } else {
      snippet.color = Color.none
  }
  
  if ("insertion" in sf) {
      snippet.insertion = sf["insertion"]
  }

  if ("clickEvent" in sf) {
    const foundCEType: ClickEventType | undefined = (<any>ClickEventType)[sf["clickEvent"]["action"]]
    if (foundCEType !== undefined && foundCEType !== ClickEventType.none) {
        snippet.click_event_type = foundCEType
        snippet.click_event_value = sf["clickEvent"]["value"]
    }
  }

  if ("hoverEvent" in sf) {
    const foundHEType: HoverEventType | undefined = (<any>HoverEventType)[sf["hoverEvent"]["action"]]
    if (foundHEType !== undefined
        && foundHEType !== HoverEventType.none
        && foundHEType !== HoverEventType.show_text) {
        snippet.hover_event_type = foundHEType
        snippet.hover_event_value = sf["hoverEvent"]["value"]
    }
  }

  return snippet
}