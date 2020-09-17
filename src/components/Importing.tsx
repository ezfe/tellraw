import * as React from "react";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { CommandType } from "../data/templates";
import { loadCurrentVersionState, upgradeV5State } from "../helpers/loaders";
import Button from "./generic/Button";

interface ImportingProps {
  setSnippets: (snippets: Array<Snippet>) => void,
  setCommand: (command: string) => void,
  setCommandType: (type: CommandType) => void,
  stopImporting: () => void
}

const Importing: React.FunctionComponent<ImportingProps> = (props) => {
  let [importingString, setImportingString] = React.useState("")

  function formSubmit(e: React.FormEvent<HTMLFormElement>): boolean {
    e.preventDefault()
    e.stopPropagation()
    doImport()
    return false
  }

  function doImport() {
    let import_data: Array<object>
    try {
      import_data = JSON.parse(importingString) as Array<object>
    } catch (e) {
      alert(`An error occurred importing your command.\n\nFeel free to use the "Report an Issue" option on the main page to report this`)
      return
    }

    if (!("command" in import_data
          && "jobject" in import_data
          && "jtemplate" in import_data)) {
      
      alert(`An error occurred importing your command.\n\nFeel free to use the "Report an Issue" option on the main page to report this`)
      return
    }

    if ("jtemplate" in import_data && import_data["jformat"] >= 5) {
      const command = import_data["command"]
      props.setCommand(command)
  
      const type = import_data["jtemplate"]
      props.setCommandType(type)
    
      let jobject = import_data["jobject"] as object[]

      if (import_data["jformat"] == 5) {
        jobject = upgradeV5State(jobject)
      }

      const snippets = loadCurrentVersionState(jobject)
      props.setSnippets(snippets)
    } else {
      alert("Your export data is incorrectly formatted, and cannot be imported.")
    }

    props.stopImporting()
  }

  return (
    <div className="container">
      <form onSubmit={formSubmit}>
        <div className="row">
          <div className="col-md-6 offset-md-3 light-well" style={{ textAlign: "center" }}>
            <p className="mb-3">
              Please enter the string you were given when you exported your command
            </p>
            <input autoFocus
                   className="form-control mb-3"
                   id="hotfix-input-cell"
                   value={importingString}
                   onChange={(event) => { setImportingString(event.target.value) }}
                   />
            <Button className="mr-3"
                    type="danger"
                    formType="button"
                    icon="times-circle"
                    onClick={props.stopImporting}>
              Cancel
            </Button>
            <Button type="success"
                    icon="check-circle"
                    onClick={doImport}>
              Import
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Importing;