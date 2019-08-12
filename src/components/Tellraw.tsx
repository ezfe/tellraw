import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { VERSION } from "../constants";
import { CommandType } from "../data/templates";
import { compile } from "../helpers/compile";
import { loadLocalStorageState } from "../helpers/persistence";
import { CommandTemplatesController } from "./CommandTemplatesController";
import Preview from "./Preview";
import SnippetCollection from "./SnippetCollection";

export interface TellrawProps {

}

interface TellrawState {
  snippets: Array<Snippet>
  commandType: CommandType,
  command: string,
  compiled: string
}

class Tellraw extends React.Component<TellrawProps, TellrawState> {
  outputFieldRef: React.RefObject<HTMLTextAreaElement>;
  
  constructor(props: TellrawProps) {
    super(props)
    
    let loaded_snippets = loadLocalStorageState()
    let loaded_command = "/tellraw @a %s"

    const loaded_command_temp = localStorage.getItem('jcommand')
    if (loaded_command_temp !== null) {
      loaded_command = loaded_command_temp
    }

    this.state = {
      snippets: loaded_snippets,
      commandType: CommandType.tellraw,
      command: loaded_command,
      compiled: ""
    }

    // Set format version
    localStorage.setItem("jformat", VERSION.toString())

    this.recompile = this.recompile.bind(this)

    this.updateCustomCommand = this.updateCustomCommand.bind(this)
    this.updateCommandType = this.updateCommandType.bind(this)

    this.importCommand = this.importCommand.bind(this)
    this.exportCommand = this.exportCommand.bind(this)
    
    this.outputFieldRef = React.createRef();
  }

  componentDidUpdate(previousProps: TellrawProps, previousState: TellrawState) {
    const serialized_jobject = JSON.stringify(this.state.snippets)
    localStorage.setItem('jobject', serialized_jobject)
    localStorage.setItem('jcommand', this.state.command)
  }

  componentDidMount() {
    this.recompile()
  }

  recompile(snippets: Array<Snippet> = null,
            command: string = null,
            type: CommandType = null) {
    if (snippets === null) snippets = this.state.snippets
    if (command === null) command = this.state.command
    if (type === null) type = this.state.commandType

    this.setState({ compiled: compile(snippets, command) })

    console.log("State Snippets", this.state.snippets)
  }

  updateCustomCommand(event: any) {
    this.setState({ command: event.target.value })
    this.recompile(null, event.target.value)
  }

  updateCommandType(type: CommandType) {
    this.setState({ commandType: type })
    this.recompile(null, null, type)
  }

  importCommand() {
    const string = prompt("Enter exported string!")
    const obj = JSON.parse(string)
    // Temporary
    localStorage.setItem("jobject", JSON.stringify(obj["jobject"]));
    location.reload();
  }

  exportCommand() {
    
  }

  render() {
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
            <input value={this.state.command}
                   onChange={this.updateCustomCommand}
                   type="text"
                   className="form-control" />
          </div>
        </div>
        <CommandTemplatesController commandType={this.state.commandType}
                                    updateCommandType={this.updateCommandType} />
        
        <br />
        <br />
        
        <SnippetCollection commandType={this.state.commandType}
                           snippets={this.state.snippets} 
                           updateSnippets={(snippets: Array<Snippet>) => {
                             this.setState({snippets: snippets}); this.recompile(snippets)
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
                      value={this.state.compiled} />
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

        <Preview snippets={this.state.snippets} commandType={this.state.commandType} />
      </div>
    )
  }
}

export default Tellraw