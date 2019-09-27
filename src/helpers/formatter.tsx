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
import { NBTSnippet } from "../classes/Snippets/SnippetTypes/NBTSnippet";

function nthOccurence<T>(array: Array<T>, pattern: (T) => boolean, n: number) {
  let searchFrom = 0

  while (true) {
    const nextIndex = array.findIndex((v: T, index: number) => {
      return (index >= searchFrom && pattern(v))
    })

    console.log(`Search From: ${searchFrom}, Next Index: ${nextIndex}, n: ${n}`)

    if (n <= 0 || nextIndex < 0) {
      return (n <= 0) ? searchFrom : -1
    } else {
      n -= 1
      searchFrom = nextIndex + 1
    }
  }
}

export function formatSnippets(snippets: Array<Snippet>, bookPage?: number): Array<JSX.Element> {
  console.log("Formatting with page", snippets, bookPage)

  let pageStartIndex = 0
  if (bookPage && bookPage > 1) {
    pageStartIndex = nthOccurence(snippets, (snippet) => {
      return snippet instanceof PagebreakSnippet
    }, bookPage - 1)

    if (pageStartIndex < 0) {
      pageStartIndex = 0
      console.error("Cannot find page", bookPage)
    }
  }
  console.log("Determined start index", pageStartIndex)

  let pageEndIndex = snippets.length
  if (bookPage) {
    pageEndIndex = nthOccurence(snippets, (snippet) => {
      return snippet instanceof PagebreakSnippet
    }, bookPage) - 1

    if (pageEndIndex < 0) {
      pageEndIndex = snippets.length
    }
  }
  console.log("Determined end index", pageEndIndex)
  
  return snippets.slice(pageStartIndex, pageEndIndex).map(formatSnippet)
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
  } else if (snippet instanceof NBTSnippet) {
    text = wrapText(`${snippet.nbt}@${snippet.storage}`)
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