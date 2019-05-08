import * as React from "react";
import { Color, getCSSHEX } from "../classes/Color";

interface MinecraftColorWellProps {
  color: Color
}

export function MinecraftColorWell(props: MinecraftColorWellProps) {
  return (
    <div style={{
      width: '32px',
      height: '32px',
      borderRadius: '6px',
      borderStyle: 'solid',
      borderWidth: '3px',
      borderColor: 'grey',
      backgroundColor: getCSSHEX(props.color)
    }} />
  )
}