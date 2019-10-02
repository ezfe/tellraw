import * as React from "react";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { FieldSpecifier } from "../../classes/Snippets/SnippetTypes/Snippet";
import { NBTSnippet } from "../../classes/Snippets/SnippetTypes/NBTSnippet";
import { KeybindSnippet } from "../../classes/Snippets/SnippetTypes/KeybindSnippet";
import { SelectorSnippet } from "../../classes/Snippets/SnippetTypes/SelectorSnippet";
import { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";

export type GenericFieldCompatable = ScoreboardObjectiveSnippet | NBTSnippet | KeybindSnippet | SelectorSnippet | TextSnippet

export interface InlineGenericSnippetControllerProps {
  snippet: GenericFieldCompatable
  updateSnippet: (Snippet) => void
}

export class InlineGenericSnippetController extends React.Component<InlineGenericSnippetControllerProps, {}> {

  constructor(props: InlineGenericSnippetControllerProps) {
    super(props)

    this.updateField = this.updateField.bind(this)
  }

  updateField(field: FieldSpecifier, event: any) {
    let newSnippet = this.props.snippet.copy()
    newSnippet[field.field] = event.target.value
    this.props.updateSnippet(newSnippet)
  }

  render() {
    return (
      <div className="row">
        {
          this.props.snippet.editor_fields().map((field, index) => {
            return (
              <div className="col" key={index}>
                <input className="form-control" placeholder={field.placeholder} value={this.props.snippet[field.field]} onChange={(evt) => { this.updateField(field, evt) }} />
              </div>
            )
          })
        }
      </div>
    )
  }
}