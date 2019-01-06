import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";

export function load_legacy(): Array<Snippet> {
    const snippets_found = JSON.parse(localStorage.getItem("jobject") || "[]")
    let snippets_built = new Array<Snippet>()

    snippets_found.forEach(sf => {
        if (sf["NEW_ITERATE_FLAG"]) {
            console.error("Unimplemented: convert new book page")
            let snippet = new TextSnippet(null)
            snippet.text = "!!Book Page Breaks Are Unimplemented!!"
            snippets_built.push(snippet)
        } else if ("text" in sf) {
            const snippet = TextSnippet.load_legacy(sf)
            snippets_built.push(snippet)
        } else if ("selector" in sf) {
            const snippet = SelectorSnippet.load_legacy(sf)
            snippets_built.push(snippet)
        } else if ("score" in sf) {
            const snippet = ScoreboardObjectiveSnippet.load_legacy(sf)
            snippets_built.push(snippet)
        }
    });

    return snippets_built
}