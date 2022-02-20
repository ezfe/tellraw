import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { NBTSnippet } from "../classes/Snippets/SnippetTypes/NBTSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import DatabaseIcon from "../components/generic/Icons/Database.svelte";
import TrophyIcon from "../components/generic/Icons/Trophy.svelte";
import UserTagIcon from "../components/generic/Icons/UserTag.svelte";
import KeyboardIcon from "../components/generic/Icons/Keyboard.svelte";

export function iconForSnippet(snippet: Snippet): any {
  if (snippet instanceof KeybindSnippet) {
    return KeyboardIcon
  } else if (snippet instanceof ScoreboardObjectiveSnippet) {
    return TrophyIcon
  } else if (snippet instanceof SelectorSnippet) {
    return UserTagIcon
  } else if (snippet instanceof NBTSnippet) {
    return DatabaseIcon
  }
  return null;
}