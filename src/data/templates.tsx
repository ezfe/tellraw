export enum CommandType {
    tellraw = "tellraw",
    overlay = "overlay",
    sign = "sign",
    book = "book",
    hovertext = "hovertext"
}

export enum FeatureType {
    clicking,
    hovering,
    insertion
}

export function isFeatureAvailable(commandType: CommandType, feature: FeatureType): boolean {
    if (feature == FeatureType.clicking ||
        feature == FeatureType.hovering ||
        feature == FeatureType.insertion) {
            
        if (commandType == CommandType.tellraw ||
            commandType == CommandType.book) {
                return true
        } else {
            return false
        }
    } else {
        return true
    }
}

// class Template {
//     id: string
//     command: string
//     version: string
//     formatType: string
//     mouseActionOptions: Array<string>
// }

// export const templates: Array<Template> = [
//     {
//         id: "tellraw",
//         command: "/tellraw @p %s",
//         version: "1.7",
//         formatType: "standardjson",
//         mouseActionOptions: [MOUSE_ACTION_HOVER, MOUSE_ACTION_CLICK, MOUSE_ACTION_INSERTION]
//     } as Template,
//     {
//         id: "execute_tellraw",
//         command: "/execute @a ~ ~ ~ tellraw @p %s",
//         version: "1.8",
//         formatType: "standardjson",
//         mouseActionOptions: [MOUSE_ACTION_HOVER, MOUSE_ACTION_CLICK, MOUSE_ACTION_INSERTION]
//     } as Template,
//     {
//         id: "title",
//         command: "/title @a title %s",
//         version: "1.8",
//         formatType: "standardjson",
//         mouseActionOptions: []
//     } as Template,
//     {
//         id: "subtitle",
//         command: "/title @a subtitle %s",
//         version: "1.8",
//         formatType: "standardjson",
//         mouseActionOptions: []
//     } as Template,
//     {
//         id: "actionbar",
//         command: "/title @a actionbar %s",
//         version: "1.11",
//         formatType: "standardjson",
//         mouseActionOptions: []
//     } as Template,
//     {
//         id: "sign_item",
//         command: '/give @p sign 1 0 {BlockEntityTag:{%s,id:"Sign"}}',
//         version: "1.8",
//         formatType: "signset",
//         mouseActionOptions: []
//     } as Template,
//     {
//         id: "sign_block",
//         command: "/blockdata [x] [y] [z] {%s}",
//         version: "1.8",
//         formatType: "signset",
//         mouseActionOptions: []
//     } as Template,
//     {
//         id: "book",
//         command: "/give @p written_book{pages:%s,title:CustomBook,author:Player}",
//         version: "1.13",
//         formatType: "bookarray",
//         mouseActionOptions: [MOUSE_ACTION_HOVER, MOUSE_ACTION_CLICK, MOUSE_ACTION_INSERTION]
//     } as Template
// ];