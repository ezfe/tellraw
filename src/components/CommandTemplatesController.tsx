import * as React from "react";
import { CommandType, template_lookup } from "../data/templates"
import Button from "./generic/Button";

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
  updateCommandType: (type: CommandType, template?: string) => void
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
            <div className={`col-12 col-sm-5 col-md-4 col-lg-3 ${last ? "mb-4" : "mb-2"}`} key={`command-template-${typeInfo.type}`}>
              <Button
                block
                type={ selected ? "success" : "light" }
                onClick={() => {
                  props.updateCommandType(typeInfo.type)
                }}
                icon={ selected ? "check-circle" : null }
                dropdowns={template_lookup(typeInfo.type).map(template => {
                  return {
                    label: template,
                    onClick: () => { 
                      props.updateCommandType(typeInfo.type, template)                      
                    }
                  }
                })}
                >
                { typeInfo.name }
              </Button>
              {/* <div className={`mcj-format-option ${selected ? "active" : ""}`}
                  onClick={() => { props.updateCommandType(typeInfo.type) }}>
                {typeInfo.name}
              </div> */}
            </div>
          )
        })
      }
    </div>
  )
}

export default CommandTemplatesController;