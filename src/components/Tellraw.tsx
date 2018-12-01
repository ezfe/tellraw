import * as React from "react";
import { Snippet, SnippetType } from "../classes/Snippet";
import { InlineSnippetController } from "./InlineSnippetController";
import { CommandTemplatesController } from "./CommandTemplatesController";
import { compile } from "../helpers";

export interface TellrawProps {

}

interface TellrawState {
    snippets: Array<Snippet>
    compiled: string
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Tellraw extends React.Component<TellrawProps, TellrawState> {
    constructor(props: TellrawProps) {
        super(props);

        this.state = {
            snippets: new Array<Snippet>(),
            compiled: ""
        }

        this.addTextSnippet = this.addTextSnippet.bind(this)
        this.addLineBreak = this.addLineBreak.bind(this)
        this.addSnippet = this.addSnippet.bind(this)
        this.updateSnippet = this.updateSnippet.bind(this)
        this.recompile = this.recompile.bind(this)
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

    render() {
        return (
            <div>
                <label>
                    Player and Command
                    <input />
                </label>
                <br />
                <CommandTemplatesController />
                <br />
                <br />
                <hr />
                <br />
                <br />
                {
                    this.state.snippets.map((s: Snippet) => {
                        return <InlineSnippetController key={s.id} snippet={s} updateSnippet={this.updateSnippet} />
                    })
                }
                
                <button onClick={this.addTextSnippet}>Add</button>
                <button onClick={this.addLineBreak}>New Line</button>

                <br />
                <br />
                <span>{this.state.compiled}</span>
            </div>
        )
    }
}

export default Tellraw