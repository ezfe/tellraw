import { Snippet } from "./Snippet";
import { legacy_apply_common_formatting } from "../../helpers/legacy_apply_styles";
import { Color } from "../Color";
import uuid = require("uuid");

export class SelectorSnippet implements Snippet {
  id: string

  selector: string = ""

  // Shared Formatting
  bold: boolean = false
  italic: boolean = false
  underlined: boolean = false
  strikethrough: boolean = false
  obfuscated: boolean = false

  color: Color = Color.none

  insertion: string = ""

  constructor(id: string = null) {
    if (id !== null) {
        this.id = id
    } else {
        this.id = uuid()
    }
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
      
      return newValue
  }

  static load_legacy(sf: any): SelectorSnippet {
    let snippet = new SelectorSnippet(null)

    snippet.selector = sf["selector"]
    snippet = legacy_apply_common_formatting(snippet, sf)

    return snippet
  }
}