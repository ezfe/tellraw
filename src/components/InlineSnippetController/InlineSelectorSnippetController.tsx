import * as React from "react";
import { InlineEditButton } from "../InlineEditButton";
import { InlineSnippetControllerProps } from "./InlineSnippetController";
import { SelectorSnippet } from "../../classes/Snippets/SelectorSnippet";

export interface InlineSelectorSnippetControllerProps extends InlineSnippetControllerProps {
  snippet: SelectorSnippet
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
      <div className="row margin-below">
        <div className="col-1">
          <InlineEditButton onClick={() => { this.props.startEditingSnippet(this.props.snippet) }} />
        </div>
        <div className="col">
          <input className="form-control" placeholder="Selector..." value={this.props.snippet.selector} onChange={this.changeSelector} />
        </div>
      </div>
    )
  }
}