import * as React from "react";
import { SelectorSnippet } from "../../classes/Snippets/SelectorSnippet";

export interface SelectorSnippetDetailControllerProps {
  snippet: SelectorSnippet
  updateSnippet: (snippet: SelectorSnippet) => void
}

export class SelectorSnippetDetailController extends React.Component<SelectorSnippetDetailControllerProps, {}> {
  constructor(props: SelectorSnippetDetailControllerProps) {
    super(props)

    this.state = {}
    
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
    return <input className="form-control" placeholder="Selector" value={this.props.snippet.selector} onChange={this.changeSelector} />
  }
}