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
        selectableStates.map(typeInfo => {
          const selected = props.commandType === typeInfo.type
          return (
            <div className={`col-2 mcj-format-option ${selected ? "active" : ""}`}
                 key={`command-template-${typeInfo.type}`}
                 onClick={() => { props.updateCommandType(typeInfo.type) }}>
              {typeInfo.name}
            </div>
          )
            // return (
            //   <label key={`command-template-${typeInfo.type}`}>
            //     <input 
            //       type="radio"
            //       name="mcj-type"
            //       value={typeInfo.type}
            //       checked={this.props.commandType === typeInfo.type}
            //       onChange={this.updateCommandType} />
            //     {typeInfo.name}
            //   </label>
            // )
          })
      }
    </div>
  )
}

export default CommandTemplatesController;