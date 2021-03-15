import { copy_standard_attributes } from "../../../helpers/copy_standard_attributes";
import { duplicate_snippet } from "../../../helpers/duplicate_snippet";
import { Snippet } from "./Snippet";

export class TranslateSnippet extends Snippet {
	id: string

	translate: string = ""
	parameters: Array<Snippet> = []

	constructor(id: string = null) {
		super(id)
	}

	copy(): TranslateSnippet {
		let newValue = new TranslateSnippet(this.id)

		newValue.translate = this.translate
		newValue.parameters = this.parameters.map(s => duplicate_snippet(s))

		copy_standard_attributes(this, newValue)

		return newValue
	}
}