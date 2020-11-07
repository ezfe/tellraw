import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { NBTSnippet } from "../classes/Snippets/SnippetTypes/NBTSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";

function iconPropForSnippet(snippet: Snippet): string /* IconProp */ {
  if (snippet instanceof KeybindSnippet) {
    return "keyboard"
  } else if (snippet instanceof ScoreboardObjectiveSnippet) {
    return "trophy"
  } else if (snippet instanceof SelectorSnippet) {
    return "user-tag"
  } else if (snippet instanceof NBTSnippet) {
    return "database"
  }

  return null
}

// export function iconForSnippet(snippet: Snippet): JSX.Element {
//   const iconProp = iconPropForSnippet(snippet)
//   if (iconProp) {
//     return <FontAwesomeIcon icon={iconPropForSnippet(snippet)} />
//   } else {
//     return null
//   }
// }