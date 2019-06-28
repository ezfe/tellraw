import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";

export function load_legacy(): Array<Array<Snippet>> {
    const snippets_found = JSON.parse(localStorage.getItem("jobject") || "[]")
    
    let snippets_built = new Array<Array<Snippet>>()
    snippets_built.push(new Array<Snippet>())

    snippets_found.forEach(sf => {
        const last_index = snippets_built.length - 1

        if (sf["NEW_ITERATE_FLAG"]) {
            snippets_built.push([])
        } else if ("text" in sf) {
            const snippet = TextSnippet.load_legacy(sf)
            snippets_built[last_index].push(snippet)
        } else if ("selector" in sf) {
            const snippet = SelectorSnippet.load_legacy(sf)
            snippets_built[last_index].push(snippet)
        } else if ("score" in sf) {
            const snippet = ScoreboardObjectiveSnippet.load_legacy(sf)
            snippets_built[last_index].push(snippet)
        }
    });

    return snippets_built
}