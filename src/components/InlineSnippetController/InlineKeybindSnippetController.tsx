import * as React from "react";
import { KeybindSnippet } from "../../classes/Snippets/SnippetTypes/KeybindSnippet";
import { InlineSnippetControllerProps } from "./InlineSnippetController";

export interface InlineKeybindSnippetControllerProps {
  snippet: KeybindSnippet
  updateSnippet: (Snippet) => void
}

export class InlineKeybindSnippetController extends React.Component<InlineKeybindSnippetControllerProps, {}> {

  constructor(props: InlineKeybindSnippetControllerProps) {
    super(props)

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
    return <input className="form-control"
                  placeholder="Selector..."
                  value={this.props.snippet.keybind}
                  onChange={this.changeKeybind} />
  }
}