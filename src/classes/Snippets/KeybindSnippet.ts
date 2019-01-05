import { Snippet } from "./Snippet";
import { legacy_apply_common_formatting } from "../../helpers/legacy_apply_styles";

export class KeybindSnippet extends Snippet {
  id: string

  keybind: string = ""

  constructor(id: string = null) {
    super(id)
  }

  copy(): KeybindSnippet {
    console.log("Copying SelectorSnippet")
      let newValue = new KeybindSnippet(this.id)

      newValue.keybind = this.keybind

      newValue.bold = this.bold
      newValue.italic = this.italic
      newValue.underlined = this.underlined
      newValue.strikethrough = this.strikethrough
      newValue.obfuscated = this.obfuscated

      newValue.color = this.color

      newValue.insertion = this.insertion

      newValue.click_event_type = this.click_event_type
      newValue.click_event_value = this.click_event_value
      
      return newValue
  }

  static load_legacy(sf: any): KeybindSnippet {
    let snippet = new KeybindSnippet(null)

    // There is no legacy equivalant 
    snippet = legacy_apply_common_formatting(snippet, sf)

    return snippet
  }
}