import * as React from "react";
import { KeybindSnippet } from "../../classes/Snippets/KeybindSnippet";

export interface KeybindSnippetDetailControllerProps {
  snippet: KeybindSnippet
  updateSnippet: (Snippet) => void
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
    return (
      <>
        <input className="form-control" placeholder="Keybind" value={this.props.snippet.keybind} onChange={this.changeKeybind} />
        <br />
        <p>
          There is a list of valid values in the Options.txt specification on the wiki, <a href="https://minecraft.gamepedia.com/Options.txt" target="_">here</a>. Scroll
          down to the Controls section, and find the keybind you want to use. Remove the <code>key_</code> part. For example,
          to enter in the key to attack, use <code>key.attack</code>.
        </p>
      </>
    )
  }
}