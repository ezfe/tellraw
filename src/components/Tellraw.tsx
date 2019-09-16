import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { CommandType } from "../data/templates";
import { compile } from "../helpers/compile";
import { CommandTemplatesController } from "./CommandTemplatesController";
import Preview from "./Preview";
import SnippetCollection from "./SnippetCollection";
import { useLocalStorage, useLSSnippets } from "../helpers/useLocalStorage";

interface TellrawState {
  snippets: Array<Snippet>
  commandType: CommandType,
  command: string,
  compiled: string
}

const outputFieldRef = React.createRef();

const Tellraw: React.FunctionComponent<{}> = () => {  
  let [snippets, setSnippets] = useLSSnippets("20190913-snippet-array", [])
  let [commandType, setCommandType] = React.useState(CommandType.tellraw)
  let [command, setCommand] = useLocalStorage("20190913-command-template-string", "/tellraw @a %s")
  let [compiled, setCompiled] = useLocalStorage("20190916-compiled-string", "/tellraw @p []")

  function recompile(f_snippets: Array<Snippet> = null,
    f_command: string = null,
    f_type: CommandType = null) {

      if (f_snippets === null) f_snippets = snippets
      if (f_command === null) f_command = command
      if (f_type === null) f_type = commandType

      setCompiled(compile(f_snippets, f_command))
      console.log("State Snippets", snippets)
  }

  function updateCustomCommand(event: any) {
    setCommand(event.target.value)
    recompile(null, event.target.value)
  }

  function updateCommandType(type: CommandType) {
    setCommandType(type)
    recompile(null, null, type)
  }

  function importCommand() {
    const string = prompt("Enter exported string!")
    const obj = JSON.parse(string)
    
    // Temporary
    localStorage.setItem("jobject", JSON.stringify(obj["jobject"]));
    location.reload();
  }

  function exportCommand() {
    
  }

  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col">
          <h4>Tellraw Generator for Minecraft</h4>
        </div>
        <div className="col-6">
          <div className="btn-toolbar d-flex justify-content-end"
                role="toolbar"
                aria-label="Toolbar with button groups">
            <a className="btn btn-danger btn-sm"
              href="https://github.com/ezfe/tellraw/issues/new"
              target="_">
              <FontAwesomeIcon icon="exclamation-triangle" /> Report an Issue
            </a>
            <div className="btn-group ml-2">
              <button className="btn btn-secondary btn-sm dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false">
                <FontAwesomeIcon icon="list" />
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fwww.minecraftjson.com%2F&text=%2Ftellraw%20generator%20for%20minecraft&tw_p=tweetbutton&url=http%3A%2F%2Fwww.minecraftjson.com%2F&via=superezfe">
                  <FontAwesomeIcon icon={["fab", "twitter"]} /> Tweet
                </a>
                <a className="dropdown-item" href="https://status.minecraftjson.com">
                  <FontAwesomeIcon icon="wifi" /> Uptime
                </a>
                <a className="dropdown-item" href="https://github.com/ezfe/tellraw/archive/preview.zip">
                  <FontAwesomeIcon icon="file-download" /> Download Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-2">
          <span style={{ fontWeight: "bold" }}>Player and Command</span>
          <br />
          <span>Used to select and execute different players</span>
        </div>
        <div className="col">
          <input defaultValue={command}
            onChange={this.updateCustomCommand}
            type="text"
            className="form-control" />
        </div>
      </div>
      <CommandTemplatesController commandType={commandType}
                                  updateCommandType={this.updateCommandType} />
      
      <br />
      <br />
      
      <SnippetCollection commandType={commandType}
                          snippets={snippets} 
                          updateSnippets={(snippets: Array<Snippet>) => {
                            setSnippets(snippets)
                            recompile(snippets)
                          }} />
      
      <br />
      <br />
      <div className="row mb-2">
        <div className="col-2">
          <span style={{}}>Command</span>
        </div>
        <div className="col">
          <textarea readOnly={true}
                    className="form-control"
                    onClick={() => {
                      this.outputFieldRef.current.select()
                    }}
                    ref={this.outputFieldRef}
                    value={compiled} />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-sm-2 offset-sm-2">
          <button className="btn btn-light btn-block"
                  onClick={this.importCommand}>
            <FontAwesomeIcon icon="file-import" /> Import
          </button>
        </div>
        <div className="col-sm-2">
          <button className="btn btn-light btn-block"
                  onClick={this.exportCommand}>
            <FontAwesomeIcon icon="file-export" /> Export
          </button>
        </div>
      </div>

      <Preview snippets={snippets} commandType={commandType} />
    </div>
  )
}

export default Tellraw