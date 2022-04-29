import { copy_standard_attributes } from '../../../helpers/copy_standard_attributes';
import { duplicate_snippet } from '../../../helpers/duplicate_snippet';
import { Snippet } from './Snippet';

export class GroupSnippet extends Snippet {
	id: string;

	children: Array<Snippet> = [];

	constructor(id: string = null) {
		super(id);
	}

	copy(): GroupSnippet {
		let newValue = new GroupSnippet(this.id);

		newValue.children = this.children.map((snippet) => duplicate_snippet(snippet));

		copy_standard_attributes(this, newValue);

		return newValue;
	}
}
