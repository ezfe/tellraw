import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface InlineEditButtonProps {
  onClick: (Event) => void
  icon?: IconProp,
  text?: string,
  style?: string
}

export class InlineEditButton extends React.Component<InlineEditButtonProps, {}> {
  render() {
    return (
      <button className={`btn btn-${this.props.style || "secondary"}`} onClick={this.props.onClick}>
        <FontAwesomeIcon icon={this.props.icon || "edit"} /> {this.props.text || "Edit"}
      </button>
    )
  }
}