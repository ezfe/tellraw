import { copy_standard_attributes } from "../../../helpers/copy_snippet";
import { legacy_apply_common_formatting } from "../../../helpers/legacy_apply_styles";
import { Snippet } from "./Snippet";

export class SelectorSnippet extends Snippet {
  id: string

  selector: string = ""

  constructor(id: string = null) {
    super(id)
  }

  copy(): SelectorSnippet {
    let newValue = new SelectorSnippet(this.id)

    newValue.selector = this.selector

    copy_standard_attributes(this, newValue)
    
    return newValue
  }

  static load_legacy(sf: any): SelectorSnippet {
    let snippet = new SelectorSnippet(null)

    snippet.selector = sf["selector"]
    snippet = legacy_apply_common_formatting(snippet, sf)

    return snippet
  }
}