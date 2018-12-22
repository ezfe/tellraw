import * as React from "react";
import { Color } from "../../classes/Color";
import { SnippetDetailControllerProps } from "./SnippetDetailController";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/ScoreboardObjectiveSnippet";

export interface ScoreboardObjectiveSnippetDetailControllerProps extends SnippetDetailControllerProps {
  snippet: ScoreboardObjectiveSnippet
}

export class ScoreboardObjectiveSnippetDetailController extends React.Component<ScoreboardObjectiveSnippetDetailControllerProps, {}> {
  constructor(props: ScoreboardObjectiveSnippetDetailControllerProps) {
    super(props)

    this.state = {}
    
    this.changeName = this.changeName.bind(this)
    this.changeObjective = this.changeObjective.bind(this)
    this.changeColor = this.changeColor.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  changeName(event: any) {
    this.updateField("score_name", event.target.value)
  }

  changeObjective(event: any) {
    this.updateField("score_objective", event.target.value)
  }

  changeColor(event: any) {
    this.updateField("color", event.target.value)
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
          </div>
          <div className="col-4">
            <select className="form-control" onChange={this.changeColor} value={this.props.snippet.color}>
              {
                Object.keys(Color).filter(key => !isNaN(Number(Color[key])))
                  .map(key => {
                    return <option key={Color[key]} value={Color[key]}>{key.split('_').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</option>
                  })
              }
            </select>
          </div>
        </div>

        <div className="row">
          <div className="offset-1 col-2">
            <button className="btn btn-secondary btn-block" onClick={() => { this.props.stopEditing(false) }}>Cancel</button>
          </div>
          <div className="col-2">
            <button className="btn btn-primary btn-block" onClick={() => { this.props.stopEditing(true) }}>Save</button>
          </div>
        </div>
      </>
    )
  }
}