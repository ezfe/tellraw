import * as React from "react";
import { CommandType } from "../data/templates"

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
          Object
            .keys(CommandType)
            // .filter(key => { !isNaN(Number(CommandType[key])) })
            .map(type => {
              return (
                <label key={`command-template-${type}`}>
                  <input 
                    type="radio"
                    name="mcj-type"
                    value={type}
                    checked={this.props.commandType === type}
                    onChange={this.updateCommandType} />
                  {type}
                </label>
              )
            })
        }
      </div>
    )
  }
}