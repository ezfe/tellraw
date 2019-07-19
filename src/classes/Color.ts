export enum Color {
  black,
  dark_blue,
  dark_green,
  dark_aqua,
  dark_red,
  dark_purple,
  gold,
  gray,
  dark_gray,
  blue,
  green,
  aqua,
  red,
  light_purple,
  yellow,
  white,
  none
}

export function getCSSHEX(color: Color): string {
  console.log('Converting to a hex', color)
  if (color == Color.black) return "#000000"
  if (color == Color.dark_blue) return "#0000B2"
  if (color == Color.dark_green) return "#14AB00"
  if (color == Color.dark_aqua) return "#13AAAB"
  if (color == Color.dark_red) return "#A90400"
  if (color == Color.dark_purple) return "#A900B2"
  if (color == Color.gold) return "#FEAC00"
  if (color == Color.gray) return "#AAAAAA"
  if (color == Color.dark_gray) return "#555555"
  if (color == Color.blue) return "#544CFF"
  if (color == Color.green) return "#5CFF00"
  if (color == Color.aqua) return "#5BFFFF"
  if (color == Color.red) return "#FD5650"
  if (color == Color.light_purple) return "#FD4DFF"
  if (color == Color.yellow) return "#FFFF00"
  if (color == Color.white) return "#FFFFFF"
  
  if (color == Color.none) return "#000000"

  console.error("Invalid color", color)
  return "#00000"
}

// function noneHex() {
//   if (currentTemplate().formatType == "bookarray" || currentTemplate().formatType == "signset") {
//       return "#000000";
//   } else {
//       return "#FFFFFF";
//   }
// }
