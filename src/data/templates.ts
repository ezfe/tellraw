import { Version, versionAtLeast } from "../helpers/versions"

export enum CommandType {
    tellraw = "tellraw",
    overlay = "overlay",
    sign = "sign",
    book = "book",
    hovertext = "hovertext",
    children = "children"
}

export enum FeatureType {
    clicking,
    hovering,
    insertion,
    pages,
    bookPreview,
    font,
    customColor,
    nbtComponent,
    nbtStorageComponent,
    litSign,
    linebreak,
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
export function isFeatureAvailable(commandType: CommandType, version: Version, feature: FeatureType): boolean {
    // console.log(`Checking feature: ${FeatureType[feature]} for version ${version}, command type ${commandType}`)
    if (feature == FeatureType.clicking) {
        if (commandType == CommandType.tellraw ||
            commandType == CommandType.book ||
            commandType == CommandType.sign) {
            return true
        } else {
            return false
        }
    } else if (feature == FeatureType.hovering ||
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
        feature == FeatureType.bookPreview) {
        // Pages & book previews are supported by books only
        return commandType == CommandType.book
    } else if (feature == FeatureType.font || feature == FeatureType.customColor) {
        return versionAtLeast(version, "1.16")
    } else if (feature == FeatureType.nbtComponent) {
        return versionAtLeast(version, "1.14")
    } else if (feature == FeatureType.nbtStorageComponent) {
        return versionAtLeast(version, "1.15")
    } else if (feature == FeatureType.litSign) {
        return commandType == CommandType.sign && versionAtLeast(version, "1.17")
    } else if (feature == FeatureType.linebreak) {
        return commandType != CommandType.overlay
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
        "/give @p oak_sign{BlockEntityTag:{%s,id:\"Sign\"}}",
        "/data merge block [x] [y] [z] {%s}"
    ],
    "book": [
        "/give @p written_book{pages:%s,title:\"Custom Book\",author:Player}"
    ]
}