import * as React from "react";
import { v4 as uuidv4 } from 'uuid';

interface CheckboxProps {
  checked: boolean
  onChange: (newValue: boolean) => void
  label: string
}

export const Checkbox: React.FunctionComponent<CheckboxProps> = (props) => {  
  let [randomUUID, setRandomUUID] = React.useState(uuidv4())
  
  return (
    <div className="custom-control custom-checkbox">
      <input checked={props.checked} onChange={event => props.onChange(event.target.checked)} type="checkbox" className="custom-control-input" id={randomUUID} />
      <label className="custom-control-label" htmlFor={randomUUID}>{ props.label }</label>
    </div>  
  )
}
