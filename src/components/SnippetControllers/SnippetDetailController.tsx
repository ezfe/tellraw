import * as React from "react";
import { getCSSHEX, minecraftColorSet } from "../../classes/Color";
import { ClickEventType } from "../../classes/Snippets/ClickEvent";
import { HoverEventType } from "../../classes/Snippets/HoverEvent";
import { KeybindSnippet } from "../../classes/Snippets/SnippetTypes/KeybindSnippet";
import { NBTSnippet } from "../../classes/Snippets/SnippetTypes/NBTSnippet";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../../classes/Snippets/SnippetTypes/SelectorSnippet";
import { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";
import { CommandType, FeatureType, isFeatureAvailable } from "../../data/templates";
import { duplicate_snippet } from "../../helpers/copy_snippet";
import { formatSnippet } from "../../helpers/formatter";
import { Version } from "../../helpers/versions";
import { Checkbox } from "../Forms/Checkbox";
import { MinecraftColorButton } from "../MinecraftColorWell";
import SnippetCollection from "../SnippetCollection";
import { GenericSnippetController } from "./GenericSnippetController";
import { NBTSnippetController } from "./NBTSnippetController";

export interface SnippetDetailControllerProps {
  commandType: CommandType
  snippet: Snippet
  updateSnippet: (snippet: Snippet) => void
  stopEditing: (save: boolean) => void
  version: Version
}

export const SnippetDetailController: React.FunctionComponent<SnippetDetailControllerProps> = (props) => {  
  function changeClickEventType(event: any) {
    updateField("click_event_type", event.target.value)
  }

  function changeClickEventValue(event: any) {
    updateField("click_event_value", event.target.value)
  }

  function changeHoverEventType(event: any) {
    updateField("hover_event_type", event.target.value)
  }

  function changeHoverEventValue(event: any) {
    updateField("hover_event_value", event.target.value)
  }

  function changeHoverEventChildren(snippets: Array<Snippet>) {
    let newSnippet = duplicate_snippet(props.snippet)
    newSnippet.hover_event_children = snippets
    props.updateSnippet(newSnippet)
  }

  function changeInsertion(event: any) {
    updateField("insertion", event.target.value)
  }

  function changeFont(event: any) {
    updateField("font", event.target.value)
  }

  function updateToggle(field: string, event: any) {
    updateField(field, event.target.checked)
  }

  function updateField(field: string, value: any) {
    let newSnippet = duplicate_snippet(props.snippet)
    newSnippet[field] = value
    props.updateSnippet(newSnippet)
  }

  function updateFontCheckbox(newValue: boolean) {
    let newSnippet = duplicate_snippet(props.snippet)
    if (newValue) {
      newSnippet.font = "minecraft:default"
    } else {
      newSnippet.font = null
    }
    props.updateSnippet(newSnippet)
  }

  function customAreaRender() {
    if (props.snippet instanceof NBTSnippet) {
      return <NBTSnippetController snippet={props.snippet} updateSnippet={props.updateSnippet} commandType={props.commandType} version={props.version} />
    } else if (
         props.snippet instanceof ScoreboardObjectiveSnippet
      || props.snippet instanceof SelectorSnippet
      || props.snippet instanceof TextSnippet
      || props.snippet instanceof KeybindSnippet
    ) {
      return <GenericSnippetController snippet={props.snippet} updateSnippet={props.updateSnippet} />
    } else {
      return <span>{typeof props.snippet} isn't implemented supported renderer</span>
    } 
  }

  function clickEventRenderer() {
    if (!isFeatureAvailable(props.commandType, props.version, FeatureType.clicking)) {
      return null
    }

    const clickEventTypeIsCommand = props.snippet.click_event_type == ClickEventType.run_command || props.snippet.click_event_type == ClickEventType.suggest_command

    return (
      <>
        <div className="row">
          <div className="col">
            <h4>Click Event:</h4>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-4">
            <select className="custom-select" value={props.snippet.click_event_type} onChange={changeClickEventType}>
              <option key={ClickEventType.none} value={ClickEventType.none}>None</option>
              <option key={ClickEventType.open_url} value={ClickEventType.open_url}>Open URL</option>
              <option key={ClickEventType.run_command} value={ClickEventType.run_command}>Run Command</option>
              <option key={ClickEventType.suggest_command} value={ClickEventType.suggest_command}>Suggest Command</option>
              <option key={ClickEventType.change_page} value={ClickEventType.change_page}>Change Page (Books Only)</option>
              <option key={ClickEventType.copy_to_clipboard} value={ClickEventType.copy_to_clipboard}>Copy to Clipboard</option>
						</select>
          </div>
          {
            props.snippet.click_event_type !== ClickEventType.none ? (
              <div className="col">
                <input
                  list={clickEventTypeIsCommand ? "datalist-commands" : null}
                  type="text"
                  className="form-control"
                  value={props.snippet.click_event_value}
                  onChange={changeClickEventValue}
                />
              </div>  
            ) : null
          }
        </div>
        <hr />
      </>
    )
  }

  function hoverEventRenderer() {
    if (!isFeatureAvailable(props.commandType, props.version, FeatureType.hovering)) {
      return null
    }

    return (
      <>
        <div className="row">
          <div className="col">
            <h4>Hover Event:</h4>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-4">
            <select className="custom-select" value={props.snippet.hover_event_type} onChange={changeHoverEventType}>
            <option key={HoverEventType.none} value={HoverEventType.none}>None</option>
            <option key={HoverEventType.show_entity} value={HoverEventType.show_entity}>Show Entity</option>
            <option key={HoverEventType.show_item} value={HoverEventType.show_item}>Show Item</option>
            <option key={HoverEventType.show_text} value={HoverEventType.show_text}>Show Text</option>
						</select>
          </div>
          { hoverEventValueRender() }
        </div>
        <hr />
      </>
    )
  }

  function hoverEventValueRender() {
    if (props.snippet.hover_event_type == HoverEventType.show_text) {
      return (
        <div className="col">
          <div className="row">
            <div className="col inline-snippet-collection">
              <SnippetCollection commandType={CommandType.hovertext}
                                 snippets={props.snippet.hover_event_children}
                                 updateSnippets={changeHoverEventChildren}
                                 deleteAll={() => {
                                   changeHoverEventChildren([])
                                 }}
                                 version={props.version}
                                 />
            </div>
          </div>
        </div>
      )
    } else if (props.snippet.hover_event_type != HoverEventType.none) {
      return (
        <div className="col">
          <input type="text" className="form-control" value={props.snippet.hover_event_value} onChange={changeHoverEventValue}/>
        </div>
      )
    }
  }

  function insertionRenderer() {
    if (!isFeatureAvailable(props.commandType, props.version, FeatureType.insertion)) {
      return null
    }

    return (
      <>
        <div className="row mb-2">
          <div className="col-4">
            <h4>Insertion:</h4>
          </div>
          <div className="col">
            <input className="form-control"
                   value={props.snippet.insertion}
                   onChange={changeInsertion} />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="row mb-2">
        <div className="col">
          { customAreaRender() }
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h4>
            Formatting Options:
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="row mb-1">
            <div className="col">
              <span style={{ fontWeight: "bold" }}>
                Preset Colors:
              </span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col d-flex flex-wrap">
              {
                Object.keys(minecraftColorSet)
                  .filter((color) => { return color != "none" })
                  .map((color) => {
                    return (
                      <MinecraftColorButton
                        key={color}
                        color={color}
                        checked={props.snippet.color == color}
                        onClick={(newColor) => {
                          updateField("color", newColor)
                        }}
                      />
                    )
                  })
              }
            </div>
          </div>
          {
            isFeatureAvailable(props.commandType, props.version, FeatureType.customColor) ? (
              <div className="row mb-1">
                <div className="col">
                  <span style={{ fontWeight: "bold" }}>
                    Custom Color:
                  </span>
                  <input
                    type="color"
                    value={getCSSHEX(props.snippet.color)}
                    onChange={(evt) => {
                      updateField("color", evt.target.value.toUpperCase())
                    }}
                  />
                </div>
              </div>
            ) : null
          }
          <div className="row mb-2">
            <div className="col">
              {
                props.snippet.color != "none" ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      updateField("color", "none")
                    }}
                  >
                    Unset Color
                  </button>
                ) : (
                  <p className="mb-0">
                    No color is selected, so it will appear
                    the default color in-game, usually black.
                  </p>
                )
              }
            </div>
          </div>
        </div>
        <div className="col-4">
          <Checkbox label="Bold" checked={props.snippet.bold} onChange={newValue => updateField("bold", newValue)} />
          <Checkbox label="Italic" checked={props.snippet.italic} onChange={newValue => updateField("italic", newValue)} />
          <Checkbox label="Underlined" checked={props.snippet.underlined} onChange={newValue => updateField("underlined", newValue)} />
          <Checkbox label="Strikethrough" checked={props.snippet.strikethrough} onChange={newValue => updateField("strikethrough", newValue)} />
          <Checkbox label="Obfuscated" checked={props.snippet.obfuscated} onChange={newValue => updateField("obfuscated", newValue)} />
        </div>
        {
          isFeatureAvailable(props.commandType, props.version, FeatureType.font) ? (
            <div className="col-4">
              <div className="row">
                <div className="col">
                  <Checkbox label="Custom Font" checked={props.snippet.font !== null} onChange={newValue => updateFontCheckbox(newValue)} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {
                    (props.snippet.font !== null) ? (
                      <input type="text" className="form-control" value={props.snippet.font} onChange={changeFont}/>
                    ) : null
                  }
                </div>
              </div>
            </div>
          ) : null
        }
      </div>
      <hr />

      { clickEventRenderer() }

      { hoverEventRenderer() }
      
      { insertionRenderer() }

      <br />


      <hr />
      
      {/* Preview */}

      <div className="row mb-2">
        <div className="col">
          <h4>Preview:</h4>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col">
          <p>
            { formatSnippet(props.snippet) }
          </p>
        </div>
      </div>

      {/* Exit Controls */}

      <div className="row">
        <div className="offset-8 col-2">
          <button className="btn btn-secondary btn-block" onClick={() => { props.stopEditing(false) }}>Cancel</button>
        </div>
        <div className="col-2">
          <button className="btn btn-primary btn-block" onClick={() => { props.stopEditing(true) }}>Save</button>
        </div>
      </div>
    </>
  )
}