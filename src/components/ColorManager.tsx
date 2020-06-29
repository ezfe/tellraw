import * as React from "react";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { CommandType } from "../data/templates";
import { loadCurrentVersionState, upgradeV5State } from "../helpers/loaders";
import Button from "./generic/Button";
import { Color } from "../classes/Color";

interface ColorManagerProps {
    customColors: Array<Color>,
}

const ColorManager: React.FunctionComponent<ColorManagerProps> = (props) => {
    function formSubmit(e): boolean {
        e.preventDefault()
        e.stopPropagation()
        // doImport()
        return false
    }

    return (
        <>
            Custom Colors...
        </>
    );
}

export default ColorManager;