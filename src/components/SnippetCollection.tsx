import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Color } from "../classes/Color";
import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
import { NBTSnippet } from "../classes/Snippets/SnippetTypes/NBTSnippet";
import { PagebreakSnippet } from "../classes/Snippets/SnippetTypes/PagebreakSnippet";
import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
import { TranslateSnippet } from "../classes/Snippets/SnippetTypes/TranslateSnippet";
import { CommandType, FeatureType, isFeatureAvailable } from "../data/templates";
import { duplicate_snippet } from "../helpers/copy_snippet";
import { useKeyPress } from "../helpers/useKeyPress";
import { useLocalStorage } from "../helpers/useLocalStorage";
import { Version } from "../helpers/versions";
import Button from "./generic/Button";
import InlineSnippetController from "./SnippetControllers/InlineSnippetController";
import { SnippetDetailController } from "./SnippetControllers/SnippetDetailController";

interface SnippetCollectionProps {
  commandType: CommandType
  snippets: Array<Snippet>
  updateSnippets: (snippets: Array<Snippet>) => void
  deleteAll: () => void
  version: Version
  customColors: Color[],
  setColorManaging: (newValue: Boolean) => void
}

const SnippetCollection: React.FunctionComponent<SnippetCollectionProps> = (props) => {

  const [editing, setEditing] = React.useState(null)
  const optionPressed = useKeyPress("Alt")
  const [showFastEditTip, setShowFastEditTip] = useLocalStorage("20190913-fast-edit-tip", true)
  const dismissFastEditTip = () => { setShowFastEditTip(false) }

  /**
   * Add a new snippet
   * 
   * @param snippet The snippet to add
   */
  function addSnippet(snippet: Snippet) {
    if (optionPressed) {
      props.updateSnippets([...props.snippets, snippet])
    } else {
      startEditing(snippet)
    }
  }

  /**
   * Start editing a snippet.
   * 
   * @param snippet The snippet to start editing
   */
  function startEditing(snippet: Snippet) {
    setEditing(snippet)
  }

  /**
   * Update the snippet being edited without propagating it to the
   * main snippet list.
   * 
   * @param snippet The new snippet state
   */
  function updateEditing(snippet: Snippet) {
    setEditing(snippet)
  }

  /**
   * Stop editing a snippet.
   * 
   * @param save Whether to save the new snippet state back to the main snippet list.
   */
  function stopEditing(save: boolean) {
    if (save && editing !== null) {
      updateSnippet(editing)
    }

    setEditing(null)
  }

  function updateSnippet(newSnippet: Snippet) {
    console.log("Updating", newSnippet)
    let isNewSnippet = true
    let updatedSnippets = props.snippets.map(currentSnippet => {
      if (currentSnippet.id === newSnippet.id) {
        isNewSnippet = false
        return newSnippet
      } else {
        return currentSnippet
      }
    })

    if (isNewSnippet) {
      updatedSnippets = [...props.snippets, newSnippet]
    }

    props.updateSnippets(updatedSnippets)
  }

  function removeSnippet(snippet: Snippet) {
    let filtered = props.snippets.filter(currentSnippet => {
      return currentSnippet.id !== snippet.id
    })

    props.updateSnippets(filtered)
  }
  
  function duplicateSnippet(snippet: Snippet) {
    let now = [...props.snippets]
    let newSnippet = duplicate_snippet(snippet)
    newSnippet.id = uuidv4()

    let i = now.indexOf(snippet);
    now.splice(i, 0, newSnippet);

    props.updateSnippets(now);
  }

  function addLineBreak() {
    const snip = new LinebreakSnippet(null)

    props.updateSnippets([...props.snippets, snip])
  }

  function addPageBreak() {
    const snip = new PagebreakSnippet(null)

    props.updateSnippets([...props.snippets, snip])
  }

  function clearAllSnippets() {
    const titleString = "Are you sure!?!"
    const bodyString = "Clicking Delete will remove all your text and reset it to an empty string."
    if (confirm(`${titleString}\n${bodyString}`)) {
      props.deleteAll()
    }
  }

  function editor() {
    return (
      <SnippetDetailController
        commandType={props.commandType}
        snippet={editing}
        updateSnippet={updateEditing}
        stopEditing={stopEditing}
        version={props.version}
        customColors={props.customColors}
        setColorManaging={props.setColorManaging}
      />
    )
  }

  function onDragEnd(result: DropResult) {
    const { destination, source } = result
    if (!destination) return

    let arr = [...props.snippets]
    const moving = arr.splice(source.index, 1)[0]

    arr.splice(destination.index, 0, moving)

    props.updateSnippets(arr)
  }

  function snippetList() {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="snippet-well">
          {(provided) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {props.snippets.map((s: Snippet, index) => {
                  return (
                    <Draggable key={s.id} draggableId={s.id} index={index}>
                      {(provided, snapshot) => {
                        return <InlineSnippetController key={s.id}
                                                provided={provided}
                                                snippet={s}
                                                updateSnippet={updateSnippet}
                                                startEditingSnippet={startEditing}
                                                removeSnippet={removeSnippet}
                                                duplicateSnippet={duplicateSnippet}
                                                version={props.version}
                                                commandtype={props.commandType} />
                      }}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    );
  }

  function listView() {
    return (
      <>
        { snippetList() }

        <div className="row">
          <div className="col-sm-4 col-md-3 offset-sm-2 mb-2 mb-sm-0">
            <div className="dropdown">
              <button className="btn btn-primary btn-block dropdown-toggle"
                      type="button"
                      id="add-snippet-dropdown-button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false">
                {
                  optionPressed ? (
                    <>
                      <FontAwesomeIcon icon="tachometer-alt" /> Fast Add
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon="plus-circle" /> Add Text
                    </>
                  )
                }
              </button>
              <div className="dropdown-menu" aria-labelledby="add-snippet-dropdown-button">
                <button className="dropdown-item" onClick={() => { addSnippet(new TextSnippet(null)) }}>Text</button>
                <button className="dropdown-item" onClick={() => { addSnippet(new SelectorSnippet(null)) }}>Selector</button>
                <button className="dropdown-item" onClick={() => { addSnippet(new ScoreboardObjectiveSnippet(null)) }}>Scoreboard Objective</button>
                {
                  isFeatureAvailable(props.commandType, props.version, FeatureType.nbtComponent) ? (
                    <button className="dropdown-item" onClick={() => { addSnippet(new NBTSnippet(null)) }}>NBT Storage</button>
                  ) : null
                }
                <button className="dropdown-item" onClick={() => { addSnippet(new KeybindSnippet(null)) }}>Keybind</button>
                <button className="dropdown-item" onClick={() => { addSnippet(new TranslateSnippet(null)) }}>Translation</button>
                <button className="dropdown-item" onClick={addLineBreak}>Line Break ⏎</button>
                {
                  isFeatureAvailable(props.commandType, props.version, FeatureType.pages) ? (
                    <button className="dropdown-item" onClick={addPageBreak}>New Page <FontAwesomeIcon icon="file-alt" /></button>
                  ) : null
                }
                {
                  showFastEditTip ? (
                    <>
                      <div className="dropdown-divider"></div>
                      <p className="text-muted pl-4 pr-4 mb-0 d-flex justify-content-between align-items-center">
                        Hold option to add without editing
                        <button className="btn btn-sm btn-outline-danger" onClick={dismissFastEditTip}>OK</button>
                      </p>
                    </>
                  ) : null
                }
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-md-3">
            <Button className="btn-block"
                    type="danger"
                    icon="times-circle"
                    onClick={clearAllSnippets}>
              Delete All
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="light-well">
      { editing === null ? listView() : editor() }
    </div>
  )
}

export default SnippetCollection;