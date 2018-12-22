import * as React from "react";
import { Color } from "../../classes/Color";
import { SnippetDetailControllerProps } from "./SnippetDetailController";
import { SelectorSnippet } from "../../classes/Snippets/SelectorSnippet";

export interface SelectorSnippetDetailControllerProps extends SnippetDetailControllerProps {
  snippet: SelectorSnippet
}

export class SelectorSnippetDetailController extends React.Component<SelectorSnippetDetailControllerProps, {}> {
  constructor(props: SelectorSnippetDetailControllerProps) {
    super(props)

    this.state = {}
    
    this.changeSelector = this.changeSelector.bind(this)
    this.changeColor = this.changeColor.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  changeSelector(event: any) {
    this.updateField("selector", event.target.value)
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
            <input className="form-control" placeholder="Selector" value={this.props.snippet.selector} onChange={this.changeSelector} />   
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