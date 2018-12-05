import { Snippet } from "./Snippet";

export class ScoreboardObjectiveSnippet extends Snippet {
  score_name: string = ""
  score_objective: string = ""

  copyFile() : ScoreboardObjectiveSnippet {
      let newValue = (Object as any).assign(new ScoreboardObjectiveSnippet(), super.copy())

      newValue.score_name = this.score_name
      newValue.score_objective = this.score_objective

      return newValue
  }
}