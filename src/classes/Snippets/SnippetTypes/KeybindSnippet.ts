import { copy_standard_attributes } from "../../../helpers/copy_snippet";
import { FieldSpecifier, Snippet } from "./Snippet";

export class KeybindSnippet extends Snippet {
  id: string

  keybind: string = ""

  copy(): KeybindSnippet {
    let newValue = new KeybindSnippet(this.id)

    newValue.keybind = this.keybind

    copy_standard_attributes(this, newValue)
    
    return newValue
  }

  editor_fields(): Array<FieldSpecifier> {
    return [{
      field: "keybind",
      placeholder: "Keybind",
      datalistID: "datalist-keybinds",
      fieldType: "string"
    }]
  }
}