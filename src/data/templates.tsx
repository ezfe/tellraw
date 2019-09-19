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
    insertion,
    pages,
    bookPreview
}

/**
 * Indicates true or false, whether a given feature is
 * available for a specific type of command
 * 
 * For example, hovering over text is not available
 * in sign commands
 * 
 * @param commandType The command type
 * @param feature  The feature being queried
 */
export function isFeatureAvailable(commandType: CommandType, feature: FeatureType): boolean {
    if (feature == FeatureType.clicking ||
        feature == FeatureType.hovering ||
        feature == FeatureType.insertion) {
          
        // Clicking, hovering, and inserting are all the same
        // They are supported by tellraw and books
        // but nothing else
        if (commandType == CommandType.tellraw ||
            commandType == CommandType.book) {
                return true
        } else {
            return false
        }
    } else if (feature == FeatureType.pages ||
               feature === FeatureType.bookPreview) {
        // Pages & book previews are supported by books only
        return commandType == CommandType.book
    } else {
        return true
    }
}

export function template_lookup(ct: CommandType): Array<string> {
    return templates[CommandType[ct]]
}

const templates = {
    "tellraw": [
        "/tellraw @p %s",
        "/execute @a ~ ~ ~ tellraw @p %s"
    ],
    "overlay": [
        "/title @a title %s",
        "/title @a subtitle %s",
        "/title @a actionbar %s"
    ],
    "sign": [
        "/give @p sign{BlockEntityTag:{%s,id:\"Sign\"}}",
        "/data merge block [x] [y] [z] {%s}"
    ],
    "book": [
        "/give @p written_book{pages:%s,title:\"Custom Book\",author:Player}"
    ]
}