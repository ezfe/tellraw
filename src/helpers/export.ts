import { VERSION } from "../constants"
import type { CommandType } from "../data/templates"
import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet"
import { duplicate_snippet } from "./duplicate_snippet"
import { GroupSnippet } from "../classes/Snippets/SnippetTypes/GroupSnippet";

function strip_id(snippet: Snippet): Snippet {
  delete snippet.id;
  snippet.hover_event_children = snippet.hover_event_children.map(child => strip_id(child));
  if (snippet instanceof GroupSnippet) {
    snippet.children = snippet.children.map(child => strip_id(child));
  }
  return snippet;
}

export function export_snippets(snippets: Array<Snippet>, command: string, type: CommandType): string {
  const snippets_stripped = snippets
    .map(snippet => duplicate_snippet(snippet))
    .map(snippet => strip_id(snippet));

  const data = {
    "jformat": VERSION,
    "jobject": snippets_stripped,
    "command": command,
    "jtemplate": type
  }

  return JSON.stringify(data)
}