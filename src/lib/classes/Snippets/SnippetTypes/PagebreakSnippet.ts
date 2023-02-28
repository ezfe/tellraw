import { Snippet } from './Snippet';

export class PagebreakSnippet extends Snippet {
	// This is to allow detection of this snippet
	// since it has no identifiable traits when
	// serialized
	isPagebreak = true;

	constructor(id: string | null = null) {
		super(id);
	}

	copy(): PagebreakSnippet {
		return new PagebreakSnippet(this.id);
	}
}
