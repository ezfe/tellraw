import * as React from "react";
import { InlineEditButton } from "../InlineEditButton";
import { InlineSnippetControllerProps } from "./InlineSnippetController";
import { KeybindSnippet } from "../../classes/Snippets/KeybindSnippet";

export interface InlineKeybindSnippetControllerProps extends InlineSnippetControllerProps {
  snippet: KeybindSnippet
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
    return (
      <div className="row margin-below">
        <div className="col-1">
          <InlineEditButton onClick={() => { this.props.startEditingSnippet(this.props.snippet) }} />
        </div>
        <div className="col">
          <input className="form-control" placeholder="Selector..." value={this.props.snippet.keybind} onChange={this.changeKeybind} />
        </div>
      </div>
    )
  }
}