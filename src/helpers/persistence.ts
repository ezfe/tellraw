import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { PagebreakSnippet } from "../classes/Snippets/SnippetTypes/PagebreakSnippet";

// export function currentTimeStamp(): number {
//   return Date.now()
// }

export function loadLocalStorageState(): Snippet[] {
  
  const lsformat = parseInt(localStorage.getItem("jformat") || "5")

  if (lsformat <= 3) {
    localStorage.clear()
    location.reload()
  } else if (lsformat === 4) {
    return loadV4State()
  } else if (lsformat === 5) {
    return loadV5State()
  } else {
    console.error(`Unexpected version ${lsformat}`)
  }

  return null;
}

export function saveState(snippets: Snippet[]) {
  
}

function loadV5State(): Array<Snippet> {
  const source_array = JSON.parse(localStorage.getItem('jobject') || "[]") as Array<object>

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

function loadV4State(): Array<Snippet> {
  const source_array = JSON.parse(localStorage.getItem("jobject") || "[]")

  return source_array.map((sf) => {
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
}