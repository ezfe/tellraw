import { Snippet } from "./Snippet";

export class PagebreakSnippet extends Snippet {
  id: string

  // This is to allow detection of this snippet
  // since it has no identifiable traits when
  // serialized
  isPagebreak: boolean = true

  constructor(id: string = null) {
  	super(id);
  }

  copy(): PagebreakSnippet {
  	return new PagebreakSnippet(this.id);
  }
}