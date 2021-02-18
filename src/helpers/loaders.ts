import type { Color } from "../classes/Color";
import { GroupSnippet } from "../classes/Snippets/SnippetTypes/GroupSnippet";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
import { LSKEY_SNIPPET_ARR, VERSION } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";

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
export function loadCurrentVersionState(source_array: Array<object>, filterShadowItems: boolean = true): Array<Snippet> {
  console.log('Parsing snippets', source_array);
  const parsed = source_array.map((s): Snippet => {
    if (!s) {
      console.error('Received null item', s, source_array)
      return;
    }

    if (filterShadowItems && s[SHADOW_ITEM_MARKER_PROPERTY_NAME]) {
      console.log('Filtering shadow item', s, source_array)
      return;
    }

    // s["id"] = uuidv4();
    console.log('Encountered item ID', s["id"]);

    if (s instanceof Snippet) {
      return s;
    }

    if (s.hasOwnProperty("hover_event_children")) {
      s["hover_event_children"] = loadCurrentVersionState(s["hover_event_children"])
    }

    if (s.hasOwnProperty("text")) {
      return (Object as any).assign(new TextSnippet(), s)
    } else if (s.hasOwnProperty("children")) {
      s["children"] = loadCurrentVersionState(s["children"])
      return (Object as any).assign(new GroupSnippet(), s)
    } else {
      let x = new TextSnippet()
      x.text = `Failed to claim ${JSON.stringify(s)}`
      return x
    }
  })
  console.log('Built properly typed array', parsed);
  return parsed;
}