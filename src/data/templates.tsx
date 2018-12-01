export const MOUSE_ACTION_HOVER = "MA_HOVER";
export const MOUSE_ACTION_CLICK = "MA_CLICK";
export const MOUSE_ACTION_INSERTION = "MA_INSERTION";

export const templates = [
    {
        id: "tellraw",
        command: "/tellraw @p %s",
        version: "1.7",
        formatType: "standardjson",
        mouseActionOptions: [MOUSE_ACTION_HOVER, MOUSE_ACTION_CLICK, MOUSE_ACTION_INSERTION]
    },
    {
        id: "execute_tellraw",
        command: "/execute @a ~ ~ ~ tellraw @p %s",
        version: "1.8",
        formatType: "standardjson",
        mouseActionOptions: [MOUSE_ACTION_HOVER, MOUSE_ACTION_CLICK, MOUSE_ACTION_INSERTION]
    },
    {
        id: "title",
        command: "/title @a title %s",
        version: "1.8",
        formatType: "standardjson",
        mouseActionOptions: []
    },
    {
        id: "subtitle",
        command: "/title @a subtitle %s",
        version: "1.8",
        formatType: "standardjson",
        mouseActionOptions: []
    },
    {
        id: "actionbar",
        command: "/title @a actionbar %s",
        version: "1.11",
        formatType: "standardjson",
        mouseActionOptions: []
    },
    {
        id: "sign_item",
        command: '/give @p sign 1 0 {BlockEntityTag:{%s,id:"Sign"}}',
        version: "1.8",
        formatType: "signset",
        mouseActionOptions: []
    },
    {
        id: "sign_block",
        command: "/blockdata [x] [y] [z] {%s}",
        version: "1.8",
        formatType: "signset",
        mouseActionOptions: []
    },
    {
        id: "book",
        command: "/give @p written_book{pages:%s,title:CustomBook,author:Player}",
        version: "1.13",
        formatType: "bookarray",
        mouseActionOptions: [MOUSE_ACTION_HOVER, MOUSE_ACTION_CLICK, MOUSE_ACTION_INSERTION]
    }
];