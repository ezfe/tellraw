import * as React from "react";
import { Snippet } from "../../classes/Snippets/Snippet"
import { TextSnippet } from "../../classes/Snippets/TextSnippet";
import { InlineTextSnippetController } from "./InlineTextSnippetController";
import { SelectorSnippet } from "../../classes/Snippets/SelectorSnippet";
import { InlineSelectorSnippetController } from "./InlineSelectorSnippetController";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/ScoreboardObjectiveSnippet";
import { InlineScoreboardObjectiveSnippetController } from "./InlineScoreboardObjectiveSnippetController";

export interface InlineSnippetControllerProps {
    snippet: Snippet
    updateSnippet: (Snippet) => void
    startEditingSnippet: (Snippet) => void
}

export class InlineSnippetController extends React.Component<InlineSnippetControllerProps, {}> {

    constructor(props: InlineSnippetControllerProps) {
        super(props)
    }

    render() {
        if (this.props.snippet instanceof TextSnippet) {
            return <InlineTextSnippetController snippet={this.props.snippet as TextSnippet} updateSnippet={this.props.updateSnippet} startEditingSnippet={this.props.startEditingSnippet} />
        } else if (this.props.snippet instanceof SelectorSnippet) {
            return <InlineSelectorSnippetController snippet={this.props.snippet as SelectorSnippet} updateSnippet={this.props.updateSnippet} startEditingSnippet={this.props.startEditingSnippet} />
        } else if (this.props.snippet instanceof ScoreboardObjectiveSnippet) {
            return <InlineScoreboardObjectiveSnippetController snippet={this.props.snippet as ScoreboardObjectiveSnippet} updateSnippet={this.props.updateSnippet} startEditingSnippet={this.props.startEditingSnippet} />
        } else {
            return <span>{typeof this.props.snippet} isn't implemented supported renderer</span>
        }
    }
}