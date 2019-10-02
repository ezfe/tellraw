import { copy_standard_attributes } from "../../../helpers/copy_snippet";
import { legacy_apply_common_formatting } from "../../../helpers/legacy_apply_styles";
import { Color } from "../../Color";
import { Snippet, FieldSpecifier } from "./Snippet";

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

  color: Color = Color.none

  insertion: string = ""

  copy(): ScoreboardObjectiveSnippet {
    let newValue = new ScoreboardObjectiveSnippet(this.id)

    newValue.score_name = this.score_name
    newValue.score_objective = this.score_objective
    newValue.score_value = this.score_value

    copy_standard_attributes(this, newValue)

    return newValue
  }

  static load_legacy(sf: any): ScoreboardObjectiveSnippet {
    let snippet = new ScoreboardObjectiveSnippet(null)

    snippet.score_name = sf["score"]["name"]
    snippet.score_objective = sf["score"]["objective"]
    // There is no legacy support for score_value
    snippet = legacy_apply_common_formatting(snippet, sf)

    return snippet
  }
  
  editor_fields(): Array<FieldSpecifier> {
    return [
      {
        field: "score_name",
        placeholder: "Player"
      },
      {
        field: "score_objective",
        placeholder: "Objective"
      }
    ]
  }
}