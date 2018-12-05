import { Snippet } from "./Snippet";
import { legacy_apply_common_formatting } from "../../helpers";

export class ScoreboardObjectiveSnippet extends Snippet {
  score_name: string = ""
  score_objective: string = ""

  copyFile() : ScoreboardObjectiveSnippet {
      let newValue = (Object as any).assign(new ScoreboardObjectiveSnippet(), super.copy())

      newValue.score_name = this.score_name
      newValue.score_objective = this.score_objective

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