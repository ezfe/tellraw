import { copy_standard_attributes } from "../../../helpers/copy_snippet";
import { legacy_apply_common_formatting } from "../../../helpers/legacy_apply_styles";
import { Snippet, FieldSpecifier } from "./Snippet";

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

  static load_legacy(sf: any): TextSnippet {
    let snippet = new TextSnippet(null)

    snippet.text = sf["text"]
    snippet = legacy_apply_common_formatting(snippet, sf)

    return snippet
  }

  editor_fields(): Array<FieldSpecifier> {
    return [{field: "text", placeholder: "Text"}]
  }
}