import { copy_standard_attributes } from '$lib/helpers/copy_standard_attributes';
import type { FieldSpecifier } from './Snippet';
import { Snippet } from './Snippet';

export class TextSnippet extends Snippet {
	text = '';

	constructor(id: string | null = null) {
		super(id);
	}

	copy(): TextSnippet {
		const newValue = new TextSnippet(this.id);

		newValue.text = this.text;

		copy_standard_attributes(this, newValue);

		return newValue;
	}

	editor_fields(): Array<FieldSpecifier> {
		return [
			{
				field: 'text',
				placeholder: 'Text',
				datalistID: null,
				fieldType: 'string'
			}
		];
	}
}
