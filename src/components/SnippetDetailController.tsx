import * as React from "react";
import { Snippet, Color } from "../classes/Snippet"

export interface SnippetDetailControllerProps {
    snippet: Snippet
    saveChanges: (Snippet) => void
    deleteSnippet: (string) => void
    cancelEditing: () => void
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class SnippetDetailController extends React.Component<SnippetDetailControllerProps, {}> {

    constructor(props: SnippetDetailControllerProps) {
        super(props)

        this.state = {}

        // this.changeText = this.changeText.bind(this)
    }

    // changeText (event: any) {
    //     let newSnippet = this.props.snippet.copy()
    //     newSnippet.text = event.target.value
    //     this.props.finishEditing(newSnippet)
    // }

    render() {
        // return <input value={this.props.snippet.text} onChange={this.changeText} />
        return <div/>
    }
}