import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface InlineEditButtonProps {
  onClick: (Event) => void
  icon?: IconProp,
  text?: string,
  style?: string
}

function getIcon(providedIcon: IconProp, defaultIcon: IconProp): IconProp {
  if (providedIcon) {
    return providedIcon
  } else {
    return defaultIcon
  }
}

export class InlineEditButton extends React.Component<InlineEditButtonProps, {}> {
  render() {
    return (
      <button className={`btn btn-${this.props.style || "secondary"} btn-block`} onClick={this.props.onClick}>
        <FontAwesomeIcon icon={getIcon(this.props.icon, "edit")} /> {this.props.text || "Edit"}
      </button>
    )
  }
}