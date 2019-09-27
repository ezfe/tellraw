import * as React from "react";
import { NBTSnippet } from "../../classes/Snippets/SnippetTypes/NBTSnippet";

export interface NBTSnippetDetailControllerProps {
  snippet: NBTSnippet
  updateSnippet: (snippet: NBTSnippet) => void
}

const NBTSnippetDetailController: React.FunctionComponent<NBTSnippetDetailControllerProps> = (props) => {
  function updateField(field: string, value: any) {
    let newSnippet = props.snippet.copy()
    newSnippet[field] = value
    props.updateSnippet(newSnippet)
  }

  function changeNBTValue(event: any) {
    updateField("nbt", event.target.value)
  }

  function changeStorageValue(event: any) {
    updateField("storage", event.target.value)
  }

  return (
    <>
      <div className="row mb-2">
        <div className="col">
          <input className="form-control" placeholder="Storage Identifier" value={props.snippet.storage} onChange={changeStorageValue} />   
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input className="form-control" placeholder="NBT Path" value={props.snippet.nbt} onChange={changeNBTValue} />   
        </div>
      </div>
    </>
  )
}

export default NBTSnippetDetailController