import * as React from "react";
import { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";
import { InlineEditButton } from "../InlineEditButton";
import { InlineSnippetControllerProps } from "./InlineSnippetController";

export interface InlineTextSnippetControllerProps {
  snippet: TextSnippet
  updateSnippet: (Snippet) => void
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
      <input className="form-control" placeholder="Text..." value={this.props.snippet.text} onChange={this.changeText} />
    )
  }
}