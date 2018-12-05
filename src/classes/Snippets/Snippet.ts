import * as uuid from "uuid/v4"
import { Color } from "../Color";
import { legacy_apply_common_formatting } from "../../helpers";

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

    static load_legacy(sf: any): Snippet {
        let snippet = new Snippet(null)

        snippet = legacy_apply_common_formatting(snippet, sf)
        
        return snippet
    }
}