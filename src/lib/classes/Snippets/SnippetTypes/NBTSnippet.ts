import { copy_standard_attributes } from '../../../helpers/copy_standard_attributes';
import { Snippet } from './Snippet';

export enum NBTType {
	storage,
	entity,
	block
}

export class NBTSnippet extends Snippet {
	type: NBTType = NBTType.entity;
	nbt = '';
	// This has to remain storage for legacy reasons, but
	// it's actually going to be compiled to whichever field
	// type specifies
	storage = '';
	interpret = false;

	constructor(id: string | null = null) {
		super(id);
	}

	copy(): NBTSnippet {
		let newValue = new NBTSnippet(this.id);

		newValue.nbt = this.nbt;
		newValue.storage = this.storage;
		newValue.type = this.type;
		newValue.interpret = this.interpret;

		copy_standard_attributes(this, newValue);

		return newValue;
	}
}
