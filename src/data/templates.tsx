export const MOUSE_ACTION_HOVER = "MA_HOVER";
export const MOUSE_ACTION_CLICK = "MA_CLICK";
export const MOUSE_ACTION_INSERTION = "MA_INSERTION";

export enum CommandFormat {
    tellraw = "tellraw",
    execute_tellraw = "execute_tellraw",
    title = "title",
    subtitle = "subtitle",
    actionbar = "actionbar",
    sign_item = "sign_item",
    sign_block = "sign_block",
    book = "book"
}

export function command_template(format: CommandFormat) {
    switch (format) {
        case CommandFormat.tellraw:
            return "/tellraw @p %s"
        default:
            return "<unimplemented>";
    }
}

class Template {
    id: string
    command: string
    version: string
    formatType: string
    mouseActionOptions: Array<string>
}

export const templates: Array<Template> = [
    {
        id: "tellraw",
        command: "/tellraw @p %s",
        version: "1.7",
        formatType: "standardjson",
        mouseActionOptions: [MOUSE_ACTION_HOVER, MOUSE_ACTION_CLICK, MOUSE_ACTION_INSERTION]
    } as Template,
    {
        id: "execute_tellraw",
        command: "/execute @a ~ ~ ~ tellraw @p %s",
        version: "1.8",
        formatType: "standardjson",
        mouseActionOptions: [MOUSE_ACTION_HOVER, MOUSE_ACTION_CLICK, MOUSE_ACTION_INSERTION]
    } as Template,
    {
        id: "title",
        command: "/title @a title %s",
        version: "1.8",
        formatType: "standardjson",
        mouseActionOptions: []
    } as Template,
    {
        id: "subtitle",
        command: "/title @a subtitle %s",
        version: "1.8",
        formatType: "standardjson",
        mouseActionOptions: []
    } as Template,
    {
        id: "actionbar",
        command: "/title @a actionbar %s",
        version: "1.11",
        formatType: "standardjson",
        mouseActionOptions: []
    } as Template,
    {
        id: "sign_item",
        command: '/give @p sign 1 0 {BlockEntityTag:{%s,id:"Sign"}}',
        version: "1.8",
        formatType: "signset",
        mouseActionOptions: []
    } as Template,
    {
        id: "sign_block",
        command: "/blockdata [x] [y] [z] {%s}",
        version: "1.8",
        formatType: "signset",
        mouseActionOptions: []
    } as Template,
    {
        id: "book",
        command: "/give @p written_book{pages:%s,title:CustomBook,author:Player}",
        version: "1.13",
        formatType: "bookarray",
        mouseActionOptions: [MOUSE_ACTION_HOVER, MOUSE_ACTION_CLICK, MOUSE_ACTION_INSERTION]
    } as Template
];