import { Snippet } from "../classes/Snippets/Snippet";
import { Color } from "../classes/Color";

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

  snippet.color = <Color>sf["color"]
  
  if ("insertion" in sf) {
      snippet.insertion = sf["insertion"]
  }

  return snippet
}