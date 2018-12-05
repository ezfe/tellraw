import { TextSnippet } from "./TextSnippet";

export class LinebreakSnippet extends TextSnippet {

  constructor(id: string = null) {
    super(id)

    this.text = "\n"
  }

  copy(): LinebreakSnippet {
    return (Object as any).assign(new LinebreakSnippet(), super.copy())
  }
}