import * as React from "react";
import { KeybindSnippet } from "../../classes/Snippets/SnippetTypes/KeybindSnippet";

export interface KeybindSnippetDetailControllerProps {
  snippet: KeybindSnippet
  updateSnippet: (snippet: KeybindSnippet) => void
}

export class KeybindSnippetDetailController extends React.Component<KeybindSnippetDetailControllerProps, {}> {
  constructor(props: KeybindSnippetDetailControllerProps) {
    super(props)

    this.state = {}
    
    this.changeKeybind = this.changeKeybind.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  changeKeybind(event: any) {
    this.updateField("keybind", event.target.value)
  }

  updateField(field: string, value: any) {
    let newSnippet = this.props.snippet.copy()
    newSnippet[field] = value
    this.props.updateSnippet(newSnippet)
  }

  render() {
    return <input list="datalist-keybinds" className="form-control" placeholder="Keybind" value={this.props.snippet.keybind} onChange={this.changeKeybind} />
  }
}