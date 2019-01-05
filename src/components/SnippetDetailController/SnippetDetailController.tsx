import * as React from "react";
import { Color } from "../../classes/Color";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../../classes/Snippets/SelectorSnippet";
import { Snippet } from "../../classes/Snippets/Snippet";
import { TextSnippet } from "../../classes/Snippets/TextSnippet";
import { TextSnippetDetailController } from "./TextSnippetDetailController";
import { SelectorSnippetDetailController } from "./SelectorSnippetDetailController";
import { ScoreboardObjectiveSnippetDetailController } from "./ScoreboardObjectiveDetailController";
import { KeybindSnippet } from "../../classes/Snippets/KeybindSnippet";
import { KeybindSnippetDetailController } from "./KeybindSnippetDetailController";
import { copy } from "../../helpers/copy_snippet";

export interface SnippetDetailControllerProps {
  snippet: Snippet
  updateSnippet: (Snippet) => void
  stopEditing: (boolean) => void
}

export interface SnippetDetailControllerState {
  
}

export class SnippetDetailController extends React.Component<SnippetDetailControllerProps, SnippetDetailControllerState> {
  
  constructor(props: SnippetDetailControllerProps) {
    super(props)
    
    console.log(this.props)

    this.state = {}

    this.changeColor = this.changeColor.bind(this)
    this.updateField = this.updateField.bind(this)
    this.customAreaRender = this.customAreaRender.bind(this)
  }

  changeColor(event: any) {
    this.updateField("color", event.target.value)
  }

  updateField(field: string, value: any) {
    let newSnippet = copy(this.props.snippet)
    newSnippet[field] = value
    this.props.updateSnippet(newSnippet)
  }

  customAreaRender() {
    if (this.props.snippet instanceof TextSnippet) {
      return <TextSnippetDetailController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} />
    } else if (this.props.snippet instanceof SelectorSnippet) {
      return <SelectorSnippetDetailController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} />
    } else if (this.props.snippet instanceof ScoreboardObjectiveSnippet) {
      return <ScoreboardObjectiveSnippetDetailController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} />
    } else if (this.props.snippet instanceof KeybindSnippet) {
      return <KeybindSnippetDetailController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} />
    } else {
      return <span>{typeof this.props.snippet} isn't implemented supported renderer</span>
    } 
  }

  render() {
    return (
      <>
        {/* <div className="row margin-below">
          <div className="col">
            <select className="form-control" onChange={this.changeSnippetType} value={this.props.snippet.type}>
              <option value={SnippetType.text}>Plain Text</option>
              <option value={SnippetType.selector}>Selector</option>
              <option value={SnippetType.scoreboardObjective}>Scoreboard Objective</option>
            </select>
          </div>
        </div> */}

        <div className="row">
          <div className="col">
            { this.customAreaRender() }
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