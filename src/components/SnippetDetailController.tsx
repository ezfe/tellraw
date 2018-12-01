import * as React from "react";
import { Snippet, Color, SnippetType } from "../classes/Snippet"

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
        this.changeSnippetType = this.changeSnippetType.bind(this)
    }

    changeText(event: any) {
        let newSnippet = this.props.snippet.copy()
        newSnippet.text = event.target.value
        this.props.updateSnippet(newSnippet)
    }

    changeSnippetType(event) {
        const value = event.target.value

        let newSnippet = this.props.snippet.copy()
        newSnippet.type = value
        this.props.updateSnippet(newSnippet)
    }

    render() {
        return (
            <div>
                <select onChange={this.changeSnippetType} value={this.props.snippet.type}>
                    <option value={SnippetType.text}>Plain Text</option>
                    <option value={SnippetType.selector}>Selector</option>
                </select>


                <input value={this.props.snippet.text} onChange={this.changeText} />

                <button onClick={() => { this.props.stopEditing(false) }}>Cancel</button>
                <button onClick={() => { this.props.stopEditing(true) }}>Save</button>
            </div>
        )
    }
}