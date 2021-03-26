import { copy_standard_attributes } from "../../../helpers/copy_standard_attributes";
import type { Color } from "../../Color";
import { FieldSpecifier, Snippet } from "./Snippet";

export class ScoreboardObjectiveSnippet extends Snippet {
  id: string

  score_name: string = ""
  score_objective: string = ""
  score_value: string = null

  // Shared Formatting
  bold: boolean = false
  italic: boolean = false
  underlined: boolean = false
  strikethrough: boolean = false
  obfuscated: boolean = false

  color: Color = "none"

  insertion: string = ""

  copy(): ScoreboardObjectiveSnippet {
  	let newValue = new ScoreboardObjectiveSnippet(this.id);

  	newValue.score_name = this.score_name;
  	newValue.score_objective = this.score_objective;
  	newValue.score_value = this.score_value;

  	copy_standard_attributes(this, newValue);

  	return newValue;
  }
  
  editor_fields(): Array<FieldSpecifier> {
  	return [
  		{
  			field: "score_name",
  			placeholder: "Player",
  			datalistID: null,
  			fieldType: "string"
  		},
  		{
  			field: "score_objective",
  			placeholder: "Objective",
  			datalistID: null,
  			fieldType: "string"
  		}
  	];
  }
}