import { Snippet } from "../classes/Snippets/Snippet";
import { Color } from "../classes/Color";
import { TextSnippet } from "../classes/Snippets/TextSnippet";
import { SelectorSnippet } from "../classes/Snippets/SelectorSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/ScoreboardObjectiveSnippet";
import { KeybindSnippet } from "../classes/Snippets/KeybindSnippet";

export function compile(snippets: Array<Snippet>, command: string): string {

  let results = Array<Object>()
  results.push("")
  for (const snippet of snippets) {
      let pending = {}

      console.log(snippet)

      if (snippet instanceof TextSnippet) {//.type == SnippetType.text || snippet.type == SnippetType.lineBreak) {
          pending["text"] = snippet.text
      } else if (snippet instanceof SelectorSnippet) {
          pending["selector"] = snippet.selector
      } else if (snippet instanceof ScoreboardObjectiveSnippet) {
          pending["score"] = {
              "name": snippet.score_name,
              "objective": snippet.score_objective
          }

          if (snippet.score_value !== null) {
              pending["score"]["value"] = snippet.score_value
          }
      } else if (snippet instanceof KeybindSnippet) {
          pending["keybind"] = snippet.keybind
      }

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