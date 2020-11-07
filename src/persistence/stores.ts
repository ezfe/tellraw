import type { Color } from "../classes/Color";
import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { DEFAULT_COMMAND_TYPE, LSKEY_COMMAND_STRING, LSKEY_COMMAND_TYPE, LSKEY_CUSTOM_COLORS, LSKEY_SNIPPET_ARR, LSKEY_VERSION } from "../constants";
import { template_lookup } from "../data/templates";
import { loadCurrentVersionState } from "../helpers/loaders";
import { defaultVersion } from "../helpers/versions";
import { getItem } from "./local_storage";
import buildStore from "./store_builder";

// Snippets
const INITIAL_SNIPPETS = getItem(LSKEY_SNIPPET_ARR, Array<Snippet>(), (lsValue: string) => {
  const parsed = JSON.parse(lsValue || "[]") as Array<object>;
  return loadCurrentVersionState(parsed);
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