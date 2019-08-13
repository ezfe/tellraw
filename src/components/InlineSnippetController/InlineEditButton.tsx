import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { isNullOrUndefined } from "util";

export interface InlineEditButtonAction {
  text: string
  enabled: boolean
  id: string
  icon?: IconProp
}

interface InlineEditButtonProps {
  mainAction: InlineEditButtonAction
  dropdownActions: Array<InlineEditButtonAction>
  onClick: (id) => void
  icon?: IconProp,
  style?: string
}

function getIcon(providedIcon: IconProp, defaultIcon: IconProp): IconProp {
  if (providedIcon) {
    return providedIcon
  } else {
    return defaultIcon
  }
}

const InlineEditButton: React.FunctionComponent<InlineEditButtonProps> = (props) => {
  return (
    <div className="btn-group">
      <button type="button"
              className={`btn btn-${props.style || "secondary"}`}
              disabled={!props.mainAction.enabled}
              onClick={() => {
                if (props.mainAction.enabled) {
                  props.onClick(props.mainAction.id)
                }
              }}>
        <FontAwesomeIcon icon={getIcon(props.icon, "edit")} /> {props.mainAction.text}
      </button>
      <button type="button" className={`btn btn-${props.style || "secondary"} dropdown-toggle dropdown-toggle-split`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span className="sr-only">Toggle Editing Dropdown</span>
      </button>
      <div className="dropdown-menu">
        {
          props.dropdownActions.map(action => {
            // Skip disabled actions
            if (!action.enabled) {
              return null
            }

            const actionIcon = action.icon ? (
              <>
                <FontAwesomeIcon icon={action.icon} />
                &nbsp;
              </>
            ) : null
            
            return (
              <a key={action.id}
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  props.onClick(action.id)
                }}>
                { actionIcon }
                { action.text }
              </a>
            )
          })
        }
      </div>
    </div>
  )
}

export default InlineEditButton