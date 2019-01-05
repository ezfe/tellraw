import * as React from "react";
import { Color } from "../../classes/Color";
import { SnippetDetailControllerProps } from "./SnippetDetailController";
import { KeybindSnippet } from "../../classes/Snippets/KeybindSnippet";

export interface KeybindSnippetDetailControllerProps extends SnippetDetailControllerProps {
  snippet: KeybindSnippet
}

export class KeybindSnippetDetailController extends React.Component<KeybindSnippetDetailControllerProps, {}> {
  constructor(props: KeybindSnippetDetailControllerProps) {
    super(props)

    this.state = {}
    
    this.changeKeybind = this.changeKeybind.bind(this)
    this.changeColor = this.changeColor.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  changeKeybind(event: any) {
    this.updateField("keybind", event.target.value)
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
            <input className="form-control" placeholder="Keybind" value={this.props.snippet.keybind} onChange={this.changeKeybind} />
            <br />
            <p>
              There is a list of valid values in the Options.txt specification on the wiki, <a href="https://minecraft.gamepedia.com/Options.txt" target="_">here</a>. Scroll
              down to the Controls section, and find the keybind you want to use. Remove the <code>key_</code> part. For example,
              to enter in the key to attack, use <code>key.attack</code>.
            </p>
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