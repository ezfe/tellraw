import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { load_legacy } from ".";
import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
// import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
// import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
// import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
// import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
// import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";

export function currentTimeStamp(): number {
  return new Date().getTime()
}

export function loadState(): Snippet[] {
  
  const lsformat = parseInt(localStorage.getItem("jformat") || "5")

  if (lsformat <= 3) {
    localStorage.clear()
    location.reload()
  } else if (lsformat === 4) {
    console.log("Processing legacy localStorage")
    return load_legacy()
  } else if (lsformat === 5) {
    const loaded_snippets_temp = JSON.parse(localStorage.getItem('jobject') || "[]") as Array<object>
    return loaded_snippets_temp.map((s): Snippet => {
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
      } else {
        let x = new TextSnippet()
        x.text = `Failed to claim ${JSON.stringify(s)}`
        return x
      }
    })
  } else {
    console.error(`Unexpected version ${lsformat}`)
  }


  return null;
}

export function saveState(snippets: Snippet[]) {
  
}