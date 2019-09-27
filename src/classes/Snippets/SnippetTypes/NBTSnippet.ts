import { copy_standard_attributes } from "../../../helpers/copy_snippet";
import { legacy_apply_common_formatting } from "../../../helpers/legacy_apply_styles";
import { Snippet } from "./Snippet";

export class NBTSnippet extends Snippet {
  id: string

  nbt: string = ""
  storage: string = ""

  constructor(id: string = null) {
    super(id)
  }

  copy(): NBTSnippet {
    let newValue = new NBTSnippet(this.id)

    newValue.nbt = this.nbt
    newValue.storage = this.storage

    copy_standard_attributes(this, newValue)
    
    return newValue
  }
}