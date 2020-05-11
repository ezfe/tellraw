import * as React from "react";
import { NBTSnippet, NBTType } from "../../classes/Snippets/SnippetTypes/NBTSnippet";
import { CommandType, FeatureType, isFeatureAvailable } from "../../data/templates";
import { Version } from "../../helpers/versions";

export interface NBTSnippetControllerProps {
  snippet: NBTSnippet
  updateSnippet: (Snippet) => void
  commandType: CommandType
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

  if (!isFeatureAvailable(props.commandType, props.version, FeatureType.nbtComponent)) {
    return (
      <div className="row">
        <div className="col">
          <p>NBT Components require Minecraft 1.14+</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="row mb-2">
        <div className="col">
          <select className="custom-select" value={props.snippet.type} onChange={changeNBTType}>
            <option key={NBTType.storage} value={NBTType.storage} disabled={!isFeatureAvailable(props.commandType, props.version, FeatureType.nbtStorageComponent)}>
              Storage
              {
                isFeatureAvailable(props.commandType, props.version, FeatureType.nbtStorageComponent) ? null : (
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