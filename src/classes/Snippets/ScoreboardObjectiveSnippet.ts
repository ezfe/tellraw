import { Snippet } from "./Snippet";
import { legacy_apply_common_formatting } from "../../helpers/legacy_apply_styles";
import { Color } from "../Color";
import uuid = require("uuid");

export class ScoreboardObjectiveSnippet implements Snippet {
  id: string

  score_name: string = ""
  score_objective: string = ""

  // Shared Formatting
  bold: boolean = false
  italic: boolean = false
  underlined: boolean = false
  strikethrough: boolean = false
  obfuscated: boolean = false

  color: Color = Color.none

  insertion: string = ""
  
  constructor(id: string = null) {
    if (id !== null) {
      this.id = id
    } else {
      this.id = uuid()
    }
  }

  copy(): ScoreboardObjectiveSnippet {
    console.log("Copying Scoreboard Objective Snippet")
    let newValue = new ScoreboardObjectiveSnippet()

    newValue.score_name = this.score_name
    newValue.score_objective = this.score_objective

    newValue.bold = this.bold
    newValue.italic = this.italic
    newValue.underlined = this.underlined
    newValue.strikethrough = this.strikethrough
    newValue.obfuscated = this.obfuscated

    newValue.color = this.color

    newValue.insertion = this.insertion

    return newValue
  }

  static load_legacy(sf: any): ScoreboardObjectiveSnippet {
    let snippet = new ScoreboardObjectiveSnippet(null)

    snippet.score_name = sf["score"]["name"]
    snippet.score_objective = sf["score"]["objective"]
    snippet = legacy_apply_common_formatting(snippet, sf)

    return snippet
  }

}