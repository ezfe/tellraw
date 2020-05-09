import * as React from "react";
import { Color, getCSSHEX } from "../classes/Color";

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
  currentColor: Color
  checked: boolean
  onChange: (newValue: boolean) => void
  label: string
}

// export const ColorPicker: React.FunctionComponent<ColorPickerProps> = (props) => {  
  
//   return (
//     <div className="custom-control custom-checkbox">
//       <input checked={props.checked} onChange={event => props.onChange(event.target.checked)} type="checkbox" className="custom-control-input" id={randomUUID} />
//       <label className="custom-control-label" htmlFor={randomUUID}>{ props.label }</label>
//     </div>  
//   )
// }