export type Color = string
// These are the colors, but since
// Hex is allowed, no point in typing
// it.
// "black" |
// "dark_blue" |
// "dark_green" |
// "dark_aqua" |
// "dark_red" |
// "dark_purple" |
// "gold" |
// "gray" |
// "dark_gray" |
// "blue" |
// "green" |
// "aqua" |
// "red" |
// "light_purp" |
// "yellow" |
// "white" |
// "none" |

export const minecraftColorSet = {
  black: "#000000",
  dark_blue: "#0000B2",
  dark_green: "#14AB00",
  dark_aqua: "#13AAAB",
  dark_red: "#A90400",
  dark_purple: "#A900B2",
  gold: "#FEAC00",
  gray: "#AAAAAA",
  dark_gray: "#555555",
  blue: "#544CFF",
  green: "#5CFF00",
  aqua: "#5BFFFF",
  red: "#FD5650",
  light_purple: "#FD4DFF",
  yellow: "#FFFF00",
  white: "#FFFFFF",
  none: "#000000"
}

export function getCSSHEX(color: Color): string {
  if (color in minecraftColorSet) {
    return minecraftColorSet[color]
  } else {
    return color
  }
}

// function noneHex() {
//   if (currentTemplate().formatType == "bookarray" || currentTemplate().formatType == "signset") {
//       return "#000000";
//   } else {
//       return "#FFFFFF";
//   }
// }
