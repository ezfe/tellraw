import * as React from "react";
import { Snippet, SnippetType } from "../classes/Snippet"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface InlineSnippetControllerProps {
    snippet: Snippet
    updateSnippet: (Snippet) => void
    editSnippet: (Snippet) => void
}

interface InlineSnippetControllerState {
    quickAction: string
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class InlineSnippetController extends React.Component<InlineSnippetControllerProps, InlineSnippetControllerState> {

    constructor(props: InlineSnippetControllerProps) {
        super(props)

        this.state = {
            quickAction: "*"
        }

        this.changeText = this.changeText.bind(this)
        this.changeSelector = this.changeSelector.bind(this)
        this.changeScoreName = this.changeScoreName.bind(this)
        this.changeScoreObjective = this.changeScoreObjective.bind(this)

        this.updateField = this.updateField.bind(this)
        this.handleQuickActions = this.handleQuickActions.bind(this)

        this.textRender = this.textRender.bind(this)
        this.selectorRenderer = this.selectorRenderer.bind(this)
        this.scoreboardRenderer = this.scoreboardRenderer.bind(this)
        this.unsupportedRenderer = this.unsupportedRenderer.bind(this)
    }

    changeText(event: any) {
        this.updateField("text", event.target.value)
    }

    changeSelector(event: any) {
        this.updateField("selector", event.target.value)
    }

    changeScoreName(event: any) {
        this.updateField("score_name", event.target.value)
    }

    changeScoreObjective(event: any) {
        this.updateField("score_objective", event.target.value)
    }

    updateField(field: string, value: any) {
        let newSnippet = this.props.snippet.copy()
        console.log(newSnippet)
        newSnippet[field] = value
        this.props.updateSnippet(newSnippet)
    }

    handleQuickActions(event) {
        const target = event.target
        const value = target.value

        if (value != "*") {
            this.updateField(value, !this.props.snippet[value])
        }
    }

    textRender() {
        return (
            <>
                <div className="col-1">
                    <button className="btn" onClick={() => { this.props.editSnippet(this.props.snippet) }}>
                        <FontAwesomeIcon icon="edit" /> Edit
                    </button>
                </div>
                <div className="col">
                    <input className="form-control" placeholder="Text..." value={this.props.snippet.text} onChange={this.changeText} />
                </div>
            </>
        )
    }

    selectorRenderer() {
        return (
            <>
                <div className="col-1">
                    <button className="btn" onClick={() => { this.props.editSnippet(this.props.snippet) }}>
                        <FontAwesomeIcon icon="edit" /> Edit
                    </button>
                </div>
                <div className="col">
                    <input className="form-control" placeholder="Selector..." value={this.props.snippet.selector} onChange={this.changeSelector} />
                </div>
            </>
        )
    }

    scoreboardRenderer() {
        return (
            <>
                <div className="col-1">
                    <button className="btn" onClick={() => { this.props.editSnippet(this.props.snippet) }}>
                        <FontAwesomeIcon icon="edit" /> Edit
                    </button>
                </div>
                <div className="col">
                    <input className="form-control" placeholder="Player" value={this.props.snippet.score_name} onChange={this.changeScoreName} />
                </div>
                <div className="col">
                    <input className="form-control" placeholder="Objective" value={this.props.snippet.score_objective} onChange={this.changeScoreObjective} />
                </div>
            </>
        )
    }

    unsupportedRenderer() {
        return <span>Unsupported Format <button onClick={() => { this.props.editSnippet(this.props.snippet) }}>✏️</button></span>
    }

    render() {
        let renderer = this.unsupportedRenderer

        console.log(this.props.snippet.type)
        console.log(SnippetType[SnippetType.text])

        if (this.props.snippet.type == SnippetType.text) {
            renderer = this.textRender
        } else if (this.props.snippet.type == SnippetType.selector) {
            renderer = this.selectorRenderer
        } else if (this.props.snippet.type == SnippetType.scoreboardObjective) {
            renderer = this.scoreboardRenderer
        } else if (this.props.snippet.type == SnippetType.lineBreak) {
            renderer = () => {
                return <div className="col">⏎</div>
            }
        } else {
            console.error(`Unsupported renderer ${this.props.snippet.type}`)
        }

        return (
            <div className="row margin-below">
                { renderer() }
            </div>
        )
    }
}