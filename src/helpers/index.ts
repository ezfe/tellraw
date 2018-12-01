import { Snippet, SnippetType, Color } from "../classes/Snippet";

export function compile(snippets: Array<Snippet>): string {

    let results = Array<Object>()
    results.push("")
    for (const snippet of snippets) {
        let pending = {}

        if (snippet.type == SnippetType.text || snippet.type == SnippetType.lineBreak) {
            pending["text"] = snippet.text
        }

        if (snippet.type == SnippetType.selector) {
            pending["selector"] = snippet.selector
        }

        /* Style Transfer */
        if (snippet.bold) pending["bold"] = true
        if (snippet.italic) pending["italic"] = true
        if (snippet.underlined) pending["underlined"] = true
        if (snippet.strikethrough) pending["strikethrough"] = true
        if (snippet.obfuscated) pending["obfuscated"] = true
        if (snippet.color != Color.none) pending["color"] = snippet.color

        results.push(pending)
    }

    return `tellraw @a ${JSON.stringify(results)}`
}