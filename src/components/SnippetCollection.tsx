import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
import { InlineSnippetController } from "./InlineSnippetController/InlineSnippetController";
import { SnippetDetailController } from "./SnippetDetailController/SnippetDetailController";
import { CommandType } from "../data/templates";
import { duplicate_snippet } from "../helpers/copy_snippet";
import uuid = require("uuid");

export interface SnippetCollectionProps {
  commandType: CommandType
  snippets: Array<Snippet>
  updateSnippets: (snippets: Array<Snippet>) => void
}

interface SnippetCollectionState {
  editing: Snippet,
}

export class SnippetCollection extends React.Component<SnippetCollectionProps, SnippetCollectionState> {
  constructor(props: SnippetCollectionProps) {
    super(props)

    this.state = {
      editing: null
    }

    this.startEditing = this.startEditing.bind(this)
    this.updateEditing = this.updateEditing.bind(this)
    this.stopEditing = this.stopEditing.bind(this)
    
    this.updateSnippet = this.updateSnippet.bind(this)
    this.removeSnippet = this.removeSnippet.bind(this)
    this.duplicateSnippet = this.duplicateSnippet.bind(this)

    this.addLineBreak = this.addLineBreak.bind(this)
    
    this.editor = this.editor.bind(this)
    this.listView = this.listView.bind(this)
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

  updateSnippet(newSnippet: Snippet) {
    let isNewSnippet = true
    let updatedSnippets = this.props.snippets.map(currentSnippet => {
      if (currentSnippet.id === newSnippet.id) {
        isNewSnippet = false
        return newSnippet
      } else {
        return currentSnippet
      }
    })

    if (isNewSnippet) {
      updatedSnippets = [...this.props.snippets, newSnippet]
    }

    this.props.updateSnippets(updatedSnippets)
  }

  removeSnippet(snippet: Snippet) {
    let filtered = this.props.snippets.filter(currentSnippet => {
      return currentSnippet.id !== snippet.id
    })

    this.props.updateSnippets(filtered)
  }
  
  duplicateSnippet(snippet: Snippet) {
    let now = this.props.snippets
    let newSnippet = duplicate_snippet(snippet)
    newSnippet.id = uuid()

    let i = now.indexOf(snippet);
    now.splice(i, 0, newSnippet);

    this.props.updateSnippets(now);
  }

  addLineBreak() {
    const snip = new LinebreakSnippet(null)

    this.props.updateSnippets([...this.props.snippets, snip])
  }

  editor() {
    console.log(this.state)
    return <SnippetDetailController commandType={this.props.commandType} snippet={this.state.editing} updateSnippet={this.updateEditing} stopEditing={this.stopEditing}/>
  }

  listView() {
    return (
      <>
        {
          this.props.snippets.map((s: Snippet) => {
            return <InlineSnippetController key={s.id}
                                                snippet={s}
                                                updateSnippet={this.updateSnippet}
                                                startEditingSnippet={this.startEditing}
                                                removeSnippet={this.removeSnippet}
                                                duplicateSnippet={this.duplicateSnippet} />
            })
        }

        <div className="row">
          <div className="col">
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
                <button className="dropdown-item" onClick={() => { this.startEditing(new TextSnippet(null)) }}>Text</button>
                <button className="dropdown-item" onClick={() => { this.startEditing(new SelectorSnippet(null)) }}>Selector</button>
                <button className="dropdown-item" onClick={() => { this.startEditing(new ScoreboardObjectiveSnippet(null)) }}>Scoreboard Objective</button>
                <button className="dropdown-item" onClick={() => { this.startEditing(new KeybindSnippet(null)) }}>Keybind</button>
                <button className="dropdown-item" onClick={this.addLineBreak}>Line Break ⏎</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  render() {
    let view: JSX.Element
    if (this.state.editing === null) {
      view = this.listView()
    } else {
      view = this.editor()
    }

    return (
      <div className="light-well">
        {view}
      </div>
    )
  }
}
