import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
import { PagebreakSnippet } from "../classes/Snippets/SnippetTypes/PagebreakSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
import { LSKEY_COMMAND_STRING, LSKEY_SNIPPET_ARR, VERSION, LSKEY_COMMAND_TYPE } from "../constants";

export function legacyStatePreparation() {
  
  const lsformat = parseInt(localStorage.getItem("jformat") || VERSION.toString())
  console.log(`Processing legacy state ${lsformat}`)

  if (lsformat <= 3) {
    console.warn("Resetting local state instead of upgrading")
    localStorage.clear()
    return
  } else if (lsformat == 4) {
    console.log(`Upgrading local state from ${lsformat} to ${VERSION}`)

    const source_array = JSON.parse(localStorage.getItem("jobject") || "[]") as Array<object>
    
    const loaded = source_array.flatMap((sf): Array<Snippet> => {
      if (sf["NEW_ITERATE_FLAG"]) {
        return [new PagebreakSnippet(null)]
      } else if ("text" in sf) {
        let el = {...sf}
        let arr = Array<Snippet>()

        while (true) {
          const text_preexisting = el["text"] as string
          const index = text_preexisting.indexOf("\\n")

          if (index > -1) {
            const first_section = text_preexisting.substring(0, index)
            const new_object = {...sf, text: first_section}
            
            arr.push(TextSnippet.load_legacy(new_object))
            arr.push(new LinebreakSnippet())
            
            el = {...sf, text: text_preexisting.substring(index + 2)}
          } else {
            arr.push(TextSnippet.load_legacy(el))
            break
          }
        }

        return arr
      } else if ("selector" in sf) {
        return [SelectorSnippet.load_legacy(sf)]
      } else if ("score" in sf) {
        return [ScoreboardObjectiveSnippet.load_legacy(sf)]
      }
    })

    const commandString = localStorage.getItem("jcommand")
    const template = localStorage.getItem("jtemplate")
    
    console.log("Clearing local storage in preparation for new object")
    localStorage.clear()

    console.log("Storing new object")
    localStorage.setItem(LSKEY_SNIPPET_ARR, JSON.stringify(loaded))
    localStorage.setItem("jformat", VERSION.toString())
    localStorage.setItem(LSKEY_COMMAND_STRING, commandString)
    if (["tellraw", "execute_tellraw"].indexOf(template) != -1) {
      localStorage.setItem(LSKEY_COMMAND_TYPE, "\"tellraw\"")
    } else if (["title", "subtitle", "actionbar"].indexOf(template) != -1) {
      localStorage.setItem(LSKEY_COMMAND_TYPE, "\"overlay\"")
    } else if (["sign_item", "sign_block", "sign_block13"].indexOf(template) != -1) {
      localStorage.setItem(LSKEY_COMMAND_TYPE, "\"sign\"")
    } else if (["book12", "book13", "book"].indexOf(template) != -1) {
      localStorage.setItem(LSKEY_COMMAND_TYPE, "\"book\"")
    }
    
    return
  } else {
    localStorage.setItem("jformat", VERSION.toString())
  }
}

export function loadV5State(source_array: Array<object>): Array<Snippet> {
  return source_array.map((s): Snippet => {
    if (s.hasOwnProperty("text")) {
      if (s["text"] === "\n") {
        return (Object as any).assign(new LinebreakSnippet(), s)
      } else {
        return (Object as any).assign(new TextSnippet(), s)
      }
    } else if (s.hasOwnProperty("keybind")) {
      return (Object as any).assign(new KeybindSnippet(), s)
    } else if (s.hasOwnProperty("score") || s.hasOwnProperty("score_name")) {
      return (Object as any).assign(new ScoreboardObjectiveSnippet(), s)
    } else if (s.hasOwnProperty("selector")) {
      return (Object as any).assign(new SelectorSnippet(), s)
    } else if (s.hasOwnProperty("isPagebreak")) {
      return (Object as any).assign(new PagebreakSnippet, s)
    } else {
      let x = new TextSnippet()
      x.text = `Failed to claim ${JSON.stringify(s)}`
      return x
    }
  })
}