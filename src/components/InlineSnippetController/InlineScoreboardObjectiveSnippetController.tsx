import * as React from "react";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";

export interface InlineScoreboardObjectiveSnippetControllerProps {
  snippet: ScoreboardObjectiveSnippet
  updateSnippet: (Snippet) => void
}

export class InlineScoreboardObjectiveSnippetController extends React.Component<InlineScoreboardObjectiveSnippetControllerProps, {}> {

  constructor(props: InlineScoreboardObjectiveSnippetControllerProps) {
    super(props)

    this.changeScoreName = this.changeScoreName.bind(this)
    this.changeScoreObjective = this.changeScoreObjective.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  changeScoreName(event: any) {
    this.updateField("score_name", event.target.value)
  }

  changeScoreObjective(event: any) {
      this.updateField("score_objective", event.target.value)
  }

  updateField(field: string, value: any) {
    let newSnippet = this.props.snippet.copy()
    newSnippet[field] = value
    this.props.updateSnippet(newSnippet)
  }

  render() {
    return (
      <div className="row mb-2">
        <div className="col">
          <input className="form-control" placeholder="Player" value={this.props.snippet.score_name} onChange={this.changeScoreName} />
        </div>
        <div className="col">
          <input className="form-control" placeholder="Objective" value={this.props.snippet.score_objective} onChange={this.changeScoreObjective} />
        </div>
      </div>
    )
  }
}