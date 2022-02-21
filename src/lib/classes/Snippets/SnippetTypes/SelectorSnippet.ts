import { copy_standard_attributes } from '../../../helpers/copy_standard_attributes';
import type { FieldSpecifier } from './Snippet';
import { Snippet } from './Snippet';

export class SelectorSnippet extends Snippet {
	id: string;

	selector = '';

	constructor(id: string = null) {
		super(id);
	}

	copy(): SelectorSnippet {
		const newValue = new SelectorSnippet(this.id);

		newValue.selector = this.selector;

		copy_standard_attributes(this, newValue);

		return newValue;
	}

	editor_fields(): Array<FieldSpecifier> {
		return [
			{
				field: 'selector',
				placeholder: 'Selector',
				datalistID: null,
				fieldType: 'string'
			}
		];
	}
}
