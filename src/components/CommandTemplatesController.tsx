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
    <div className="row">
      {
        selectableStates.map((typeInfo, index) => {
          const selected = props.commandType === typeInfo.type
          const last = index >= selectableStates.length - 1
          return (
            <div className={`col-12 col-sm-4 col-md-3 col-lg-2 ${last ? "mb-4" : "mb-2"}`} key={`command-template-${typeInfo.type}`}>
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