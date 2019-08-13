import * as React from "react";
import { KeybindSnippet } from "../../classes/Snippets/SnippetTypes/KeybindSnippet";

interface InlineKeybindSnippetControllerProps {
  snippet: KeybindSnippet
  updateSnippet: (Snippet) => void
}

const InlineKeybindSnippetController: React.FunctionComponent<InlineKeybindSnippetControllerProps> = (props) => {
  function updateField(field: string, value: any) {
    let newSnippet = props.snippet.copy()
    newSnippet[field] = value
    props.updateSnippet(newSnippet)
  }
  
  function changeKeybind(event: any) {
    updateField("keybind", event.target.value)
  }

  return <input className="form-control"
                placeholder="Selector..."
                value={props.snippet.keybind}
                onChange={changeKeybind} />
}

export default InlineKeybindSnippetController