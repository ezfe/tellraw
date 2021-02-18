import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";

export function object_compile(sections: Snippet[][]): any {
  // Depending on whether a sign click
  // event is used, sections may be single
  // tellraw snippets instead of normal arrays
  let results = Array<Object>();

  for (const section_snippets of sections) {
    let section_results = Array<Object>();
    section_results.push("");
    for (const snippet of section_snippets) {
      let pending = {};

      if (snippet instanceof TextSnippet) {
        pending["text"] = snippet.text;
      }

      section_results.push(pending);
    }
    // If there are 2 elements
    // (the first element is always "")
    // then replace it all with that one blob
    if (section_results.length == 2) {
      results.push(section_results[1]);
    } else {
      results.push(section_results);
    }
  }

  if (results.length > 0) {
    return JSON.stringify(results[0]);
  } else {
    console.error("No elements?");
    return "";
  }
}

export function compile(snippets: Array<Snippet>): string {
  const section_list = Array<Array<Snippet>>();
  let unprocessed = [...snippets];

  section_list.push(unprocessed);

  const results = object_compile(section_list);

  return `/tellraw @p ${results}`
}
