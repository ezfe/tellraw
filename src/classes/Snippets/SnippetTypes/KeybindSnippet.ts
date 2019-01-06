import { duplicate_standard_attributes } from "../../../helpers/copy_snippet";
import { legacy_apply_common_formatting } from "../../../helpers/legacy_apply_styles";
import { Snippet } from "./Snippet";

export class KeybindSnippet extends Snippet {
  id: string

  keybind: string = ""

  constructor(id: string = null) {
    super(id)
  }

  copy(): KeybindSnippet {
    let newValue = new KeybindSnippet(this.id)

    newValue.keybind = this.keybind

    duplicate_standard_attributes(this, newValue)
    
    return newValue
  }

  static load_legacy(sf: any): KeybindSnippet {
    let snippet = new KeybindSnippet(null)

    // There is no legacy equivalant 
    snippet = legacy_apply_common_formatting(snippet, sf)

    return snippet
  }
}