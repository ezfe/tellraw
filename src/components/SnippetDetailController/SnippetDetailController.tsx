import * as React from "react";
import { Color } from "../../classes/Color";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../../classes/Snippets/SelectorSnippet";
import { Snippet } from "../../classes/Snippets/Snippet";
import { TextSnippet } from "../../classes/Snippets/TextSnippet";
import { TextSnippetDetailController } from "./TextSnippetDetailController";
import { SelectorSnippetDetailController } from "./SelectorSnippetDetailController";
import { ScoreboardObjectiveSnippetDetailController } from "./ScoreboardObjectiveDetailController";
import { KeybindSnippet } from "../../classes/Snippets/KeybindSnippet";
import { KeybindSnippetDetailController } from "./KeybindSnippetDetailController";

export interface SnippetDetailControllerProps {
  snippet: Snippet
  updateSnippet: (Snippet) => void
  stopEditing: (boolean) => void
}

export interface SnippetDetailControllerState {
  
}

export class SnippetDetailController extends React.Component<SnippetDetailControllerProps, SnippetDetailControllerState> {
  
  constructor(props: SnippetDetailControllerProps) {
    super(props)
    
    console.log(this.props)

    this.state = {}
  }
  render() {
    if (this.props.snippet instanceof TextSnippet) {
      return <TextSnippetDetailController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} stopEditing={this.props.stopEditing} />
    } else if (this.props.snippet instanceof SelectorSnippet) {
      return <SelectorSnippetDetailController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} stopEditing={this.props.stopEditing} />
    } else if (this.props.snippet instanceof ScoreboardObjectiveSnippet) {
      return <ScoreboardObjectiveSnippetDetailController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} stopEditing={this.props.stopEditing} />
    } else if (this.props.snippet instanceof KeybindSnippet) {
      return <KeybindSnippetDetailController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} stopEditing={this.props.stopEditing} />
    } else {
      return <span>{typeof this.props.snippet} isn't implemented supported renderer</span>
    }
  }
}