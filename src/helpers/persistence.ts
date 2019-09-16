import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { PagebreakSnippet } from "../classes/Snippets/SnippetTypes/PagebreakSnippet";
import { VERSION, LSKEY_SNIPPET_ARR } from "../constants";

export function legacyStatePreparation() {
  
  const lsformat = parseInt(localStorage.getItem("jformat") || VERSION.toString())
  console.log(`Processing legacy state ${lsformat}`)

  if (lsformat <= 3) {
    console.warn("Resetting local state instead of upgrading")
    localStorage.clear()
    return
  } else if (lsformat === 4) {
    console.log(`Upgrading local state from ${lsformat} to ${VERSION}`)

    const source_array = JSON.parse(localStorage.getItem("jobject") || "[]")

    const loaded = source_array.map((sf) => {
        if (sf["NEW_ITERATE_FLAG"]) {
            return new PagebreakSnippet(null)
        } else if ("text" in sf) {
            return TextSnippet.load_legacy(sf)
        } else if ("selector" in sf) {
            return SelectorSnippet.load_legacy(sf)
        } else if ("score" in sf) {
            return ScoreboardObjectiveSnippet.load_legacy(sf)
        }
    })
  
    console.log("Clearing local storage in preparation for new object")
    localStorage.clear()
    console.log("Storing new object")
    localStorage.setItem(LSKEY_SNIPPET_ARR, JSON.stringify(loaded))
    localStorage.setItem("jformat", VERSION.toString())
    return
  } else {
    localStorage.setItem("jformat", VERSION.toString())
  }
}

export function loadV5State(source_array: Array<object>): Array<Snippet> {
  return source_array.map((s): Snippet => {
    if (s.hasOwnProperty("text")) {
      if (s["text"] === "\n") {
        return (Object as any).assign(new LinebreakSnippet(), s)
      } else {
        return (Object as any).assign(new TextSnippet(), s)
      }
    } else if (s.hasOwnProperty("keybind")) {
      return (Object as any).assign(new KeybindSnippet(), s)
    } else if (s.hasOwnProperty("score")) {
      return (Object as any).assign(new ScoreboardObjectiveSnippet(), s)
    } else if (s.hasOwnProperty("selector")) {
      return (Object as any).assign(new SelectorSnippet(), s)
    } else if (s.hasOwnProperty("isPagebreak")) {
      return (Object as any).assign(new PagebreakSnippet, s)
    } else {
      let x = new TextSnippet()
      x.text = `Failed to claim ${JSON.stringify(s)}`
      return x
    }
  })
}