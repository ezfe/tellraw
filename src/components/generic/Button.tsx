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
  const isDropdown = props.dropdowns && props.dropdowns.length > 0
  const mainButtonBlock = (props.block || isDropdown) ? "btn-block" : ""
  const dropdownGroupBlock = (props.block ? "btn-block" : "")

  const mainButton = (
    <button
      style={props.style}
      className={`btn btn-${props.type} ${mainButtonBlock}`}
      onClick={props.onClick}
      type={props.formType || "button"}
      disabled={props.disabled}>

      { props.icon ? <FontAwesomeIcon icon={props.icon} />  : null }
      { props.icon && props.children ? " " : null }
      { props.children }
      { props.iconRight && props.children ? " " : null }
      { props.iconRight ? <FontAwesomeIcon icon={props.iconRight} />  : null }
    </button>
  )

  return (
    <div className={`btn-group ${dropdownGroupBlock} ${props.className || ""}`}>
      { mainButton }
      
      { isDropdown ? (
        <>
          <button type="button"
                  className={`btn btn-${props.type} dropdown-toggle dropdown-toggle-split`}
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
            <span className="sr-only">Toggle Dropdown</span>
          </button>

          <div className="dropdown-menu">
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
        </>
      ) : null }
    </div>
  )
}

export default Button;