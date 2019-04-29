import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import * as React from "react";
import { TextDecorationProperty } from "csstype";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { getCSSHEX, Color } from "../classes/Color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export function format_snippet(snippet: Snippet) {
  if (snippet instanceof LinebreakSnippet) return <br />

  let textDecorationValue: TextDecorationProperty = 'none'
  if (snippet.underlined && !snippet.strikethrough) {
    textDecorationValue = 'underline'
  } else if (snippet.strikethrough && !snippet.underlined) {
    textDecorationValue = 'line-through'
  } else if (snippet.strikethrough && snippet.underlined) {
    textDecorationValue = 'underline line-through'
  }

  let className = ""
  let icon: IconProp = null
  if (snippet instanceof KeybindSnippet) {
    icon = "keyboard"
  } else if (snippet instanceof ScoreboardObjectiveSnippet) {
    icon = "trophy"
  } else if (snippet instanceof SelectorSnippet) {
    icon = "user-tag"
  }
  if (icon !== null) className = "bordered-formatter-preview"

  const formatting: React.CSSProperties = {
    fontWeight: snippet.bold ? 'bold' : 'normal',
    fontStyle: snippet.italic ? 'italic' : 'normal',
    textDecoration: textDecorationValue,
    color: getCSSHEX(snippet.color)
  }

  let text = "@unknown-type"
  if (snippet instanceof TextSnippet) {
    text = snippet.text
  } else if (snippet instanceof KeybindSnippet) {
    text = snippet.keybind
  } else if (snippet instanceof ScoreboardObjectiveSnippet) {
    text = `${snippet.score_objective}@${snippet.score_name}`
  } else if (snippet instanceof SelectorSnippet) {
    text = snippet.selector
  }

  return (
    <span className={className} style={formatting}>
      {
        icon !== null ? (
          <>
            <FontAwesomeIcon icon={icon} style={{color: "black"}}/>
            {'\u00A0' /* Unicode Non Blocking Space */}
          </>
        ) : null
      }
      {text}
    </span>
  )
}