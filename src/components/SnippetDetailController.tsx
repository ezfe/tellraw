import * as React from "react";
import { Color } from "../classes/Color";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SelectorSnippet";
import { Snippet } from "../classes/Snippets/Snippet";
import { TextSnippet } from "../classes/Snippets/TextSnippet";

export interface SnippetDetailControllerProps {
    snippet: Snippet
    updateSnippet: (Snippet) => void
    stopEditing: (boolean) => void
}

export interface SnippetDetailControllerState {
    
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class SnippetDetailController extends React.Component<SnippetDetailControllerProps, SnippetDetailControllerState> {

    constructor(props: SnippetDetailControllerProps) {
        super(props)

        this.state = {}
        
        this.changeText = this.changeText.bind(this)
        this.changeSelector = this.changeSelector.bind(this)
        this.changeScoreName = this.changeScoreName.bind(this)
        this.changeScoreObjective = this.changeScoreObjective.bind(this)
        this.changeColor = this.changeColor.bind(this)
        this.updateField = this.updateField.bind(this)
        // this.changeSnippetType = this.changeSnippetType.bind(this)
        this.mainSnippetFields = this.mainSnippetFields.bind(this)
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

    changeColor(event: any) {
        this.updateField("color", event.target.value)
    }

    updateField(field: string, value: any) {
        let newSnippet = this.props.snippet.copy()
        newSnippet[field] = value
        this.props.updateSnippet(newSnippet)
    }

    mainSnippetFields() {
        if (this.props.snippet instanceof TextSnippet) {
            return (
                <div className="row margin-below">
                    <div className="col">
                        <input className="form-control" placeholder="Text" value={this.props.snippet.text} onChange={this.changeText} />   
                    </div>
                </div>
            )
        } else if (this.props.snippet instanceof SelectorSnippet) {
            return (
                <div className="row margin-below">
                    <div className="col">
                        <input className="form-control" placeholder="Selector" value={this.props.snippet.selector} onChange={this.changeSelector} />
                    </div>
                </div>
            )
        } else if (this.props.snippet instanceof ScoreboardObjectiveSnippet) {
            return (
                <>
                    <div className="row margin-below">
                        <div className="col">
                            <input className="form-control" placeholder="Player" value={this.props.snippet.score_name} onChange={this.changeScoreName} />
                        </div>
                    </div>
                    <div className="row margin-below">
                        <div className="col">
                            <input className="form-control" placeholder="Objective" value={this.props.snippet.score_objective} onChange={this.changeScoreObjective} />
                        </div>
                    </div>
                </>
            )
        } else {
            return <span>Editing unsupported for <pre>{typeof this.props.snippet}</pre> type</span>
        }
    }

    render() {
        return (
            <>
                {/* <div className="row margin-below">
                    <div className="col">
                        <select className="form-control" onChange={this.changeSnippetType} value={this.props.snippet.type}>
                            <option value={SnippetType.text}>Plain Text</option>
                            <option value={SnippetType.selector}>Selector</option>
                            <option value={SnippetType.scoreboardObjective}>Scoreboard Objective</option>
                        </select>
                    </div>
                </div> */}

                <div className="row">
                    <div className="col">
                        { this.mainSnippetFields() }
                    </div>
                    <div className="col-4">
                        <select className="form-control" onChange={this.changeColor} value={this.props.snippet.color}>
                            {
                                Object.keys(Color).filter(key => !isNaN(Number(Color[key])))
                                    .map(key => {
                                        return <option key={Color[key]} value={Color[key]}>{key.split('_').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</option>
                                    })
                            }
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="offset-1 col-2">
                        <button className="btn btn-secondary btn-block" onClick={() => { this.props.stopEditing(false) }}>Cancel</button>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary btn-block" onClick={() => { this.props.stopEditing(true) }}>Save</button>
                    </div>
                </div>
            </>
        )
    }
}