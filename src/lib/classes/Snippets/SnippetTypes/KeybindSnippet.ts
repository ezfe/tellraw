import { copy_standard_attributes } from "$lib/helpers/copy_standard_attributes";
import type { FieldSpecifier } from "./Snippet";
import { Snippet } from "./Snippet";

export class KeybindSnippet extends Snippet {
  id: string

  keybind = ""

  copy(): KeybindSnippet {
    const newValue = new KeybindSnippet(this.id)

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