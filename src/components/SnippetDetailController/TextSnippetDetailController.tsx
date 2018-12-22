import * as React from "react";
import { Color } from "../../classes/Color";
import { TextSnippet } from "../../classes/Snippets/TextSnippet";
import { SnippetDetailControllerProps } from "./SnippetDetailController";

export interface TextSnippetDetailControllerProps extends SnippetDetailControllerProps {
  snippet: TextSnippet
}

export class TextSnippetDetailController extends React.Component<TextSnippetDetailControllerProps, {}> {
  constructor(props: TextSnippetDetailControllerProps) {
    super(props)

    this.state = {}
    
    this.changeText = this.changeText.bind(this)
    this.changeColor = this.changeColor.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  changeText(event: any) {
    this.updateField("text", event.target.value)
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
            <input className="form-control" placeholder="Text" value={this.props.snippet.text} onChange={this.changeText} />   
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