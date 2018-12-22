import { TextSnippet } from "./TextSnippet";

export class LinebreakSnippet extends TextSnippet {

  constructor(id: string = null) {
    super(id)

    this.text = "\n"
  }

  copy(): LinebreakSnippet {
    console.log("Copying Linebreak Snippet")
    return (Object as any).assign(new LinebreakSnippet(), super.copy())
  }
}