import { Color } from "../Color";

export interface Snippet {
    id: string

    bold: boolean
    italic: boolean
    underlined: boolean
    strikethrough: boolean
    obfuscated: boolean

    color: Color

    insertion: string

    copy(): Snippet
}