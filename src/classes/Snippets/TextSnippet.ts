import { Snippet } from "./Snippet";
import { legacy_apply_common_formatting } from "../../helpers";

export class TextSnippet extends Snippet {
  text: string = ""

  copy(): TextSnippet {
      let newValue = (Object as any).assign(new TextSnippet(), super.copy())

      newValue.text = this.text

      return newValue
  }

  static load_legacy(sf: any): TextSnippet {
    let snippet = new TextSnippet(null)

    snippet.text = sf["text"]
    snippet = legacy_apply_common_formatting(snippet, sf)

    return snippet
  }
}