import * as React from "react";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function iconPropForSnippet(snippet: Snippet): IconProp {
  if (snippet instanceof KeybindSnippet) {
    return "keyboard"
  } else if (snippet instanceof ScoreboardObjectiveSnippet) {
    return "trophy"
  } else if (snippet instanceof SelectorSnippet) {
    return "user-tag"
  }

  return null
}

export function iconForSnippet(snippet: Snippet): JSX.Element {
  const iconProp = iconPropForSnippet(snippet)
  if (iconProp) {
    return <FontAwesomeIcon icon={iconPropForSnippet(snippet)} />
  } else {
    return null
  }
}