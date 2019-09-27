import * as React from "react";
import { NBTSnippet } from "../../classes/Snippets/SnippetTypes/NBTSnippet";

export interface InlineNBTSnippetControllerProps {
  snippet: NBTSnippet
  updateSnippet: (Snippet) => void
}

export class InlineNBTSnippetController extends React.Component<InlineNBTSnippetControllerProps, {}> {

  constructor(props: InlineNBTSnippetControllerProps) {
    super(props)

    this.changeNBTValue = this.changeNBTValue.bind(this)
    this.changeStorageValue = this.changeStorageValue.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  changeNBTValue(event: any) {
    this.updateField("nbt", event.target.value)
  }

  changeStorageValue(event: any) {
      this.updateField("storage", event.target.value)
  }

  updateField(field: string, value: any) {
    let newSnippet = this.props.snippet.copy()
    newSnippet[field] = value
    this.props.updateSnippet(newSnippet)
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <input className="form-control" placeholder="Storage Identifier" value={this.props.snippet.storage} onChange={this.changeStorageValue} />
        </div>
        <div className="col">
          <input className="form-control" placeholder="NBT Path" value={this.props.snippet.nbt} onChange={this.changeNBTValue} />
        </div>
      </div>
    )
  }
}