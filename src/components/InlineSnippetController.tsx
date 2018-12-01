import * as React from "react";
import { Snippet, Color, SnippetType } from "../classes/Snippet"

export interface InlineSnippetControllerProps {
    snippet: Snippet
    updateSnippet: (Snippet) => void
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
        this.updateField = this.updateField.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleQuickActions = this.handleQuickActions.bind(this)
    }

    changeText(event: any) {
        this.updateField("text", event.target.value)
    }

    updateField(field: string, value: any) {
        let newSnippet = this.props.snippet.copy()
        newSnippet[field] = value
        this.props.updateSnippet(newSnippet)
    }

    toggleEdit() {
        // this.setState({ editing: !this.state.editing })
    }

    handleQuickActions(event) {
        const target = event.target
        const value = target.value

        if (value != "*") {
            this.updateField(value, !this.props.snippet[value])
        }
    }

    render() {
        switch (+this.props.snippet.type) {
            case SnippetType.text:
                return [
                    <div>
                        <input value={this.props.snippet.text} onChange={this.changeText} />
                        <button onClick={this.toggleEdit}>✏️</button>
                        <br />
                        <select name="quick-actions" value={this.state.quickAction} onChange={this.handleQuickActions}>
                            <option value="*">Quick Actions...</option>
                            <option value="bold">{this.props.snippet.bold ? "Remove Bold" : "Add Bold"}</option>
                            <option value="italic">{this.props.snippet.italic ? "Remove Italic" : "Add Italic"}</option>
                            <option value="underlined">{this.props.snippet.underlined ? "Remove Underline" : "Add Underline"}</option>
                            <option value="strikethrough">{this.props.snippet.strikethrough ? "Remove Strikethrough" : "Add Strikethrough"}</option>
                            <option value="obfuscated">{this.props.snippet.obfuscated ? "Remove Obfuscation" : "Add Obfuscation"}</option>
                        </select>
                    </div>
                ]
            case SnippetType.lineBreak:
                return <span>⏎<br /></span>
            default:
                return <span>error</span>
        }
    }
}