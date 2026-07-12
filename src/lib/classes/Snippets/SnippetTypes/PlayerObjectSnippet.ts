import { copy_standard_attributes } from '../../../helpers/copy_standard_attributes';
import type { FieldSpecifier } from './Snippet';
import { Snippet } from './Snippet';

export class PlayerObjectSnippet extends Snippet {
	playerName = '';
	fallback = '';

	copy(): PlayerObjectSnippet {
		const newValue = new PlayerObjectSnippet(this.id);

		newValue.playerName = this.playerName;
		newValue.fallback = this.fallback;

		copy_standard_attributes(this, newValue);

		return newValue;
	}

	editor_fields(): Array<FieldSpecifier> {
		return [
			{ field: 'playerName', placeholder: 'Player Name', datalistID: null, fieldType: 'string' },
			{ field: 'fallback', placeholder: 'Fallback', datalistID: null, fieldType: 'string' }
		];
	}
}
