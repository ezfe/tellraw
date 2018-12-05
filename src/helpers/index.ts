import { Snippet } from "../classes/Snippets/Snippet";
import { Color } from "../classes/Color";
import { TextSnippet } from "../classes/Snippets/TextSnippet";
import { SelectorSnippet } from "../classes/Snippets/SelectorSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/ScoreboardObjectiveSnippet";

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

export function legacy_apply_common_formatting<T extends Snippet>(snippet: T, sf: object): T {
    if (sf["bold"] === true) {
        snippet.bold = true
    }
    if (sf["italic"] === true) {
        snippet.italic = true
    }
    if (sf["underlined"] === true) {
        snippet.underlined = true
    }
    if (sf["strikethrough"] === true) {
        snippet.strikethrough = true
    }
    if (sf["obfuscated"] === true) {
        snippet.obfuscated = true
    }

    snippet.color = <Color>sf["color"]
    
    if ("insertion" in sf) {
        snippet.insertion = sf["insertion"]
    }

    return snippet
}