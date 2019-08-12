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

export class InlineEditButton extends React.Component<InlineEditButtonProps, {}> {
  render() {
    // return (
    //   <button className={`btn btn-${this.props.style || "secondary"} btn-block`} onClick={this.props.onClick}>
        // <FontAwesomeIcon icon={getIcon(this.props.icon, "edit")} /> {this.props.text || "Edit"}
    //   </button>
    // )

    return (
      <div className="btn-group">
        <button type="button"
                className={`btn btn-${this.props.style || "secondary"}`}
                disabled={!this.props.mainAction.enabled}
                onClick={() => {
                  if (this.props.mainAction.enabled) {
                    this.props.onClick(this.props.mainAction.id)
                  }
                }}>
          <FontAwesomeIcon icon={getIcon(this.props.icon, "edit")} /> {this.props.mainAction.text}
        </button>
        <button type="button" className={`btn btn-${this.props.style || "secondary"} dropdown-toggle dropdown-toggle-split`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="sr-only">Toggle Editing Dropdown</span>
        </button>
        <div className="dropdown-menu">
          {
            this.props.dropdownActions.map(action => {
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
                    this.props.onClick(action.id)
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
}