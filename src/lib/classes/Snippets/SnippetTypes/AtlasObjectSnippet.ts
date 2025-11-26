import { copy_standard_attributes } from '../../../helpers/copy_standard_attributes';
import type { FieldSpecifier } from './Snippet';
import { Snippet } from './Snippet';

export class AtlasObjectSnippet extends Snippet {
	atlas = '';
	sprite = '';

	copy(): AtlasObjectSnippet {
		const newValue = new AtlasObjectSnippet(this.id);

		newValue.atlas = this.atlas;
		newValue.sprite = this.sprite;

		copy_standard_attributes(this, newValue);

		return newValue;
	}

	editor_fields(): Array<FieldSpecifier> {
		return [
			{ field: 'atlas', placeholder: 'Atlas', datalistID: null, fieldType: 'string' },
			{ field: 'sprite', placeholder: 'Sprite', datalistID: null, fieldType: 'string' }
		];
	}
}
