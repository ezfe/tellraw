import { copy_standard_attributes } from "../../../helpers/copy_standard_attributes";
import { FieldSpecifier, Snippet } from "./Snippet";

export class TranslateSnippet extends Snippet {
	id: string
	
	translate: string = ""
	parameters: string[] = []
	
	constructor(id: string = null) {
		super(id);
	}
	
	copy(): TranslateSnippet {
		let newValue = new TranslateSnippet(this.id);
		
		newValue.translate = this.translate;
		newValue.parameters = [...this.parameters];
		
		copy_standard_attributes(this, newValue);
		
		return newValue;
	}
	
	editor_fields(): Array<FieldSpecifier> {
		return [
			{
				field: "translate",
				placeholder: "Translate Identifier",
				datalistID: "datalist-translations",
				fieldType: "string"
			},
			{
				field: "parameters",
				placeholder: "Translation Parameters",
				datalistID: null,
				fieldType: "string[]"
			}
		];
	}
}