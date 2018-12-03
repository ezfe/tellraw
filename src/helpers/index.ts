import { Snippet, SnippetType, Color } from "../classes/Snippet";

export function compile(snippets: Array<Snippet>): string {

    let results = Array<Object>()
    results.push("")
    for (const snippet of snippets) {
        let pending = {}

        console.log(snippet)

        if (snippet.type == SnippetType.text || snippet.type == SnippetType.lineBreak) {
            pending["text"] = snippet.text
        }

        if (snippet.type == SnippetType.selector) {
            pending["selector"] = snippet.selector
        }

        if (snippet.type == SnippetType.scoreboardObjective) {
            pending["score"] = {
                "name": snippet.score_name,
                "objective": snippet.score_objective
            }
        }

        /* Style Transfer */
        if (snippet.bold) pending["bold"] = true
        if (snippet.italic) pending["italic"] = true
        if (snippet.underlined) pending["underlined"] = true
        if (snippet.strikethrough) pending["strikethrough"] = true
        if (snippet.obfuscated) pending["obfuscated"] = true
        if (snippet.color != Color.none) pending["color"] = snippet.color

        if (snippet.insertion.length > 0) {
            pending["insertion"] = snippet.insertion
        }

        results.push(pending)
    }

    return `tellraw @a ${JSON.stringify(results)}`
}

export function load_legacy(): Array<Snippet> {
    const snippets_found = JSON.parse(localStorage.getItem("jobject") || "[]")
    let snippets_built = new Array<Snippet>()

    snippets_found.forEach(sf => {
        if (sf["NEW_ITERATE_FLAG"]) {
            console.error("Unimplemented: convert new book page")
            let snippet = new Snippet(null)
            snippet.type = SnippetType.text
            snippet.text = "!!Book Page Breaks Are Unimplemented!!"
            snippets_built.push(snippet)
        } else if ("text" in sf) {
            let snippet = new Snippet(null)
            snippet.type = SnippetType.text
            snippet.text = sf["text"]

            snippet = legacy_apply_common_formatting(snippet, sf)
            snippets_built.push(snippet)
        } else if ("selector" in sf) {
            let snippet = new Snippet(null)
            snippet.type = SnippetType.selector
            snippet.selector = sf["selector"]

            snippet = legacy_apply_common_formatting(snippet, sf)
            snippets_built.push(snippet)
        } else if ("score" in sf) {
            let snippet = new Snippet(null)
            snippet.type = SnippetType.scoreboardObjective
            snippet.score_name = sf["score"]["name"]
            snippet.score_objective = sf["score"]["objective"]

            snippet = legacy_apply_common_formatting(snippet, sf)
            snippets_built.push(snippet)
        }
    });

    return snippets_built
}

function legacy_apply_common_formatting(snippet: Snippet, sf: object): Snippet {
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