import * as React from "react";
import { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";
import { InlineEditButton } from "../InlineEditButton";
import { InlineSnippetControllerProps } from "./InlineSnippetController";

export interface InlineTextSnippetControllerProps extends InlineSnippetControllerProps {
  snippet: TextSnippet
}

export class InlineTextSnippetController extends React.Component<InlineTextSnippetControllerProps, {}> {

  constructor(props: InlineTextSnippetControllerProps) {
    super(props)

    this.changeText = this.changeText.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  changeText(event: any) {
    this.updateField("text", event.target.value)
  }

  updateField(field: string, value: any) {
    let newSnippet = this.props.snippet.copy()
    newSnippet[field] = value
    this.props.updateSnippet(newSnippet)
  }

  render() {
    return (
      <div className="row margin-below">
        <div className="col-1 col-sm-2">
          <InlineEditButton onClick={() => { this.props.startEditingSnippet(this.props.snippet) }} />
        </div>
        <div className="col">
          <input className="form-control" placeholder="Text..." value={this.props.snippet.text} onChange={this.changeText} />
        </div>
      </div>
    )
  }
}