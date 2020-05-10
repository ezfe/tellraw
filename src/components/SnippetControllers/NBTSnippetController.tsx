import * as React from "react";
import { NBTSnippet, NBTType } from "../../classes/Snippets/SnippetTypes/NBTSnippet";
import { versionAtLeast, Version } from "../../helpers/versions";

export interface NBTSnippetControllerProps {
  snippet: NBTSnippet
  updateSnippet: (Snippet) => void
  version: Version
}

export const NBTSnippetController: React.FunctionComponent<NBTSnippetControllerProps> = (props) => {

  function updateField(field: string, event: any) {
    let newSnippet = props.snippet.copy()
    newSnippet[field] = event.target.value
    props.updateSnippet(newSnippet)
  }

  function changeNBTType(event: any) {
    let newSnippet = props.snippet.copy()
    newSnippet.type = event.target.value
    props.updateSnippet(newSnippet)
  }

  return (
    <>
      <div className="row mb-2">
        <div className="col">
          <select className="custom-select" value={props.snippet.type} onChange={changeNBTType}>
            <option key={NBTType.storage} value={NBTType.storage} disabled={!versionAtLeast(props.version, "1.15")}>
              Storage
              {
                versionAtLeast(props.version, "1.15") ? null : (
                  " (Requires 1.15+)"
                )
              }
            </option>
            <option key={NBTType.entity} value={NBTType.entity}>Entity</option>
            <option key={NBTType.block} value={NBTType.block}>Block</option>
          </select>
        </div>
        <div className="col">
          <input className="form-control" value={props.snippet.storage} placeholder="Identifier" onChange={(evt) => { updateField("storage", evt) }} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input className="form-control" value={props.snippet.nbt} placeholder="NBT Path" onChange={(evt) => { updateField("nbt", evt) }} />
        </div>
      </div>
    </>
  )
}