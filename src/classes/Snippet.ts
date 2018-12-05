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

export class Snippet {
    id: string

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

export class TextSnippet extends Snippet {
    text: string = ""

    copy(): TextSnippet {
        let newValue = (Object as any).assign(new TextSnippet(), super.copy())

        newValue.text = this.text

        return newValue
    }
}

export class SelectorSnippet extends Snippet {
    selector: string = ""

    copy(): SelectorSnippet {
        let newValue = (Object as any).assign(new SelectorSnippet(), super.copy())

        newValue.selector = this.selector

        return newValue
    }
}

export class ScoreboardObjectiveSnippet extends Snippet {
    score_name: string = ""
    score_objective: string = ""

    copyFile() : ScoreboardObjectiveSnippet {
        let newValue = (Object as any).assign(new SelectorSnippet(), super.copy())

        newValue.score_name = this.score_name
        newValue.score_objective = this.score_objective

        return newValue
    }
}