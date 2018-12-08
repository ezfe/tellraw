import * as React from "react";
import { Snippet } from "../../classes/Snippets/Snippet"
import { InlineEditButton } from "../InlineEditButton";
import { TextSnippet } from "../../classes/Snippets/TextSnippet";
import { SelectorSnippet } from "../../classes/Snippets/SelectorSnippet";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/ScoreboardObjectiveSnippet";

export interface InlineSnippetControllerProps {
    updateSnippet: (Snippet) => void
    startEditingSnippet: (Snippet) => void
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
// export interface InlineSnippetController extends React.Component<InlineSnippetControllerProps, {}> {

    // constructor(props: InlineSnippetControllerProps) {
    //     super(props)

    //     this.state = {
    //         quickAction: "*"
    //     }
    // }

    // changeSelector(event: any) {
    //     this.updateField("selector", event.target.value)
    // }

    // changeScoreName(event: any) {
    //     this.updateField("score_name", event.target.value)
    // }

    // changeScoreObjective(event: any) {
    //     this.updateField("score_objective", event.target.value)
    // }

    // updateField(field: string, value: any) {
    //     console.log(this.props)
    //     let newSnippet = this.props.snippet.copy()
    //     newSnippet[field] = value
    //     this.props.updateSnippet(newSnippet)
    // }

    // selectorRenderer() {
    //     if (this.props.snippet instanceof SelectorSnippet) {
    //         return (
    //             <>
    //                 <div className="col-1">
    //                     <InlineEditButton onClick={() => { this.props.editSnippet(this.props.snippet) }} />
    //                 </div>
    //                 <div className="col">
    //                     <input className="form-control" placeholder="Selector..." value={this.props.snippet.selector} onChange={this.changeSelector} />
    //                 </div>
    //             </>
    //         )
    //     } else {
    //         return <span>Error in selectorRenderer!</span>   
    //     }
    // }

    // scoreboardRenderer() {
    //     if (this.props.snippet instanceof ScoreboardObjectiveSnippet) {
    //         return (
    //             <>
    //                 <div className="col-1">
    //                     <InlineEditButton onClick={() => { this.props.editSnippet(this.props.snippet) }} />
    //                 </div>
    //                 <div className="col">
    //                     <input className="form-control" placeholder="Player" value={this.props.snippet.score_name} onChange={this.changeScoreName} />
    //                 </div>
    //                 <div className="col">
    //                     <input className="form-control" placeholder="Objective" value={this.props.snippet.score_objective} onChange={this.changeScoreObjective} />
    //                 </div>
    //             </>
    //         )
    //     } else {
    //         return <span>Error in selectorRenderer!</span>   
    //     }
    // }

    // render() {
    //     let renderer = this.unsupportedRenderer

    //     if (this.props.snippet instanceof TextSnippet) {
    //         renderer = this.textRender
    //     } else if (this.props.snippet instanceof SelectorSnippet) {
    //         renderer = this.selectorRenderer
    //     } else if (this.props.snippet instanceof ScoreboardObjectiveSnippet) {
    //         renderer = this.scoreboardRenderer
    //     // } else if (this.props.snippet.type == SnippetType.lineBreak) {
    //     //     renderer = () => {
    //     //         return <div className="col">⏎</div>
    //     //     }
    //     } else {
    //         console.error(`Unsupported renderer ${typeof this.props.snippet}`)
    //     }

    //     return (
    //         <div className="row margin-below">
    //             { renderer() }
    //         </div>
    //     )
    // }
// }