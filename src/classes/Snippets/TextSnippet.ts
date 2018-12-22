import { Snippet } from "./Snippet";
import { legacy_apply_common_formatting } from "../../helpers/legacy_apply_styles";
import { Color } from "../Color";
import uuid = require("uuid");

export class TextSnippet implements Snippet {
  id: string

  text: string = ""

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

  copy(): TextSnippet {
    console.log("Copying Text Snippet")
      let newValue = new TextSnippet()

      newValue.text = this.text

      newValue.bold = this.bold
      newValue.italic = this.italic
      newValue.underlined = this.underlined
      newValue.strikethrough = this.strikethrough
      newValue.obfuscated = this.obfuscated

      newValue.color = this.color

      newValue.insertion = this.insertion

      return newValue
  }

  static load_legacy(sf: any): TextSnippet {
    let snippet = new TextSnippet(null)

    snippet.text = sf["text"]
    snippet = legacy_apply_common_formatting(snippet, sf)

    return snippet
  }
}