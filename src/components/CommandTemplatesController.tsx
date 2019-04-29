import * as React from "react";
import { CommandType } from "../data/templates"

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
export class CommandTemplatesController extends React.Component<CommandTemplatesControllerProps, {}> {

  constructor(props: CommandTemplatesControllerProps) {
    super(props)

    this.state = {}

    this.updateCommandType = this.updateCommandType.bind(this)
  }
  
  updateCommandType(event) {
    this.props.updateCommandType(event.target.value)
  }

  render() {
    return (
      <div>
        {
          selectableStates.map(typeInfo => {
              return (
                <label key={`command-template-${typeInfo.type}`}>
                  <input 
                    type="radio"
                    name="mcj-type"
                    value={typeInfo.type}
                    checked={this.props.commandType === typeInfo.type}
                    onChange={this.updateCommandType} />
                  {typeInfo.name}
                </label>
              )
            })
        }
      </div>
    )
  }
}