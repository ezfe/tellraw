import { Snippet } from "./Snippet";

export class TextSnippet extends Snippet {
  text: string = ""

  copy(): TextSnippet {
      let newValue = (Object as any).assign(new TextSnippet(), super.copy())

      newValue.text = this.text

      return newValue
  }
}