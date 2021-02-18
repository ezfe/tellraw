import { GroupSnippet } from "../classes/Snippets/SnippetTypes/GroupSnippet"
import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet"
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet"

export function duplicate_snippet(snippet: Snippet) {
  if (snippet instanceof TextSnippet) {
    return snippet.copy()
  } else if (snippet instanceof GroupSnippet) {
    return snippet.copy()
  } else {
    console.error("An error occurred copying a snippet. It probably hasn't been implemented yet in the copy_snippet function.")

    let x = new TextSnippet(null)
    x.text = "A copy error occurred"
    return x
  }
}
