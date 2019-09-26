import * as React from "react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface ButtonProps {
  icon?: IconProp
  iconRight?: IconProp
  type: ("primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link")
  className?: string
  block?: boolean

  formType?: ("button" | "submit" | "reset")
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  style?: React.CSSProperties
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const blockClass = props.block ? "btn-block" : ""

  return (
    <button style={props.style} className={`btn btn-${props.type} ${props.className} ${blockClass}`} onClick={props.onClick} type={props.formType}>
      { props.icon ? <FontAwesomeIcon icon={props.icon} />  : null }
      { props.icon && props.children ? " " : null }
      { props.children }
      { props.iconRight && props.children ? " " : null }
      { props.iconRight ? <FontAwesomeIcon icon={props.iconRight} />  : null }
    </button>
  )
}

export default Button;