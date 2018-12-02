import * as React from "react";
import { Snippet, SnippetType } from "../classes/Snippet";
import { InlineSnippetController } from "./InlineSnippetController";
import { CommandTemplatesController } from "./CommandTemplatesController";
import { compile } from "../helpers";
import { SnippetDetailController } from "./SnippetDetailController";

export interface TellrawProps {

}

interface TellrawState {
    snippets: Array<Snippet>
    editing: Snippet
    compiled: string
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Tellraw extends React.Component<TellrawProps, TellrawState> {
    constructor(props: TellrawProps) {
        super(props);

        this.state = {
            snippets: new Array<Snippet>(),
            editing: null,
            compiled: ""
        }

        this.startEditing = this.startEditing.bind(this)
        this.updateEditing = this.updateEditing.bind(this)
        this.stopEditing = this.stopEditing.bind(this)
        
        this.addTextSnippet = this.addTextSnippet.bind(this)
        this.addLineBreak = this.addLineBreak.bind(this)
        this.addSnippet = this.addSnippet.bind(this)
        this.updateSnippet = this.updateSnippet.bind(this)
        this.recompile = this.recompile.bind(this)

        this.editor = this.editor.bind(this)
        this.listView = this.listView.bind(this)
        this.mainView = this.mainView.bind(this)
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

    addTextSnippet() {
        const snip = new Snippet(null)
        snip.type = SnippetType.text
        snip.text = prompt("Enter text:")

        this.addSnippet(snip)
    }

    addLineBreak() {
        const snip = new Snippet(null)
        snip.type = SnippetType.lineBreak
        snip.text = "\n"
        
        this.addSnippet(snip)
    }

    addSnippet(newSnippet: Snippet) {
        const updated = [...this.state.snippets, newSnippet]
        this.setState({ snippets: updated })

        this.recompile(updated)
    }

    updateSnippet(newSnippet: Snippet) {
        const updatedSnippets = this.state.snippets.map(currentSnippet => {
            if (currentSnippet.id === newSnippet.id) {
               return newSnippet
            } else {
                return currentSnippet
            }
        })

        this.setState({snippets: updatedSnippets})
        this.recompile(updatedSnippets)
    }

    recompile(snippets: Array<Snippet> = null) {
        if (snippets === null) snippets = this.state.snippets
        this.setState({ compiled: compile(snippets) })
    }

    editor() {
        return <SnippetDetailController snippet={this.state.editing} updateSnippet={this.updateEditing} stopEditing={this.stopEditing}/>
    }

    listView() {
        return (
            <div>
                {
                    this.state.snippets.map((s: Snippet) => {
                        return <InlineSnippetController key={s.id}
                                                        snippet={s}
                                                        updateSnippet={this.updateSnippet}
                                                        editSnippet={this.startEditing} />
                    })
                }
                <button onClick={this.addTextSnippet}>Add</button>
                <button onClick={this.addLineBreak}>New Line</button>
            </div>
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
                <div className="row">
                    <div className="col-sm-2 col-xs-12 row-margin-top row-margin-bottom">
                        <span lang="player.header">Player and Command</span>
                        <br />
                        <span lang="player.description">Used to select and execute different players</span>
					</div>
                    <div id="playerDiv" className="col-sm-10 col-xs-12 row-margin-top row-margin-bottom command_container">
                        <input value="tellraw @a" id="command" type="text" className="form-control" />
					</div>
				</div>
                <br />
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