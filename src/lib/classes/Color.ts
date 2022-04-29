export type Color = string;
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
	black: '#000000',
	dark_blue: '#0000A8',
	dark_green: '#00A800',
	dark_aqua: '#00A8A8',
	dark_red: '#A80000',
	dark_purple: '#A800A8',
	gold: '#FCA800',
	gray: '#A8A8A8',
	dark_gray: '#545454',
	blue: '#5454FC',
	green: '#54FC54',
	aqua: '#54FCFC',
	red: '#FC5454',
	light_purple: '#FC54FC',
	yellow: '#FCFC54',
	white: '#FCFCFC',
	none: '#000000'
};

export function getCSSHEX(color: Color): string {
	if (color in minecraftColorSet) {
		return minecraftColorSet[color];
	} else {
		return color;
	}
}

// function noneHex() {
//   if (currentTemplate().formatType == "bookarray" || currentTemplate().formatType == "signset") {
//       return "#000000";
//   } else {
//       return "#FFFFFF";
//   }
// }
