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
import { GenericSnippetController } from "./GenericSnippetController";
import { NBTSnippetController } from "./NBTSnippetController";
import { Version } from "../../helpers/versions";
import { CommandType } from "../../data/templates";
import { TranslateSnippet } from "../../classes/Snippets/SnippetTypes/TranslateSnippet";

export interface InlineSnippetControllerProps {
  snippet: Snippet
  updateSnippet: (Snippet) => void
  startEditingSnippet: (Snippet) => void
  removeSnippet: (Snippet) => void
  duplicateSnippet: (Snippet) => void
  version: Version
  commandtype: CommandType
  provided: DraggableProvided
}

const InlineSnippetController: React.FunctionComponent<InlineSnippetControllerProps> = (props) => {
  
  function editButtonClick(action: string) {
    if (action == "start-editing") {
      props.startEditingSnippet(props.snippet)
    } else if (action == "delete") {
      props.removeSnippet(props.snippet)
    } else if (action == "duplicate") {
      props.duplicateSnippet(props.snippet)
    } else {
      alert(`Failed to catch ${action}`)
    }
  }
  
  function customController() {
    if (props.snippet instanceof LinebreakSnippet) {
      return <span>Line Break ⏎</span>
    } else if (props.snippet instanceof PagebreakSnippet) {
      return <span>Page Break <FontAwesomeIcon icon="file-alt" /></span>
    } else if (props.snippet instanceof NBTSnippet) {
      return <NBTSnippetController snippet={props.snippet} updateSnippet={props.updateSnippet} commandType={props.commandtype} version={props.version}/>
    } else if (props.snippet instanceof TranslateSnippet) {
      return <span>Translation Snippet ({ props.snippet.translate }) - Click Edit to modify</span>
    } else if (
         props.snippet instanceof ScoreboardObjectiveSnippet
      || props.snippet instanceof KeybindSnippet
      || props.snippet instanceof SelectorSnippet
      || props.snippet instanceof TextSnippet
    ) {
      return <GenericSnippetController snippet={props.snippet} updateSnippet={props.updateSnippet} />
    } else {
      return <span>{typeof props.snippet} isn't implemented</span>
    }
  }

  const editingEnabled = !(props.snippet instanceof LinebreakSnippet
    || props.snippet instanceof PagebreakSnippet)
  
  const { provided } = props;

  return (
    <div className="row mb-2" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
      <div className="col-4 col-md-3 col-lg-2 d-flex flex-column justify-content-center">
        <Button
          type="secondary" block
          icon="edit"
          disabled={!editingEnabled}
          onClick={() => {
            editButtonClick("start-editing")
          }}
          dropdowns={[
            {
              label: "Delete",
              icon: "trash-alt",
              onClick: () => {
                editButtonClick("delete")
              }
            },
            {
              label: "Duplicate",
              icon: "clone",
              onClick: () => {
                editButtonClick("duplicate")
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
        { customController() }
      </div>
      
      <div className="col-1">
        <MinecraftColorWell color={props.snippet.color} />
      </div>
    </div>
  )
}

export default InlineSnippetController