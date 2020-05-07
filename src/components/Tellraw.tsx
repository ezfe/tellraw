import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { LSKEY_COMMAND_STRING, LSKEY_COMMAND_TYPE, LSKEY_SNIPPET_ARR, LSKEY_V116 } from "../constants";
import { CommandType, template_lookup } from "../data/templates";
import { compile } from "../helpers/compile";
import { export_snippets } from "../helpers/export";
import { useLocalStorage, useLSSnippets } from "../helpers/useLocalStorage";
import CommandTemplatesController from "./CommandTemplatesController";
import { Checkbox } from "./Forms/Checkbox";
import Button from "./generic/Button";
import Importing from "./Importing";
import Preview from "./Preview";
import SnippetCollection from "./SnippetCollection";

const Tellraw: React.FunctionComponent<{}> = () => {  
  let [snippets, setSnippets] = useLSSnippets(LSKEY_SNIPPET_ARR, [])
  let [commandType, setCommandType] = useLocalStorage(LSKEY_COMMAND_TYPE, CommandType.tellraw)
  let [command, setCommand] = useLocalStorage(LSKEY_COMMAND_STRING, template_lookup(commandType)[0])

  let [exporting, setExporting] = React.useState(false)

  let [importing, setImporting] = React.useState(false)

  let [v116Flag, setv116Flag] = useLocalStorage(LSKEY_V116, false);

  const compiled = compile(snippets, command, commandType, v116Flag)

  function updateCustomCommand(event: any) {
    setCommand(event.target.value)
  }

  function updateCommandType(type: CommandType, command_override?: string) {
    setCommandType(type)
    setCommand(command_override || template_lookup(type)[0])
  }

  function startImporting() {
    setImporting(true)
  }

  function stopImporting() {
    setImporting(false)
  }

  if (importing) {
    return <Importing setSnippets={setSnippets} setCommand={setCommand} setCommandType={setCommandType} stopImporting={stopImporting} />
  }

  if (exporting) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 light-well" style={{ textAlign: "center" }}>
            <p className="mb-3">
              Click below to copy the exported command string. Store it in a safe place
              to import back onto the site in the future.
            </p>
            <textarea readOnly={true}
                      className="form-control mb-3"
                      onClick={(event) => {
                        event.currentTarget.select()
                      }}
                      value={ export_snippets(snippets, command, commandType) } />
            <Button type="success" icon="check-circle" onClick={() => { setExporting(false) }}>Done</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 col-md mb-2">
          <h4>Tellraw Generator for Minecraft</h4>
        </div>
        <div className="col-sm-5 mb-2">
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
                      aria-expanded="false"
                      aria-label="Miscellaneous Actions">
                <FontAwesomeIcon icon="list" />
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fwww.minecraftjson.com%2F&text=%2Ftellraw%20generator%20for%20minecraft&tw_p=tweetbutton&url=http%3A%2F%2Fwww.minecraftjson.com%2F&via=superezfe">
                  <FontAwesomeIcon icon={["fab", "twitter"]} /> Tweet
                </a>
                <a className="dropdown-item" href="https://status.minecraftjson.com">
                  <FontAwesomeIcon icon="wifi" /> Uptime
                </a>
                <a className="dropdown-item" href="https://github.com/ezfe/tellraw/archive/master.zip">
                  <FontAwesomeIcon icon="file-download" /> Download Website
                </a>
                <a className="dropdown-item" href="https://legacy.minecraftjson.com">
                  <FontAwesomeIcon icon="code-branch" /> Legacy Version
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-5 col-md-3 mb-2" id="command-label">
          <span style={{ fontWeight: "bold" }}>Command Template</span>
          <br />
          <span>Used to select and execute different players</span>
        </div>
        <div className="col-sm mb-4">
          <input value={command}
                 onChange={updateCustomCommand}
                 type="text"
                 className="form-control"
                 aria-labelledby="command-label" />
        </div>
      </div>

      <CommandTemplatesController commandType={commandType}
                                  updateCommandType={updateCommandType} />
      
      <SnippetCollection commandType={commandType}
                          snippets={snippets} 
                          updateSnippets={(snippets) => {
                            setSnippets(snippets)
                          }}
                          deleteAll={() => {
                            setSnippets([])
                            setCommand(template_lookup(CommandType.tellraw)[0])
                            setCommandType(CommandType.tellraw)
                          }}
                          v116Flag={v116Flag} />
      
      <br />
      <br />
      <div className="row mb-2">
        <div className="col-3">
          <span style={{ fontWeight: "bold" }}>Command</span>
          <br />
          <span>Copy and paste into Minecraft</span>
        </div>
        <div className="col">
          <textarea readOnly={true}
                    className="form-control"
                    onClick={(event) => {
                      event.currentTarget.select()
                    }}
                    value={compiled} />
        </div>
      </div>

      <Preview snippets={snippets} commandType={commandType} />

      <hr />

      <div className="row">
        <div className="col-3">
          <span style={{ fontWeight: "bold" }}>Save and Restore</span>
        </div>
        <div className="col-sm-2 mb-2">
          <Button type="light"
                  className="btn-block"
                  onClick={startImporting}
                  icon="file-import">
            Import
          </Button>
        </div>
        <div className="col-sm-2 mb-2">
          <Button type="light"
                  className="btn-block"
                  onClick={() => { setExporting(true) }}
                  icon="file-export">
            Export
          </Button>
        </div>
        <div className="col mb-2">
          <span>
            Export your command and save in a text file, so that you can
            get easily get it back. Some browsers reset their cache
            periodically and will forget what you've entered if you don't
            save it by clicking Export.
          </span>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-3">
          <span style={{ fontWeight: "bold" }}>Settings</span>
        </div>
        <div className="col">
          <Checkbox label="Show Minecraft 1.16 Features" checked={v116Flag} onChange={setv116Flag} />
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col">
          <span style={{ color: "grey", fontSize: "10px" }}>
            <a href="https://ezekielelin.com/contact" target="_blank">Contact Me</a> | "Minecraft" content and materials are trademarks and copyrights of Mojang and its licensors. This site is not affiliated with Mojang.
			    </span>
        </div>
      </div>
    </div>
  )
}

export default Tellraw