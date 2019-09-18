import * as React from "react";
import { CommandType } from "../data/templates"
import { checkPropTypes } from "prop-types";

const selectableStates = [
  {
    type: CommandType.tellraw,
    name: "Basic Tellraw"
  },
  {
    type: CommandType.overlay,
    name: "Screen Overlay"
  },
  {
    type: CommandType.sign,
    name: "Sign"
  },
  {
    type: CommandType.book,
    name: "Book"
  }
]

export interface CommandTemplatesControllerProps {
  commandType: CommandType
  updateCommandType: (CommandType) => void
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
const CommandTemplatesController: React.FunctionComponent<CommandTemplatesControllerProps> = (props) => {
  return (
    <div className="row mb-4">
      {
        selectableStates.map(typeInfo => {
          const selected = props.commandType === typeInfo.type
          return (
            <div className="col-2" key={`command-template-${typeInfo.type}`}>
              <div className={`mcj-format-option ${selected ? "active" : ""}`}
                  onClick={() => { props.updateCommandType(typeInfo.type) }}>
                {typeInfo.name}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default CommandTemplatesController;