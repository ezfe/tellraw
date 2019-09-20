import { TextDecorationProperty } from "csstype";
import * as React from "react";
import { getCSSHEX } from "../classes/Color";
import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
import { PagebreakSnippet } from "../classes/Snippets/SnippetTypes/PagebreakSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
import { iconForSnippet } from "./snippet_icon";

export function formatSnippets(snippets: Array<Snippet>, bookPage?: number): Array<JSX.Element> {
  return snippets.map(formatSnippet)
}

function wrapText(text: string): JSX.Element {
  return <span>{ text }</span>
}

export function formatSnippet(snippet: Snippet): JSX.Element {
  if (snippet instanceof LinebreakSnippet) return <br key={snippet.id} />

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
    text = <><br />-- page break --<br /></>
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