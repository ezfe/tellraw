import { Snippet } from "./Snippet";
import { legacy_apply_common_formatting } from "../../helpers/legacy_apply_styles";

export class SelectorSnippet extends Snippet {
  selector: string = ""

  copy(): SelectorSnippet {
    console.log("Copying SelectorSnippet")
      let newValue = (Object as any).assign(new SelectorSnippet(), super.copy())

      newValue.selector = this.selector

      return newValue
  }

  static load_legacy(sf: any): SelectorSnippet {
    let snippet = new SelectorSnippet(null)

    snippet.selector = sf["selector"]
    snippet = legacy_apply_common_formatting(snippet, sf)

    return snippet
  }
}