import * as uuid from "uuid/v4"

export enum Color {
    black = "black",
    dark_blue = "dark_blue",
    dark_green = "dark_green",
    dark_aqua = "dark_aqua",
    dark_red = "dark_red",
    dark_purple = "dark_purple",
    gold = "gold",
    gray = "gray",
    dark_gray = "dark_gray",
    blue = "blue",
    green = "green",
    aqua = "aqua",
    red = "red",
    light_purple = "light_purple",
    yellow = "yellow",
    white = "white",
    none = "none"
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

    insertion: string = ""

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

        newValue.insertion = this.insertion

        return newValue
    }
}