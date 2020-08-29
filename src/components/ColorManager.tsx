import * as React from "react";
import { Color } from "../classes/Color";

interface ColorManagerProps {
  customColors: Color[],
  setCustomColors: (customColors: Color[]) => void,
  setColorManaging: (newValue: Boolean) => void
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
      Custom colors are coming soon...
    </>
  );
}

export default ColorManager;