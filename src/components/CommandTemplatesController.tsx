import * as React from "react";
import { templates } from "../data/templates"

export interface CommandTemplatesControllerProps {

}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class CommandTemplatesController extends React.Component<CommandTemplatesControllerProps, {}> {

    constructor(props: CommandTemplatesControllerProps) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div>
                {
                    templates.map((template, index) => {
                        return (
                            <label key={`command-template-${index}`}>
                                <input type="radio" name="mcj-type" value={template.id} />
                                {template.id}
                            </label>
                        )
                    })
                }
            </div>
        )
    }
}