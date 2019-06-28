import * as React from "react";
import { Color, getCSSHEX } from "../classes/Color";

interface MinecraftColorWellProps {
  color: Color
}

export function MinecraftColorWell(props: MinecraftColorWellProps) {
  if (props.color) {
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
  } else {
    return (
      <div style={{
        width: 'calc(1.5em + 0.75rem + 2px)',
        height: 'calc(1.5em + 0.75rem + 2px)',
        borderRadius: '6px',
        borderStyle: 'solid',
        borderWidth: '3px',
        borderColor: 'grey',
        background: 'linear-gradient(to top right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) calc(50% - 0.8px), rgba(0,0,0,1) 50%, rgba(0,0,0,0) calc(50% + 0.8px), rgba(0,0,0,0) 100%)'
      }} />
    ) 
  }
}