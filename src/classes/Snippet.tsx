import * as uuid from "uuid/v4"

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

export enum SnippetType {
    text = 'text',
    selector = 'selector',
    scoreboardObjective = 'scoreboardObjective',
    lineBreak = 'lineBreak'
}

export class Snippet {
    id: string

    type: SnippetType = SnippetType.text
    
    // Regular Text
    text: string = ""

    // Selector
    selector: string = ""

    // Scoreboard Objective
    score_name: string = ""
    score_objective: string = ""

    bold: boolean = false
    italic: boolean = false
    underlined: boolean = false
    strikethrough: boolean = false
    obfuscated: boolean = false

    color: Color = Color.none

    constructor(id: string = null) {
        if (id !== null) {
            this.id = id
        } else {
            this.id = uuid()
        }
    }

    copy(): Snippet {
        let newValue = new Snippet(this.id)
        
        newValue.type = this.type

        newValue.text = this.text

        newValue.selector = this.selector

        newValue.score_name = this.score_name
        newValue.score_objective = this.score_objective

        newValue.bold = this.bold
        newValue.italic = this.italic
        newValue.underlined = this.underlined
        newValue.strikethrough = this.strikethrough
        newValue.obfuscated = this.obfuscated

        newValue.color = this.color

        return newValue
    }
}