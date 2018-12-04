import * as React from "react";
import { Snippet, SnippetType } from "../classes/Snippet";
import { InlineSnippetController } from "./InlineSnippetController";
import { CommandTemplatesController } from "./CommandTemplatesController";
import { compile, load_legacy } from "../helpers";
import { SnippetDetailController } from "./SnippetDetailController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VERSION } from "../constants";
import { CommandFormat, command_template } from "../data/templates";

export interface TellrawProps {

}

interface TellrawState {
  snippets: Array<Snippet>
  editing: Snippet,
  command_format: CommandFormat,
  custom_command: boolean,
  command: string,
  compiled: string
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Tellraw extends React.Component<TellrawProps, TellrawState> {
  constructor(props: TellrawProps) {
    super(props)

    /// *** Snippet Loading ***
    const lsformat = parseInt(localStorage.getItem("jformat") || "5")
    let instantialized_state = false
    let legacy_snippets = new Array<Snippet>()
    if (lsformat <= 3) {
      localStorage.clear()
      location.reload()
    } else if (lsformat === 4) {
      console.log("Processing legacy localStorage")
      legacy_snippets = load_legacy()
    } else if (lsformat === 5) {
      const found_serialized = localStorage.getItem("v5_serialized_state")
      this.state = JSON.parse(found_serialized) as TellrawState
      instantialized_state = true
    } else {
      console.error(`Unexpected version ${lsformat}`)
    }

    if (!instantialized_state) {
      this.state = {
        snippets: legacy_snippets,
        editing: null,
        command_format: CommandFormat.tellraw,
        custom_command: true,
        command: "/tellraw @a %s <state>",
        compiled: ""
      }
    }

    // Set format
    localStorage.setItem("jformat", VERSION.toString())
    
    this.startEditing = this.startEditing.bind(this)
    this.updateEditing = this.updateEditing.bind(this)
    this.stopEditing = this.stopEditing.bind(this)
    
    this.createAndEdit = this.createAndEdit.bind(this)
    this.addLineBreak = this.addLineBreak.bind(this)

    this.updateSnippet = this.updateSnippet.bind(this)
    this.recompile = this.recompile.bind(this)

    this.updateCustomCommand = this.updateCustomCommand.bind(this)
    this.toggleCustomCommand = this.toggleCustomCommand.bind(this)

    this.editor = this.editor.bind(this)
    this.listView = this.listView.bind(this)
    this.mainView = this.mainView.bind(this)
  }

  componentDidUpdate(previousProps: TellrawProps, previousState: TellrawState) {
    const serialized_jobject = JSON.stringify(this.state)
    localStorage.setItem('v5_serialized_state', serialized_jobject)
  }

  componentDidMount() {
    this.recompile()
  }

  /**
   * Start editing a snippet.
   * 
   * @param snippet The snippet to start editing
   */
  startEditing(snippet: Snippet) {
    this.setState({ editing: snippet })
  }

  /**
   * Update the snippet being edited without propagating it to the
   * main snippet list.
   * 
   * @param snippet The new snippet state
   */
  updateEditing(snippet: Snippet) {
    this.setState({ editing: snippet })
  }

  /**
   * Stop editing a snippet.
   * 
   * @param save Whether to save the new snippet state back to the main snippet list.
   */
  stopEditing(save: boolean) {
    if (save && this.state.editing !== null) {
      this.updateSnippet(this.state.editing)
    }

    this.setState({ editing: null })
  }

  createAndEdit(type: SnippetType) {
    const snip = new Snippet(null)
    snip.type = type

    this.startEditing(snip)
  }

  addLineBreak() {
    const snip = new Snippet(null)
    snip.type = SnippetType.lineBreak
    snip.text = "\n"
    
    const updated = [...this.state.snippets, snip]
    this.setState({ snippets: updated })

    this.recompile(updated)
  }

  updateSnippet(newSnippet: Snippet) {
    let isNewSnippet = true
    let updatedSnippets = this.state.snippets.map(currentSnippet => {
      if (currentSnippet.id === newSnippet.id) {
        isNewSnippet = false
        return newSnippet
      } else {
        return currentSnippet
      }
    })

    if (isNewSnippet) {
      updatedSnippets = [...this.state.snippets, newSnippet]
    }

    this.setState({snippets: updatedSnippets})
    this.recompile(updatedSnippets)
  }

  recompile(snippets: Array<Snippet> = null, command: string = null) {
    if (snippets === null) snippets = this.state.snippets
    if (command === null) command = this.state.custom_command ? (this.state.command) : (command_template(this.state.command_format))
    this.setState({ compiled: compile(snippets, command) })
  }

  updateCustomCommand(event: any) {
    this.setState({ command: event.target.value })
    this.recompile(null, event.target.value)
  }
  
  toggleCustomCommand(event: any) {
    this.setState({ custom_command: event.target.checked })
    this.recompile(null, event.target.checked ? (this.state.command) : (command_template(this.state.command_format)))
  }

  editor() {
    return <SnippetDetailController snippet={this.state.editing} updateSnippet={this.updateEditing} stopEditing={this.stopEditing}/>
  }

  listView() {
    return (
      <>
        {
          this.state.snippets.map((s: Snippet) => {
            return <InlineSnippetController key={s.id}
                            snippet={s}
                            updateSnippet={this.updateSnippet}
                            editSnippet={this.startEditing} />
            })
        }

        <div className="row">
          <div className="offset-1 col-2">
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle"
                      type="button"
                      id="add-snippet-dropdown-button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false">

                <FontAwesomeIcon icon="plus-circle" /> Add Snippet
              </button>
              <div className="dropdown-menu" aria-labelledby="add-snippet-dropdown-button">
                <button className="dropdown-item" onClick={() => { this.createAndEdit(SnippetType.text) }}>Text</button>
                <button className="dropdown-item" onClick={() => { this.createAndEdit(SnippetType.selector) }}>Selector</button>
                <button className="dropdown-item" onClick={() => { this.createAndEdit(SnippetType.scoreboardObjective) }}>Scoreboard Objective</button>
                <button className="dropdown-item" onClick={this.addLineBreak}>Line Break ⏎</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  mainView() {
    if (this.state.editing === null) {
      return this.listView()
    } else {
      return this.editor()
    }
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
        
        { this.mainView() }
        
        <br />
        <br />
        <span>{this.state.compiled}</span>
      </div>
    )
  }
}

export default Tellraw