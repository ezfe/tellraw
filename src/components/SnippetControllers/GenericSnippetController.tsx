import * as React from "react";
import { KeybindSnippet } from "../../classes/Snippets/SnippetTypes/KeybindSnippet";
import { NBTSnippet } from "../../classes/Snippets/SnippetTypes/NBTSnippet";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../../classes/Snippets/SnippetTypes/SelectorSnippet";
import { FieldSpecifier } from "../../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";

export type GenericFieldCompatable = ScoreboardObjectiveSnippet | NBTSnippet | KeybindSnippet | SelectorSnippet | TextSnippet

export interface GenericSnippetControllerProps {
  snippet: GenericFieldCompatable
  updateSnippet: (Snippet) => void
}

export const GenericSnippetController: React.FunctionComponent<GenericSnippetControllerProps> = ({ snippet, updateSnippet }) => {

  function updateField(field: FieldSpecifier, event: any) {
    let newSnippet = snippet.copy()
    newSnippet[field.field] = event.target.value
    updateSnippet(newSnippet)
  }

  return (
    <div className="row">
      {
        snippet.editor_fields().map((field, index) => {
          return (
            <div className="col" key={index}>
              <input
                list={field.datalistID}
                className="form-control"
                placeholder={field.placeholder}
                value={snippet[field.field]}
                onChange={(evt) => { updateField(field, evt) }}
              />
            </div>
          )
        })
      }
    </div>
  )
}