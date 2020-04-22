import { Color } from "../classes/Color";
import { ClickEventType } from "../classes/Snippets/ClickEvent";
import { HoverEventType } from "../classes/Snippets/HoverEvent";
import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
import { PagebreakSnippet } from "../classes/Snippets/SnippetTypes/PagebreakSnippet";
import { CommandType, isFeatureAvailable, FeatureType } from "../data/templates";
import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
import { NBTSnippet, NBTType } from "../classes/Snippets/SnippetTypes/NBTSnippet";

export function object_compile(sections: Array<Array<Snippet>>, type: CommandType): any {
  let results = Array<Array<Object>>()
  for (const section_snippets of sections) {
    let section_results = Array<Object>()
    section_results.push("")
    for (const snippet of section_snippets) {
      let pending = {}

      if (snippet instanceof TextSnippet) {
        pending["text"] = snippet.text
      } else if (snippet instanceof SelectorSnippet) {
        pending["selector"] = snippet.selector
      } else if (snippet instanceof ScoreboardObjectiveSnippet) {
        pending["score"] = {
          "name": snippet.score_name,
          "objective": snippet.score_objective
        }

        if (snippet.score_value !== null) {
          pending["score"]["value"] = snippet.score_value
        }
      } else if (snippet instanceof NBTSnippet) {
        pending["nbt"] = snippet.nbt
        // this works because of how enums
        // work in TypeScript
        pending[NBTType[snippet.type]] = snippet.storage
      } else if (snippet instanceof KeybindSnippet) {
        pending["keybind"] = snippet.keybind
      }

      /* Style Transfer */
      if (snippet.bold) pending["bold"] = true
      if (snippet.italic) pending["italic"] = true
      if (snippet.underlined) pending["underlined"] = true
      if (snippet.strikethrough) pending["strikethrough"] = true
      if (snippet.obfuscated) pending["obfuscated"] = true
      if (snippet.color != Color.none) pending["color"] = Color[snippet.color]
      if (snippet.font) pending["font"] = snippet.font

      if (snippet.insertion.length > 0) {
        pending["insertion"] = snippet.insertion
      }

      if (snippet.click_event_type != ClickEventType.none) {
        pending["clickEvent"] = {
          "action": ClickEventType[snippet.click_event_type],
          "value": snippet.click_event_value
        }
      }

      if (snippet.hover_event_type == HoverEventType.show_text) {
        const recursive_result = object_compile([snippet.hover_event_children], CommandType.hovertext)
        pending["hoverEvent"] = {
          "action": HoverEventType[snippet.hover_event_type],
          "value": recursive_result
        }
      } else if (snippet.hover_event_type != HoverEventType.none) {
        pending["hoverEvent"] = {
          "action": HoverEventType[snippet.hover_event_type],
          "value": snippet.hover_event_value
        }
      }

      section_results.push(pending)
    }
    results.push(section_results)
  }

  if (type == CommandType.book) {
    return JSON.stringify(results.map(e => { return JSON.stringify(e) }))
  } else if (type == CommandType.sign) {
    let ret = ""
    if (results.length >= 1) {
      const l1 = JSON.stringify(results[0])
      ret = ret.concat(`Text1:${JSON.stringify(l1)}`)

      if (results.length >= 2) {
        const l2 = JSON.stringify(results[1])
        ret = ret.concat(`,Text2:${JSON.stringify(l2)}`)

        if (results.length >= 3) {
          const l3 = JSON.stringify(results[2])
          ret = ret.concat(`,Text3:${JSON.stringify(l3)}`)

          if (results.length >= 4) {
            const l4 = JSON.stringify(results[3])
            ret = ret.concat(`,Text4:${JSON.stringify(l4)}`)
          }
        }
      }
    }

    return ret
  } else if (type == CommandType.hovertext) {
    return results[0]
  } else if (results.length > 0) {
    return JSON.stringify(results[0])
  } else {
    console.error("No elements?")
    return ""
  }
}

export function compile(snippets: Array<Snippet>, command: string, type: CommandType): string {
  const section_list = Array<Array<Snippet>>()
  let unprocessed = [...snippets]

  if (isFeatureAvailable(type, FeatureType.pages) || type == CommandType.sign) {
    while (unprocessed.length > 0) {
      const applyLinebreaks = (type == CommandType.sign)

      const index = unprocessed.findIndex((s) => {
        return (s instanceof PagebreakSnippet) || (applyLinebreaks && s instanceof LinebreakSnippet)
      })

      if (index == -1) {
        section_list.push(unprocessed.splice(0, unprocessed.length))
      } else {
        section_list.push(unprocessed.splice(0, index))
      }
      unprocessed.splice(0, 1)
    }
  } else {
    section_list.push(unprocessed.filter(e => { return !(e instanceof PagebreakSnippet) }))
  }

  const results = object_compile(section_list, type)

  if (!command) {
    console.error("Command isn't available", command)
    return ""
  }

  if (command.indexOf("%s") === -1) {
    // error
    console.error("No %s to replace")
    return results
  } else {
    return command.replace("%s", results);
  }
}