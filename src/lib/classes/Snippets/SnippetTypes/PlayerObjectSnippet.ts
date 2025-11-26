import { copy_standard_attributes } from '../../../helpers/copy_standard_attributes';
import type { FieldSpecifier } from './Snippet';
import { Snippet } from './Snippet';

export class PlayerObjectSnippet extends Snippet {
	playerName = '';

	copy(): PlayerObjectSnippet {
		const newValue = new PlayerObjectSnippet(this.id);

		newValue.playerName = this.playerName;

		copy_standard_attributes(this, newValue);

		return newValue;
	}

	editor_fields(): Array<FieldSpecifier> {
		return [
			{ field: 'playerName', placeholder: 'Player Name', datalistID: null, fieldType: 'string' }
		];
	}
}
