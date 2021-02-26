import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";
import { GroupSnippet } from "../classes/Snippets/SnippetTypes/GroupSnippet";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";

// Version 6
export function loadCurrentVersionState(source_array: Array<object>, filterShadowItems: boolean = true): Array<Snippet> {
  console.log('Parsing snippets', source_array);
  const parsed = source_array.filter(s => {
    if (!s) {
      console.error('Received null item', s, source_array)
      return false;
    }

    if (filterShadowItems && s[SHADOW_ITEM_MARKER_PROPERTY_NAME]) {
      console.log('Filtering shadow item', s, source_array)
      return false;
    }

    return true;
  }).map((s): Snippet => {
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