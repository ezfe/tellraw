import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { KeybindSnippet } from "../../classes/Snippets/SnippetTypes/KeybindSnippet";
import { LinebreakSnippet } from "../../classes/Snippets/SnippetTypes/LinebreakSnippet";
import { PagebreakSnippet } from "../../classes/Snippets/SnippetTypes/PagebreakSnippet";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../../classes/Snippets/SnippetTypes/SelectorSnippet";
import { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";
import { MinecraftColorWell } from "../MinecraftColorWell";
import InlineEditButton, { InlineEditButtonAction } from "./InlineEditButton";
import InlineKeybindSnippetController from "./InlineKeybindSnippetController";
import { InlineScoreboardObjectiveSnippetController } from "./InlineScoreboardObjectiveSnippetController";
import { InlineSelectorSnippetController } from "./InlineSelectorSnippetController";
import { InlineTextSnippetController } from "./InlineTextSnippetController";

export interface InlineSnippetControllerProps {
  snippet: Snippet
  updateSnippet: (Snippet) => void
  startEditingSnippet: (Snippet) => void
  removeSnippet: (Snippet) => void
  duplicateSnippet: (Snippet) => void
}

export class InlineSnippetController extends React.Component<InlineSnippetControllerProps, {}> {
  
  constructor(props: InlineSnippetControllerProps) {
    super(props)
    
    this.editButtonClick = this.editButtonClick.bind(this)
    this.customController = this.customController.bind(this)
  }
  
  editButtonClick(action: string) {
    if (action == "start-editing") {
      this.props.startEditingSnippet(this.props.snippet)
    } else if (action == "delete") {
      this.props.removeSnippet(this.props.snippet)
    } else if (action == "duplicate") {
      this.props.duplicateSnippet(this.props.snippet)
    } else {
      alert(`Failed to catch ${action}`)
    }
  }
  
  customController() {
    if (this.props.snippet instanceof LinebreakSnippet) {
      return <span>Line Break ⏎</span>
    } else if (this.props.snippet instanceof PagebreakSnippet) {
      return <span>Page Break <FontAwesomeIcon icon="file-alt" /></span>
    } else if (this.props.snippet instanceof TextSnippet) {
      return <InlineTextSnippetController snippet={this.props.snippet as TextSnippet} updateSnippet={this.props.updateSnippet} />
    } else if (this.props.snippet instanceof SelectorSnippet) {
      return <InlineSelectorSnippetController snippet={this.props.snippet as SelectorSnippet} updateSnippet={this.props.updateSnippet} />
    } else if (this.props.snippet instanceof ScoreboardObjectiveSnippet) {
      return <InlineScoreboardObjectiveSnippetController snippet={this.props.snippet as ScoreboardObjectiveSnippet} updateSnippet={this.props.updateSnippet} />
    } else if (this.props.snippet instanceof KeybindSnippet) {
      return <InlineKeybindSnippetController snippet={this.props.snippet as KeybindSnippet} updateSnippet={this.props.updateSnippet} />
    } else {
      return <span>{typeof this.props.snippet} isn't implemented</span>
    }
  }
  
  render() {
    const editingEnabled = !(this.props.snippet instanceof LinebreakSnippet
      || this.props.snippet instanceof PagebreakSnippet)
    let startEditingAction: InlineEditButtonAction = {
      id: "start-editing",
      text: "Edit",
      enabled: editingEnabled
    }

    let deleteAction: InlineEditButtonAction = {
      id: "delete",
      text: "Delete",
      icon: "trash-alt",
      enabled: true
    }

    let duplicateAction: InlineEditButtonAction = {
      id: "duplicate",
      text: "Duplicate",
      icon: "clone",
      enabled: true
    }
    
    return (
      <div className="row mb-2">
        <div className="col-1 col-sm-2">
          <InlineEditButton onClick={this.editButtonClick}
                            mainAction={startEditingAction}
                            dropdownActions={[
                              deleteAction,
                              duplicateAction
                            ]} />
        </div>
        
        {/*
        Flex justification is for text fields
        which are used for page and linebreaks
        */}
        <div className="col"
             style={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "center"
             }}>
          { this.customController() }
        </div>
        
        <div className="col-1">
          <MinecraftColorWell color={this.props.snippet.color} />
        </div>
      </div>
    )
  }
}