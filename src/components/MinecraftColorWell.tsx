import * as React from "../components/generic/node_modules/react";
import { Color, getCSSHEX } from "../classes/Color";
import { FontAwesomeIcon } from "../components/generic/node_modules/@fortawesome/react-fontawesome";
import { highContrastColor } from "../helpers/high_contrast";


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