import * as React from "react";
import { Color, getCSSHEX } from "../classes/Color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { highContrastColor } from "../helpers/high_contrast";

interface MinecraftColorWellProps {
  color: Color
}

export function MinecraftColorWell(props: MinecraftColorWellProps) {
  if (props.color == "none") {
    return (
      <div style={{
        width: 'calc(1.5em + 0.75rem + 2px)',
        height: 'calc(1.5em + 0.75rem + 2px)',
      }} />
    )
  } else {
    return (
      <div style={{
        width: 'calc(1.5em + 0.75rem + 2px)',
        height: 'calc(1.5em + 0.75rem + 2px)',
        borderRadius: '6px',
        borderStyle: 'solid',
        borderWidth: '3px',
        borderColor: 'grey',
        backgroundColor: getCSSHEX(props.color)
      }} />
    )
  }
}

interface ColorPickerProps {
  color: Color
  checked: boolean
  onClick: (color: Color) => void
}

export const MinecraftColorButton: React.FunctionComponent<ColorPickerProps> = (props) => {  
  return (
    <div
      style={{
        width: 'calc(1.5em + 0.75rem + 2px)',
        height: 'calc(1.5em + 0.75rem + 2px)',
        backgroundColor: getCSSHEX(props.color)
      }}
      onClick={() => { props.onClick(props.color) }}
      className="d-flex justify-content-center align-items-center"
    >
      {
        props.checked ? (
          <FontAwesomeIcon
            icon="check-circle"
            style={{ color: highContrastColor(getCSSHEX(props.color), "white", "black") }}
          />
        ) : null
      }
    </div>
  )
}