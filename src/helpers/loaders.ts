import type { Color } from "../classes/Color";
import { GroupSnippet } from "../classes/Snippets/SnippetTypes/GroupSnippet";
import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
import { NBTSnippet } from "../classes/Snippets/SnippetTypes/NBTSnippet";
import { PagebreakSnippet } from "../classes/Snippets/SnippetTypes/PagebreakSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
import { TranslateSnippet } from "../classes/Snippets/SnippetTypes/TranslateSnippet";
import { LSKEY_SNIPPET_ARR, VERSION } from "../constants";

export function legacyStatePreparation() {

  const lsformat = parseInt(localStorage.getItem("jformat") || VERSION.toString())
  console.log("Verifying format...")
  console.log("Currently", lsformat)
  console.log("Wanted", VERSION)

  if (lsformat < 5) {
    console.warn("Resetting local state instead of upgrading")
    localStorage.clear()
    return
  }

  if (lsformat == 5) {
    console.log(`Upgrading local state from ${lsformat} to ${VERSION}`)
    console.log("Mapping colors, then deferring to default loader")

    const source_str = localStorage.getItem(LSKEY_SNIPPET_ARR)
    const source_array = JSON.parse(source_str || "[]") as Array<object>

    const correctedSnippetArray = upgradeV5State(source_array)

    localStorage.setItem(LSKEY_SNIPPET_ARR, JSON.stringify(correctedSnippetArray))
  }

  if (lsformat == 6) {
    // no upgrade actions needed
    // reserved for `svelte` release
    alert(
`Hello!\n\nI've made substantial changes to the technology powering this website, \
so it should now be much faster to load and snappier to interact with.\n\nPlease \
reach out to me if you experience any problems using the website – especially if \
it's a new problem you haven't encountered before. There is a contact button at \
the bottom of the page.\n\n- Ezekiel`)
  }

  localStorage.setItem("jformat", VERSION.toString())
}

export function upgradeV5State(source_array: Array<object>): Array<object> {
  return source_array.map((s): object => {
    const parsedColorInt = parseInt(s["color"])
    if (!isNaN(parsedColorInt)) {
      const v5ColorMap: Color[] = [
        "black",
        "dark_blue",
        "dark_green",
        "dark_aqua",
        "dark_red",
        "dark_purple",
        "gold",
        "gray",
        "dark_gray",
        "blue",
        "green",
        "aqua",
        "red",
        "light_purple",
        "yellow",
        "white",
        "none"
      ]
      if (parsedColorInt < v5ColorMap.length) {
        s["color"] = v5ColorMap[parsedColorInt]
      }
    }

    return s
  })
}

// Version 6
export function loadCurrentVersionState(source_array: Array<object>): Array<Snippet> {
  return source_array.map((s): Snippet => {
    if (s instanceof Snippet) {
      return s;
    }

    if (s.hasOwnProperty("hover_event_children")) {
      const childSnippets = loadCurrentVersionState(s["hover_event_children"])
      s["hover_event_children"] = childSnippets
    }

    if (s.hasOwnProperty("text")) {
      if (s["text"] === "\n") {
        return (Object as any).assign(new LinebreakSnippet(), s)
      } else {
        return (Object as any).assign(new TextSnippet(), s)
      }
    } else if (s.hasOwnProperty("keybind")) {
      return (Object as any).assign(new KeybindSnippet(), s)
    } else if (s.hasOwnProperty("score") || s.hasOwnProperty("score_name")) {
      return (Object as any).assign(new ScoreboardObjectiveSnippet(), s)
    } else if (s.hasOwnProperty("selector")) {
      return (Object as any).assign(new SelectorSnippet(), s)
    } else if (s.hasOwnProperty("nbt")) {
      return (Object as any).assign(new NBTSnippet(), s)
    } else if (s.hasOwnProperty("translate")) {
      return (Object as any).assign(new TranslateSnippet(), s)
    } else if (s.hasOwnProperty("isPagebreak")) {
      return (Object as any).assign(new PagebreakSnippet(), s)
    } else if (s.hasOwnProperty("children")) {
      // s["children"] = loadCurrentVersionState(s["children"])
      return (Object as any).assign(new GroupSnippet(), s)
    } else {
      let x = new TextSnippet()
      x.text = `Failed to claim ${JSON.stringify(s)}`
      return x
    }
  })
}