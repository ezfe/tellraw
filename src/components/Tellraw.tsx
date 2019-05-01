import * as React from "react";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { VERSION } from "../constants";
import { compile } from "../helpers/compile";
import { CommandTemplatesController } from "./CommandTemplatesController";
import { SnippetCollection } from "./SnippetCollection";
import { CommandType } from "../data/templates";

export interface TellrawProps {

}

interface TellrawState {
  snippets: Array<Snippet>
  commandType: CommandType,
  command: string,
  compiled: string
}

class Tellraw extends React.Component<TellrawProps, TellrawState> {
  constructor(props: TellrawProps) {
    super(props)

    /// *** Snippet Loading ***
    const lsformat = parseInt(localStorage.getItem("jformat") || "5")
    
    let loaded_snippets = new Array<Snippet>()
    let loaded_command = "/tellraw @a %s"

    // if (lsformat <= 3) {
    //   localStorage.clear()
    //   location.reload()
    // } else if (lsformat === 4) {
    //   console.log("Processing legacy localStorage")
    //   loaded_snippets = load_legacy()
    // } else if (lsformat === 5) {
    //   const loaded_snippets_temp = JSON.parse(localStorage.getItem('jobject') || "[]") as Array<object>
    //   loaded_snippets = loaded_snippets_temp.map((s): Snippet => {
    //     return (Object as any).assign(new Snippet(), s)
    //   })
    // } else {
    //   console.error(`Unexpected version ${lsformat}`)
    // }

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

  render() {
    return (
      <div className="container">
        <div className="row margin-below">
          <div className="col">
            <h4>Tellraw Generator for Minecraft</h4>
          </div>
        </div>
        <div className="row margin-below">
          <div className="col-2">
            <span lang="player.header">Player and Command</span>
            <br />
            <span lang="player.description">Used to select and execute different players</span>
          </div>
          <div className="col">
            <input value={this.state.command}
                   onChange={this.updateCustomCommand}
                   type="text"
                   className="form-control" />
          </div>
        </div>
        <CommandTemplatesController commandType={this.state.commandType} updateCommandType={this.updateCommandType} />
        <br />
        <br />
        <hr />
        <br />
        <br />
        
        <SnippetCollection commandType={this.state.commandType}
          snippets={this.state.snippets} 
          updateSnippets={(snippets: Array<Snippet>) => { this.setState({snippets: snippets}); this.recompile(snippets) }} />
        
        <br />
        <br />
        <span>{this.state.compiled}</span>
      </div>
    )
  }
}

export default Tellraw