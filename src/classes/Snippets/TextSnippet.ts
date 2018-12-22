import { Snippet } from "./Snippet";
import { legacy_apply_common_formatting } from "../../helpers/legacy_apply_styles";

export class TextSnippet extends Snippet {
  text: string = ""

  copy(): TextSnippet {
    console.log("Copying Text Snippet")
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