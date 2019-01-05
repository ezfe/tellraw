import { Color } from "../Color";
import uuid = require("uuid");
import { ClickEventType } from "./ClickEvent";

export abstract class Snippet {
    id: string

    bold: boolean = false
    italic: boolean = false
    underlined: boolean = false
    strikethrough: boolean = false
    obfuscated: boolean = false
  
    color: Color = Color.none
  
    insertion: string = ""

    click_event_type: ClickEventType = ClickEventType.none
    click_event_value: string = ""

    constructor(id: string = null) {
        if (id !== null) {
            this.id = id
        } else {
            this.id = uuid()
        }
    }
}