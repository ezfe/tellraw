import { TextSnippet } from "./TextSnippet";

export class LinebreakSnippet extends TextSnippet {

  constructor(id: string = null) {
    super(id)

    this.text = "\n"
  }

  copy(): LinebreakSnippet {
    return new LinebreakSnippet(this.id)
  }
}