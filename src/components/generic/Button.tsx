import * as React from "react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface ButtonProps {
  icon?: IconProp
  type: ("primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link")
  className?: string

  formType?: ("button" | "submit" | "reset")
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <button className={`btn btn-${props.type} ${props.className}`} onClick={props.onClick} type={props.formType}>
      { props.icon ? <FontAwesomeIcon icon={props.icon} />  : null }
      { props.icon && props.children ? " " : null }
      { props.children }
    </button>
  )
}

export default Button;