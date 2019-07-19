import * as React from "react";
import { SelectorSnippet } from "../../classes/Snippets/SnippetTypes/SelectorSnippet";
import { InlineEditButton } from "./InlineEditButton";
import { InlineSnippetControllerProps } from "./InlineSnippetController";

export interface InlineSelectorSnippetControllerProps {
  snippet: SelectorSnippet
  updateSnippet: (Snippet) => void
}

export class InlineSelectorSnippetController extends React.Component<InlineSelectorSnippetControllerProps, {}> {

  constructor(props: InlineSelectorSnippetControllerProps) {
    super(props)

    this.changeSelector = this.changeSelector.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  changeSelector(event: any) {
    this.updateField("selector", event.target.value)
  }

  updateField(field: string, value: any) {
    let newSnippet = this.props.snippet.copy()
    newSnippet[field] = value
    this.props.updateSnippet(newSnippet)
  }

  render() {
    return (
      <input className="form-control" placeholder="Selector..." value={this.props.snippet.selector} onChange={this.changeSelector} />
    )
  }
}