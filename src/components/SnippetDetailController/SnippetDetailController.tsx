import * as React from "react";
import { Color } from "../../classes/Color";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../../classes/Snippets/SelectorSnippet";
import { Snippet } from "../../classes/Snippets/Snippet";
import { TextSnippet } from "../../classes/Snippets/TextSnippet";
import { TextSnippetDetailController } from "./TextSnippetDetailController";
import { SelectorSnippetDetailController } from "./SelectorSnippetDetailController";
import { ScoreboardObjectiveSnippetDetailController } from "./ScoreboardObjectiveDetailController";
import { KeybindSnippet } from "../../classes/Snippets/KeybindSnippet";
import { KeybindSnippetDetailController } from "./KeybindSnippetDetailController";
import { copy } from "../../helpers/copy_snippet";
import { ClickEventType } from "../../classes/Snippets/ClickEvent";
import Tellraw from "../Tellraw";
import { SnippetCollection } from "../SnippetCollection";
import { HoverEventType } from "../../classes/Snippets/HoverEvent";

export interface SnippetDetailControllerProps {
  snippet: Snippet
  updateSnippet: (snippet: Snippet) => void
  stopEditing: (save: boolean) => void
}

export interface SnippetDetailControllerState {
  
}

export class SnippetDetailController extends React.Component<SnippetDetailControllerProps, SnippetDetailControllerState> {
  
  constructor(props: SnippetDetailControllerProps) {
    super(props)
    
    console.log(this.props)

    this.state = {}

    this.changeColor = this.changeColor.bind(this)
    
    this.changeClickEventType = this.changeClickEventType.bind(this)
    this.changeClickEventValue = this.changeClickEventValue.bind(this)
    
    this.changeHoverEventType = this.changeHoverEventType.bind(this)
    this.changeHoverEventValue = this.changeHoverEventValue.bind(this)
    this.changeHoverEventChildren = this.changeHoverEventChildren.bind(this)
    
    this.updateToggle = this.updateToggle.bind(this)
    this.updateField = this.updateField.bind(this)
    
    this.customAreaRender = this.customAreaRender.bind(this)
    this.hoverEventValueRender = this.hoverEventValueRender.bind(this)
  }

  changeColor(event: any) {
    this.updateField("color", event.target.value)
  }

  changeClickEventType(event: any) {
    this.updateField("click_event_type", event.target.value)
  }

  changeClickEventValue(event: any) {
    this.updateField("click_event_value", event.target.value)
  }

  changeHoverEventType(event: any) {
    this.updateField("hover_event_type", event.target.value)
  }

  changeHoverEventValue(event: any) {
    this.updateField("hover_event_value", event.target.value)
  }

  changeHoverEventChildren(snippets: Array<Snippet>) {
    let newSnippet = copy(this.props.snippet)
    newSnippet.hover_event_children = snippets
    this.props.updateSnippet(newSnippet)
  }

  updateToggle(field: string, event: any) {
    this.updateField(field, event.target.checked)
  }

  updateField(field: string, value: any) {
    let newSnippet = copy(this.props.snippet)
    newSnippet[field] = value
    this.props.updateSnippet(newSnippet)
  }

  customAreaRender() {
    if (this.props.snippet instanceof TextSnippet) {
      return <TextSnippetDetailController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} />
    } else if (this.props.snippet instanceof SelectorSnippet) {
      return <SelectorSnippetDetailController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} />
    } else if (this.props.snippet instanceof ScoreboardObjectiveSnippet) {
      return <ScoreboardObjectiveSnippetDetailController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} />
    } else if (this.props.snippet instanceof KeybindSnippet) {
      return <KeybindSnippetDetailController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} />
    } else {
      return <span>{typeof this.props.snippet} isn't implemented supported renderer</span>
    } 
  }

  hoverEventValueRender() {
    if (this.props.snippet.hover_event_type == HoverEventType.show_text) {
      return (
        <div className="col">
          <div className="row inline-snippet-collection-label">
            The area below is a seperate editor for the hover text. It allows for more advanced features than can be used in hover text. 
            For example, you may not use hover text in a hover text box. It will not do anything.
          </div>
          <div className="row">
            <div className="col inline-snippet-collection">
              <SnippetCollection snippets={this.props.snippet.hover_event_children} updateSnippets={this.changeHoverEventChildren} />
            </div>
          </div>
        </div>
      )
    } else if (this.props.snippet.hover_event_type != HoverEventType.none) {
      return (
        <div className="col">
          <input type="text" className="form-control" value={this.props.snippet.hover_event_value} onChange={this.changeHoverEventValue}/>
        </div>
      )
    }
  }

  render() {
    return (
      <>
        {/* <div className="row margin-below">
          <div className="col">
            <select className="form-control" onChange={this.changeSnippetType} value={this.props.snippet.type}>
              <option value={SnippetType.text}>Plain Text</option>
              <option value={SnippetType.selector}>Selector</option>
              <option value={SnippetType.scoreboardObjective}>Scoreboard Objective</option>
            </select>
          </div>
        </div> */}

        <div className="row margin-below">
          <div className="col">
            { this.customAreaRender() }
          </div>
          <div className="col-4">
            <div className="row margin-below">
              <div className="col">
                <select className="form-control" onChange={this.changeColor} value={this.props.snippet.color}>
                  {
                    Object.keys(Color).filter(key => !isNaN(Number(Color[key])))
                      .map(key => {
                        return <option key={Color[key]} value={Color[key]}>{key.split('_').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</option>
                      })
                  }
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="custom-control custom-checkbox">
                  <input checked={this.props.snippet.bold} onChange={event => this.updateToggle("bold", event)} type="checkbox" className="custom-control-input" id="bold_checkbox" />
                  <label className="custom-control-label" htmlFor="bold_checkbox">Bold</label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input checked={this.props.snippet.italic} onChange={event => this.updateToggle("italic", event)} type="checkbox" className="custom-control-input" id="italic_checkbox" />
                  <label className="custom-control-label" htmlFor="italic_checkbox">Italic</label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input checked={this.props.snippet.underlined} onChange={event => this.updateToggle("underlined", event)} type="checkbox" className="custom-control-input" id="underlined_checkbox" />
                  <label className="custom-control-label" htmlFor="underlined_checkbox">Underlined</label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input checked={this.props.snippet.strikethrough} onChange={event => this.updateToggle("strikethrough", event)} type="checkbox" className="custom-control-input" id="strikethrough_checkbox" />
                  <label className="custom-control-label" htmlFor="strikethrough_checkbox">Strikethrough</label>
                </div>
                
                <div className="custom-control custom-checkbox">
                  <input checked={this.props.snippet.obfuscated} onChange={event => this.updateToggle("obfuscated", event)} type="checkbox" className="custom-control-input" id="obfuscated_checkbox" />
                  <label className="custom-control-label" htmlFor="obfuscated_checkbox">Obfuscated</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row margin-below">
          <div className="col">
            <h4>Click Event:</h4>
          </div>
        </div>

        <div className="row margin-below">
          <div className="col-4">
            <select className="form-control" value={this.props.snippet.click_event_type} onChange={this.changeClickEventType}>
              <option key={ClickEventType.none} value={ClickEventType.none}>None</option>
              <option key={ClickEventType.open_url} value={ClickEventType.open_url}>Open URL</option>
              <option key={ClickEventType.run_command} value={ClickEventType.run_command}>Run Command</option>
              <option key={ClickEventType.suggest_command} value={ClickEventType.suggest_command}>Suggest Command</option>
              <option key={ClickEventType.change_page} value={ClickEventType.change_page}>Change Page (Books Only)</option>
						</select>
          </div>
          {
            this.props.snippet.click_event_type !== ClickEventType.none ? (
              <div className="col">
                <input type="text" className="form-control" value={this.props.snippet.click_event_value} onChange={this.changeClickEventValue}/>
              </div>  
            ) : null
          }
        </div>

        {/* Hover Events */}

        <div className="row margin-below">
          <div className="col">
            <h4>Hover Event:</h4>
          </div>
        </div>

        <div className="row margin-below">
          <div className="col-4">
            <select className="form-control" value={this.props.snippet.hover_event_type} onChange={this.changeHoverEventType}>
            <option key={HoverEventType.none} value={HoverEventType.none}>None</option>
            <option key={HoverEventType.show_entity} value={HoverEventType.show_entity}>Show Entity</option>
            <option key={HoverEventType.show_item} value={HoverEventType.show_item}>Show Item</option>
            <option key={HoverEventType.show_text} value={HoverEventType.show_text}>Show Text</option>
						</select>
          </div>
          { this.hoverEventValueRender() }
        </div>

        {/* Exit Controls */}
        
        <div className="row">
          <div className="offset-8 col-2">
            <button className="btn btn-secondary btn-block" onClick={() => { this.props.stopEditing(false) }}>Cancel</button>
          </div>
          <div className="col-2">
            <button className="btn btn-primary btn-block" onClick={() => { this.props.stopEditing(true) }}>Save</button>
          </div>
        </div>
      </>
    )
  }
}