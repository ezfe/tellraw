import { FontAwesomeIcon } from "../components/generic/node_modules/@fortawesome/react-fontawesome";
import * as React from "../components/generic/node_modules/react";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from '../components/generic/node_modules/uuid';
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
import Button from "../components/generic/Button";
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

}

export default SnippetCollection;