import { Snippet } from "./Snippet";

export class SelectorSnippet extends Snippet {
  selector: string = ""

  copy(): SelectorSnippet {
      let newValue = (Object as any).assign(new SelectorSnippet(), super.copy())

      newValue.selector = this.selector

      return newValue
  }
}