import * as React from "react";
import { Color, getCSSHEX } from "../classes/Color";

interface MinecraftColorWellProps {
  color: Color
}

export function MinecraftColorWell(props: MinecraftColorWellProps) {
  if (props.color == Color.none) {
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