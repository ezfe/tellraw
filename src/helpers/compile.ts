import { Color } from "../classes/Color";
import { ClickEventType } from "../classes/Snippets/ClickEvent";
import { HoverEventType } from "../classes/Snippets/HoverEvent";
import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
import { PagebreakSnippet } from "../classes/Snippets/SnippetTypes/PagebreakSnippet";
import {
  CommandType,
  isFeatureAvailable,
  FeatureType,
} from "../data/templates";
import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
import {
  NBTSnippet,
  NBTType,
} from "../classes/Snippets/SnippetTypes/NBTSnippet";
import { Version, versionAtLeast } from "./versions";
import { TranslateSnippet } from "../classes/Snippets/SnippetTypes/TranslateSnippet";

export function object_compile(
  sections: Snippet[][],
  type: CommandType,
  version: Version
): any {
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
      } else if (snippet instanceof SelectorSnippet) {
        pending["selector"] = snippet.selector;
      } else if (snippet instanceof ScoreboardObjectiveSnippet) {
        pending["score"] = {
          name: snippet.score_name,
          objective: snippet.score_objective,
        };

        if (snippet.score_value !== null) {
          pending["score"]["value"] = snippet.score_value;
        }
      } else if (snippet instanceof NBTSnippet) {
        if (!isFeatureAvailable(type, version, FeatureType.nbtComponent)) {
          continue;
        }

        if (
          snippet.type == NBTType.storage &&
          !isFeatureAvailable(type, version, FeatureType.nbtStorageComponent)
        ) {
          continue;
        }

        pending["nbt"] = snippet.nbt;
        // this works because of how enums
        // work in TypeScript
        pending[NBTType[snippet.type]] = snippet.storage;
        if (snippet.interpret) {
          pending["interpret"] = snippet.interpret;
        }
      } else if (snippet instanceof KeybindSnippet) {
        pending["keybind"] = snippet.keybind;
      } else if (snippet instanceof TranslateSnippet) {
        pending["translate"] = snippet.translate
        if (snippet.parameters.length > 0) {
          pending["with"] = snippet.parameters
        }
      }

      /* Style Transfer */
      if (snippet.bold) pending["bold"] = true;
      if (snippet.italic) pending["italic"] = true;
      if (snippet.underlined) pending["underlined"] = true;
      if (snippet.strikethrough) pending["strikethrough"] = true;
      if (snippet.obfuscated) pending["obfuscated"] = true;
      if (snippet.color != "none") pending["color"] = snippet.color;

      if (snippet.font) {
        if (isFeatureAvailable(type, version, FeatureType.font)) {
          pending["font"] = snippet.font;
        } else {
          console.warn(
            `Skipping font attribute, since ${version} doesn't qualify.`
          );
        }
      }

      if (snippet.insertion.length > 0) {
        pending["insertion"] = snippet.insertion;
      }

      // If the clicking feature is available and
      // it is not a sign with more than one snippet
      // in this section, process the click event
      if (snippet.click_event_type != ClickEventType.none) {
        if (
          isFeatureAvailable(type, version, FeatureType.clicking) &&
          !(type == CommandType.sign && section_snippets.length > 1)
        ) {
          pending["clickEvent"] = {
            action: ClickEventType[snippet.click_event_type],
            value: snippet.click_event_value,
          };
        }
      }

      if (isFeatureAvailable(type, version, FeatureType.hovering)) {
        if (snippet.hover_event_type == HoverEventType.show_text) {
          const recursive_result = object_compile(
            [snippet.hover_event_children],
            CommandType.hovertext,
            version
          );
          if (versionAtLeast(version, "1.16")) {
            pending["hoverEvent"] = {
              action: HoverEventType[snippet.hover_event_type],
              contents: recursive_result,
            };
          } else {
            pending["hoverEvent"] = {
              action: HoverEventType[snippet.hover_event_type],
              value: recursive_result,
            };
          }
        } else if (snippet.hover_event_type != HoverEventType.none) {
          if (versionAtLeast(version, "1.16")) {
            pending["hoverEvent"] = {
              action: HoverEventType[snippet.hover_event_type],
              contents: snippet.hover_event_value,
            };
          } else {
            pending["hoverEvent"] = {
              action: HoverEventType[snippet.hover_event_type],
              value: snippet.hover_event_value,
            };
          }
        }
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

  if (type == CommandType.book) {
    return JSON.stringify(
      results.map((e) => {
        return JSON.stringify(e);
      })
    );
  } else if (type == CommandType.sign) {
    let ret = "";
    if (results.length >= 1) {
      const l1 = JSON.stringify(results[0]);
      ret = ret.concat(`Text1:${JSON.stringify(l1)}`);

      if (results.length >= 2) {
        const l2 = JSON.stringify(results[1]);
        ret = ret.concat(`,Text2:${JSON.stringify(l2)}`);

        if (results.length >= 3) {
          const l3 = JSON.stringify(results[2]);
          ret = ret.concat(`,Text3:${JSON.stringify(l3)}`);

          if (results.length >= 4) {
            const l4 = JSON.stringify(results[3]);
            ret = ret.concat(`,Text4:${JSON.stringify(l4)}`);
          }
        }
      }
    }

    return ret;
  } else if (type == CommandType.hovertext) {
    return results[0];
  } else if (results.length > 0) {
    return JSON.stringify(results[0]);
  } else {
    console.error("No elements?");
    return "";
  }
}

export function compile(
  snippets: Array<Snippet>,
  command: string,
  type: CommandType,
  version: Version
): string {
  const section_list = Array<Array<Snippet>>();
  let unprocessed = [...snippets];

  if (
    isFeatureAvailable(type, version, FeatureType.pages) ||
    type == CommandType.sign
  ) {
    while (unprocessed.length > 0) {
      const applyLinebreaks = type == CommandType.sign;

      const index = unprocessed.findIndex((s) => {
        return (
          s instanceof PagebreakSnippet ||
          (applyLinebreaks && s instanceof LinebreakSnippet)
        );
      });

      if (index == -1) {
        section_list.push(unprocessed.splice(0, unprocessed.length));
      } else {
        section_list.push(unprocessed.splice(0, index));
      }
      unprocessed.splice(0, 1);
    }
  } else {
    section_list.push(
      unprocessed.filter((e) => {
        return !(e instanceof PagebreakSnippet);
      })
    );
  }

  const results = object_compile(section_list, type, version);

  if (!command) {
    console.error("Command isn't available", command);
    return "";
  }

  if (command.indexOf("%s") === -1) {
    // error
    console.error("No %s to replace");
    return results;
  } else {
    return command.replace("%s", results);
  }
}
