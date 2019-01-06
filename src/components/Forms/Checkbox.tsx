import * as React from "react";
import uuid = require("uuid");

interface CheckboxProps {
  checked: boolean
  onChange: (newValue: boolean) => void
  label: string
}

export class Checkbox extends React.Component<CheckboxProps, {}> {
  randomUUID = null

  componentWillMount() {
    this.randomUUID = uuid()
  }

  render() {
    const id = this.randomUUID

    return (
      <div className="custom-control custom-checkbox">
        <input checked={this.props.checked} onChange={event => this.props.onChange(event.target.checked)} type="checkbox" className="custom-control-input" id={id} />
        <label className="custom-control-label" htmlFor={id}>{ this.props.label }</label>
      </div>  
    )
  }
}