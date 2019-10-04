import * as React from "react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import uuid = require("uuid")

interface DropdownAction {
  label?: string
  icon?: IconProp,
  iconRight?: IconProp,
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  disabled?: boolean
}

interface ButtonProps {
  icon?: IconProp
  iconRight?: IconProp
  type: ("primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link")
  className?: string
  block?: boolean

  dropdowns?: Array<DropdownAction>

  formType?: ("button" | "submit" | "reset")
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  style?: React.CSSProperties
  disabled?: boolean
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  let identifier = React.useState(uuid())[0]
  const blockClass = props.block ? "btn-block" : ""
  const isDropdown = props.dropdowns && props.dropdowns.length > 0
  const dropdownClass = isDropdown ? "dropdown-toggle" : ""
  
  const mainButton = (
    <button style={props.style}
      className={`btn btn-${props.type} ${props.className} ${blockClass} ${dropdownClass}`}
      onClick={props.onClick}
      type={props.formType}
      disabled={props.disabled}

      id={isDropdown ? identifier : null}
      data-toggle={isDropdown ? "dropdown" : null}
      aria-haspopup={isDropdown ? "true" : null}>

      { props.icon ? <FontAwesomeIcon icon={props.icon} />  : null }
      { props.icon && props.children ? " " : null }
      { props.children }
      { props.iconRight && props.children ? " " : null }
      { props.iconRight ? <FontAwesomeIcon icon={props.iconRight} />  : null }
    </button>
  )

  if (isDropdown) {
    return (
      <div className="dropdown">
        { mainButton }
        <div className="dropdown-menu" aria-labeledby={identifier}>
          {
            props.dropdowns.map((dropdown, index) => {
              return (
                <a key={index} className="dropdown-item" onClick={dropdown.onClick}>
                  { dropdown.icon ? <FontAwesomeIcon icon={dropdown.icon} />  : null }
                  { dropdown.icon && dropdown.label ? " " : null }
                  { dropdown.label }
                  { dropdown.iconRight && dropdown.label ? " " : null }
                  { dropdown.iconRight ? <FontAwesomeIcon icon={dropdown.iconRight} />  : null }
                </a>
              )
            })
          }
        </div>
      </div>
    )
  } else {
    return mainButton
  }
}

export default Button;