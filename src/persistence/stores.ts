import type { Color } from "../classes/Color";
import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { DEFAULT_COMMAND_TYPE, LSKEY_BOOK_PREVIEW_DISCLAIMER, LSKEY_COMMAND_STRING, LSKEY_COMMAND_TYPE, LSKEY_CUSTOM_COLORS, LSKEY_PREVIEW_BGC, LSKEY_SHOW_FAST_EDIT_TIP, LSKEY_SNIPPET_ARR, LSKEY_VERSION } from "../constants";
import { template_lookup } from "../data/templates";
import { loadCurrentVersionState } from "../helpers/loaders";
import { getItem } from "./local_storage";
import buildStore from "./store_builder";

// Snippets
const INITIAL_SNIPPETS = getItem(LSKEY_SNIPPET_ARR, Array<Snippet>(), (lsValue: string) => {
  try {
    const parsed = JSON.parse(lsValue || "[]") as Array<object>;
    return loadCurrentVersionState(parsed);
  } catch (error) {
    console.error(error);
    return [];
  }
});
export const snippets = buildStore(INITIAL_SNIPPETS, LSKEY_SNIPPET_ARR);

// Preview Background Color
const INITIAL_BG_COLOR = getItem(LSKEY_PREVIEW_BGC, '#ffffff')
export const previewBackgroundColor = buildStore(INITIAL_BG_COLOR, LSKEY_PREVIEW_BGC)
