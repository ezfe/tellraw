import type { Color } from "../classes/Color";
import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { DEFAULT_COMMAND_TYPE, LSKEY_BOOK_PREVIEW_DISCLAIMER, LSKEY_COMMAND_STRING, LSKEY_COMMAND_TYPE, LSKEY_CUSTOM_COLORS, LSKEY_CUSTOM_LANGUAGE_TRANSLATIONS, LSKEY_LIT_SIGN, LSKEY_PREVIEW_BGC, LSKEY_SHOW_FAST_EDIT_TIP, LSKEY_SNIPPET_ARR, LSKEY_VERSION } from "../constants";
import { template_lookup } from "../data/templates";
import { loadCurrentVersionState } from "../helpers/loaders";
import { defaultVersion } from "../helpers/versions";
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

// Command
const INITIAL_COMMAND = getItem(LSKEY_COMMAND_STRING, template_lookup(DEFAULT_COMMAND_TYPE)[0]);
export const command = buildStore(INITIAL_COMMAND, LSKEY_COMMAND_STRING);

// Command Type
const INITIAL_COMMAND_TYPE = getItem(LSKEY_COMMAND_TYPE, DEFAULT_COMMAND_TYPE);
export const commandType = buildStore(INITIAL_COMMAND_TYPE, LSKEY_COMMAND_TYPE);

// Custom Colors
const INITIAL_CUSTOM_COLORS = getItem(LSKEY_CUSTOM_COLORS, Array<Color>());
export const customColors = buildStore(INITIAL_CUSTOM_COLORS, LSKEY_CUSTOM_COLORS);

// Version
const INITIAL_VERSION = getItem(LSKEY_VERSION, defaultVersion);
export const version = buildStore(INITIAL_VERSION, LSKEY_VERSION);

// Preview Background Color
const INITIAL_BG_COLOR = getItem(LSKEY_PREVIEW_BGC, '#008cb4')
export const previewBackgroundColor = buildStore(INITIAL_BG_COLOR, LSKEY_PREVIEW_BGC)

// Book Preview Disclaimer
const INITIAL_BPDISC = getItem(LSKEY_BOOK_PREVIEW_DISCLAIMER, false)
export const bookPreviewDisclaimerShown = buildStore(INITIAL_BPDISC, LSKEY_BOOK_PREVIEW_DISCLAIMER)

// Book Preview Disclaimer
const INITIAL_SHOW_FAST_EDIT = getItem(LSKEY_SHOW_FAST_EDIT_TIP, true)
export const fastEditTipShown = buildStore(INITIAL_SHOW_FAST_EDIT, LSKEY_SHOW_FAST_EDIT_TIP)

// Custom Language Translations
const INITIAL_CUSTOM_TRANSLATIONS = getItem(LSKEY_CUSTOM_LANGUAGE_TRANSLATIONS, {})
export const customLanguageTranslations = buildStore(INITIAL_CUSTOM_TRANSLATIONS, LSKEY_CUSTOM_LANGUAGE_TRANSLATIONS)

// Glowing Sign Color
const INITIAL_LIT_SIGN = getItem(LSKEY_LIT_SIGN, false)
export const litSign = buildStore(INITIAL_LIT_SIGN, LSKEY_LIT_SIGN)
