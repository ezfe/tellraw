import { Snippet } from "./Snippet";

export class PagebreakSnippet extends Snippet {
  id: string
  isPagebreak: boolean = true

  constructor(id: string = null) {
    super(id)
  }

  copy(): PagebreakSnippet {
    return new PagebreakSnippet(this.id)
  }
}