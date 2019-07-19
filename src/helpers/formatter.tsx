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
import { iconForSnippet } from "./snippet_icon";
import { PagebreakSnippet } from "../classes/Snippets/SnippetTypes/PagebreakSnippet";

export function formatSnippets(snippets: Array<Snippet>): JSX.Element {
  const mapped = snippets.map(formatSnippet)
  
  return <>{ mapped }</>
}

function wrapText(text: string): JSX.Element {
  return <span>{ text }</span>
}

export function formatSnippet(snippet: Snippet): JSX.Element {
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
  let icon = iconForSnippet(snippet)
  if (icon !== null) className = "bordered-formatter-preview"

  const formatting: React.CSSProperties = {
    fontWeight: snippet.bold ? 'bold' : 'normal',
    fontStyle: snippet.italic ? 'italic' : 'normal',
    textDecoration: textDecorationValue,
    color: getCSSHEX(snippet.color)
  }

  let text: JSX.Element = wrapText("@unknown-type")
  if (snippet instanceof TextSnippet) {
    text = wrapText(snippet.text)
  } else if (snippet instanceof KeybindSnippet) {
    text = wrapText(snippet.keybind)
  } else if (snippet instanceof ScoreboardObjectiveSnippet) {
    text = wrapText(`${snippet.score_objective}@${snippet.score_name}`)
  } else if (snippet instanceof SelectorSnippet) {
    text = wrapText(snippet.selector)
  } else if (snippet instanceof LinebreakSnippet) {
    text = <br />
  } else if (snippet instanceof PagebreakSnippet) {
    text = <><br />-- page --<br /></>
  }

  return (
    <span className={className} style={formatting} key={snippet.id}>
      {
        icon !== null ? (
          <>
            { icon }
            {'\u00A0' /* Unicode Non Blocking Space */}
          </>
        ) : null
      }
      { text }
    </span>
  )
}