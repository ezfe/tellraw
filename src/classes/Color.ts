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

export function getCSSHEX(color: Color): string {
  console.log(`Converting ${color} to hexadecimal`)
  if (color == "black") return "#000000"
  if (color == "dark_blue") return "#0000B2"
  if (color == "dark_green") return "#14AB00"
  if (color == "dark_aqua") return "#13AAAB"
  if (color == "dark_red") return "#A90400"
  if (color == "dark_purple") return "#A900B2"
  if (color == "gold") return "#FEAC00"
  if (color == "gray") return "#AAAAAA"
  if (color == "dark_gray") return "#555555"
  if (color == "blue") return "#544CFF"
  if (color == "green") return "#5CFF00"
  if (color == "aqua") return "#5BFFFF"
  if (color == "red") return "#FD5650"
  if (color == "light_purple") return "#FD4DFF"
  if (color == "yellow") return "#FFFF00"
  if (color == "white") return "#FFFFFF"

  if (color == "none") return "#000000"
  
  return color
}

// function noneHex() {
//   if (currentTemplate().formatType == "bookarray" || currentTemplate().formatType == "signset") {
//       return "#000000";
//   } else {
//       return "#FFFFFF";
//   }
// }
