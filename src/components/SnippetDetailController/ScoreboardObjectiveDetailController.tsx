import * as React from "react";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/ScoreboardObjectiveSnippet";

export interface ScoreboardObjectiveSnippetDetailControllerProps {
  snippet: ScoreboardObjectiveSnippet
  updateSnippet: (snippet: ScoreboardObjectiveSnippet) => void
}

export class ScoreboardObjectiveSnippetDetailController extends React.Component<ScoreboardObjectiveSnippetDetailControllerProps, {}> {
  constructor(props: ScoreboardObjectiveSnippetDetailControllerProps) {
    super(props)

    this.state = {}
    
    this.changeName = this.changeName.bind(this)
    this.changeObjective = this.changeObjective.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  changeName(event: any) {
    this.updateField("score_name", event.target.value)
  }

  changeObjective(event: any) {
    this.updateField("score_objective", event.target.value)
  }

  updateField(field: string, value: any) {
    let newSnippet = this.props.snippet.copy()
    newSnippet[field] = value
    this.props.updateSnippet(newSnippet)
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col">
            <input className="form-control" placeholder="Scoreboard Name" value={this.props.snippet.score_name} onChange={this.changeName} />   
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input className="form-control" placeholder="Scoreboard Objective" value={this.props.snippet.score_objective} onChange={this.changeObjective} />   
          </div>
        </div>
      </>
    )
  }
}