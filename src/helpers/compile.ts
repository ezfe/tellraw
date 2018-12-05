import { Snippet, Color, TextSnippet, SelectorSnippet } from "../classes/Snippet";

export function compile(snippets: Array<Snippet>, command: string): string {

  let results = Array<Object>()
  results.push("")
  for (const snippet of snippets) {
      let pending = {}

      console.log(snippet)

      if (snippet instanceof TextSnippet) {//.type == SnippetType.text || snippet.type == SnippetType.lineBreak) {
          pending["text"] = snippet.text
      }

      if (snippet instanceof SelectorSnippet) {
          pending["selector"] = snippet.selector
      }

      // if (snippet.type == SnippetType.scoreboardObjective) {
      //     pending["score"] = {
      //         "name": snippet.score_name,
      //         "objective": snippet.score_objective
      //     }
      // }

      /* Style Transfer */
      if (snippet.bold) pending["bold"] = true
      if (snippet.italic) pending["italic"] = true
      if (snippet.underlined) pending["underlined"] = true
      if (snippet.strikethrough) pending["strikethrough"] = true
      if (snippet.obfuscated) pending["obfuscated"] = true
      if (snippet.color != Color.none) pending["color"] = Color[snippet.color]

      if (snippet.insertion.length > 0) {
          pending["insertion"] = snippet.insertion
      }

      results.push(pending)
  }

  const encoded = JSON.stringify(results)
  if (command.indexOf("%s") === -1) {
      // error
      console.error("No %s to replace")
      return encoded
  } else {
      return command.replace("%s", encoded);
  }
}