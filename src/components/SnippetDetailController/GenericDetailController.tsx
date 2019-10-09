import * as React from "react";
import { GenericFieldCompatable } from "../InlineSnippetController/InlineGenericSnippetController";
import { FieldSpecifier } from "../../classes/Snippets/SnippetTypes/Snippet";

export interface GenericSnippetDetailControllerProps {
  snippet: GenericFieldCompatable
  updateSnippet: (Snippet) => void
}

export class GenericSnippetDetailController extends React.Component<GenericSnippetDetailControllerProps, {}> {
  constructor(props: GenericSnippetDetailControllerProps) {
    super(props)
    
    this.updateField = this.updateField.bind(this)
  }

  updateField(field: FieldSpecifier, event: any) {
    let newSnippet = this.props.snippet.copy()
    newSnippet[field.field] = event.target.value
    this.props.updateSnippet(newSnippet)
  }

  render() {
    return this.props.snippet.editor_fields().map((field, index) => {
        return (
          <div key={index} className={`row ${index > 0 ? "mt-2" : ""}`}>
            <div className="col" key={index}>
              <input className="form-control" placeholder={field.placeholder} value={this.props.snippet[field.field]} onChange={(evt) => { this.updateField(field, evt) }} />
            </div>
          </div>
        )
      })
  }
}