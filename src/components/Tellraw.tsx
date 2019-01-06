import * as React from "react";
import { Snippet } from "../classes/Snippets/Snippet";
import { CommandTemplatesController } from "./CommandTemplatesController";
import { SnippetDetailController } from "./SnippetDetailController/SnippetDetailController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VERSION } from "../constants";
import { CommandFormat, command_template } from "../data/templates";
import { compile } from "../helpers/compile";
import { TextSnippet } from "../classes/Snippets/TextSnippet";
import { SelectorSnippet } from "../classes/Snippets/SelectorSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/ScoreboardObjectiveSnippet";
import { LinebreakSnippet } from "../classes/Snippets/LinebreakSnippet";
import { InlineSnippetController } from "./InlineSnippetController/InlineSnippetController";
import { KeybindSnippet } from "../classes/Snippets/KeybindSnippet";
import { SnippetCollection } from "./SnippetCollection";

export interface TellrawProps {

}

interface TellrawState {
  snippets: Array<Snippet>
  command_format: CommandFormat,
  custom_command: boolean,
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
      command_format: CommandFormat.tellraw,
      custom_command: true,
      command: loaded_command,
      compiled: ""
    }

    // Set format
    localStorage.setItem("jformat", VERSION.toString())

    this.recompile = this.recompile.bind(this)

    this.updateCustomCommand = this.updateCustomCommand.bind(this)
    this.toggleCustomCommand = this.toggleCustomCommand.bind(this)
  }

  componentDidUpdate(previousProps: TellrawProps, previousState: TellrawState) {
    const serialized_jobject = JSON.stringify(this.state.snippets)
    localStorage.setItem('jobject', serialized_jobject)
    localStorage.setItem('jcommand', this.state.command)
  }

  componentDidMount() {
    this.recompile()
  }

  recompile(snippets: Array<Snippet> = null, command: string = null) {
    if (snippets === null) snippets = this.state.snippets
    if (command === null) command = this.state.custom_command ? (this.state.command) : (command_template(this.state.command_format))
    this.setState({ compiled: compile(snippets, command) })

    console.log("State Snippets", this.state.snippets)
  }

  updateCustomCommand(event: any) {
    this.setState({ command: event.target.value })
    this.recompile(null, event.target.value)
  }
  
  toggleCustomCommand(event: any) {
    this.setState({ custom_command: event.target.checked })
    this.recompile(null, event.target.checked ? (this.state.command) : (command_template(this.state.command_format)))
  }

  render() {
    return (
      <div className="container">
        <div className="row margin-below">
          <div className="col-2">
            <span lang="player.header">Player and Command</span>
            <br />
            <span lang="player.description">Used to select and execute different players</span>
          </div>
          <div className="col-3">
            <div className="custom-control custom-checkbox">
              <input checked={this.state.custom_command}
                onChange={this.toggleCustomCommand}
                type="checkbox"
                className="custom-control-input"
                id="custom_command_checkbox" />
              <label className="custom-control-label" htmlFor="custom_command_checkbox">Custom Command</label>
            </div>
          </div>
          <div className="col">
            <input value={this.state.custom_command ? (this.state.command) : (command_template(this.state.command_format))}
                   onChange={this.updateCustomCommand}
                   type="text"
                   className="form-control"
                   disabled={!this.state.custom_command}/>
          </div>
        </div>
        <CommandTemplatesController />
        <br />
        <br />
        <hr />
        <br />
        <br />
        
        <SnippetCollection snippets={this.state.snippets} updateSnippets={(snippets: Array<Snippet>) => { this.setState({snippets: snippets}); this.recompile(snippets) }}/>
        
        <br />
        <br />
        <span>{this.state.compiled}</span>
      </div>
    )
  }
}

export default Tellraw