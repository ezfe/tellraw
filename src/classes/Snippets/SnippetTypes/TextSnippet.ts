import { copy_standard_attributes } from "../../../helpers/copy_snippet";
import { FieldSpecifier, Snippet } from "./Snippet";

export class TextSnippet extends Snippet {
  id: string

  text: string = ""

  constructor(id: string = null) {
    super(id)
  }

  copy(): TextSnippet {
    let newValue = new TextSnippet(this.id)
  
    newValue.text = this.text

    copy_standard_attributes(this, newValue)
    
    return newValue
  }

  editor_fields(): Array<FieldSpecifier> {
    return [
      {
        field: "text",
        placeholder: "Text",
        datalistID: null,
        fieldType: "string"
      }
    ]
  }
}