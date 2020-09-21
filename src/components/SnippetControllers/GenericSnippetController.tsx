import * as React from "react";
import { KeybindSnippet } from "../../classes/Snippets/SnippetTypes/KeybindSnippet";
import { NBTSnippet } from "../../classes/Snippets/SnippetTypes/NBTSnippet";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../../classes/Snippets/SnippetTypes/SelectorSnippet";
import { FieldSpecifier, Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";
import { TranslateSnippet } from "../../classes/Snippets/SnippetTypes/TranslateSnippet";

export type GenericFieldCompatable = ScoreboardObjectiveSnippet | NBTSnippet | KeybindSnippet | SelectorSnippet | TextSnippet | TranslateSnippet

export interface GenericSnippetControllerProps {
  snippet: GenericFieldCompatable
  updateSnippet: (snippet: Snippet) => void
}

export const GenericSnippetController: React.FunctionComponent<GenericSnippetControllerProps> = ({ snippet, updateSnippet }) => {

  function updateField(field: FieldSpecifier, event: any, index: number | null = null) {
    let newSnippet = snippet.copy()
    if (field.fieldType == "string") {
      newSnippet[field.field] = event.target.value
    } else if (field.fieldType == "string[]") {
      newSnippet[field.field][index] = event.target.value
    } else {
      console.error("Unexpected fieldType", field.fieldType)
    }
    updateSnippet(newSnippet)
  }
  
  function extendArray(field: FieldSpecifier) {
    let newSnippet = snippet.copy()
    newSnippet[field.field].push("")
    updateSnippet(newSnippet)
  }

  return (
    <div className="row">
      {
        snippet.editor_fields().map((field, index) => {
          if (field.fieldType == "string") {
            return (
              <div className="col-6" key={index}>
                <input
                  list={field.datalistID}
                  className="form-control"
                  placeholder={field.placeholder}
                  value={snippet[field.field]}
                  onChange={(evt) => { updateField(field, evt) }}
                />
              </div>
            )
          } else if (field.fieldType == "string[]") {
            return (
              <div className="col-6" key={index}>
                {
                  snippet[field.field].map((value: string, subIndex: number) => {
                    <div className="row">
                      <div className="col">
                        <input
                          list={field.datalistID}
                          className="form-control"
                          placeholder={`${field.placeholder} #${subIndex + 1}`}
                          value={value}
                          onChange={(evt) => { updateField(field, evt, subIndex) }}
                        />
                      </div>
                    </div>
                  })
                }
                <div className="row">
                  <div className="col">
                    <button onClick={() => { extendArray(field) }}>
                      Add...
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        })
      }
    </div>
  )
}