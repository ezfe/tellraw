import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { KeybindSnippet } from "../../classes/Snippets/SnippetTypes/KeybindSnippet";
import { LinebreakSnippet } from "../../classes/Snippets/SnippetTypes/LinebreakSnippet";
import { NBTSnippet } from "../../classes/Snippets/SnippetTypes/NBTSnippet";
import { PagebreakSnippet } from "../../classes/Snippets/SnippetTypes/PagebreakSnippet";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../../classes/Snippets/SnippetTypes/SelectorSnippet";
import { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";
import Button from "../generic/Button";
import { MinecraftColorWell } from "../MinecraftColorWell";
import { InlineGenericSnippetController } from "./InlineGenericSnippetController";
import InlineNBTSnippetController from "./InlineNBTSnippetController";

export interface InlineSnippetControllerProps {
  snippet: Snippet
  updateSnippet: (Snippet) => void
  startEditingSnippet: (Snippet) => void
  removeSnippet: (Snippet) => void
  duplicateSnippet: (Snippet) => void

  provided: DraggableProvided
}

export class InlineSnippetController extends React.Component<InlineSnippetControllerProps, {}> {
  
  constructor(props: InlineSnippetControllerProps) {
    super(props)
    
    this.editButtonClick = this.editButtonClick.bind(this)
    this.customController = this.customController.bind(this)
  }
  
  editButtonClick(action: string) {
    if (action == "start-editing") {
      this.props.startEditingSnippet(this.props.snippet)
    } else if (action == "delete") {
      this.props.removeSnippet(this.props.snippet)
    } else if (action == "duplicate") {
      this.props.duplicateSnippet(this.props.snippet)
    } else {
      alert(`Failed to catch ${action}`)
    }
  }
  
  customController() {
    if (this.props.snippet instanceof LinebreakSnippet) {
      return <span>Line Break ⏎</span>
    } else if (this.props.snippet instanceof PagebreakSnippet) {
      return <span>Page Break <FontAwesomeIcon icon="file-alt" /></span>
    } else if (this.props.snippet instanceof NBTSnippet) {
      return <InlineNBTSnippetController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} />
    } else if (
         this.props.snippet instanceof ScoreboardObjectiveSnippet
      || this.props.snippet instanceof KeybindSnippet
      || this.props.snippet instanceof SelectorSnippet
      || this.props.snippet instanceof TextSnippet
    ) {
      return <InlineGenericSnippetController snippet={this.props.snippet} updateSnippet={this.props.updateSnippet} />
    } else {
      return <span>{typeof this.props.snippet} isn't implemented</span>
    }
  }
  
  render() {
    const editingEnabled = !(this.props.snippet instanceof LinebreakSnippet
      || this.props.snippet instanceof PagebreakSnippet)
    
    const { provided } = this.props;

    return (
      <div className="row mb-2" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
        <div className="col-4 col-md-3 col-lg-2 d-flex flex-column justify-content-center">
          <Button
            type="secondary" block
            icon="edit"
            disabled={!editingEnabled}
            onClick={() => {
              this.editButtonClick("start-editing")
            }}
            dropdowns={[
              {
                label: "Delete",
                icon: "trash-alt",
                onClick: () => {
                  this.editButtonClick("delete")
                }
              },
              {
                label: "Duplicate",
                icon: "clone",
                onClick: () => {
                  this.editButtonClick("duplicate")
                }
              }
            ]}              
          >
            Edit
          </Button>
        </div>
        
        {/*
        Flex justification is for text fields
        which are used for page and linebreaks
        */}
        <div className="col"
             style={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "center"
             }}>
          { this.customController() }
        </div>
        
        <div className="col-1">
          <MinecraftColorWell color={this.props.snippet.color} />
        </div>
      </div>
    )
  }
}