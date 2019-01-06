import { Snippet } from "./Snippet";
import { legacy_apply_common_formatting } from "../../helpers/legacy_apply_styles";
import { Color } from "../Color";
import uuid = require("uuid");

export class SelectorSnippet extends Snippet {
  id: string

  selector: string = ""

  constructor(id: string = null) {
    super(id)
  }

  copy(): SelectorSnippet {
    console.log("Copying SelectorSnippet")
      let newValue = new SelectorSnippet(this.id)

      newValue.selector = this.selector

      newValue.bold = this.bold
      newValue.italic = this.italic
      newValue.underlined = this.underlined
      newValue.strikethrough = this.strikethrough
      newValue.obfuscated = this.obfuscated

      newValue.color = this.color

      newValue.insertion = this.insertion

      newValue.click_event_type = this.click_event_type
      newValue.click_event_value = this.click_event_value

      newValue.hover_event_type = this.hover_event_type
      newValue.hover_event_value = this.hover_event_value
      newValue.hover_event_children = this.hover_event_children
      
      return newValue
  }

  static load_legacy(sf: any): SelectorSnippet {
    let snippet = new SelectorSnippet(null)

    snippet.selector = sf["selector"]
    snippet = legacy_apply_common_formatting(snippet, sf)

    return snippet
  }
}