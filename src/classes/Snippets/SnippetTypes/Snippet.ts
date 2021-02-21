import { v4 as uuidv4 } from "uuid";

export type FieldType = "string" | "string[]"

export interface FieldSpecifier {
  field: string,
  placeholder: string | null,
  datalistID: string | null
  fieldType: FieldType
}

export abstract class Snippet {
  id: string

  constructor(id: string = null) {
    if (id !== null) {
      this.id = id
    } else {
      this.id = uuidv4()
    }
  }

  editor_fields(): Array<FieldSpecifier> {
    return []
  }

  value(field: FieldSpecifier): string | string[] {
    switch (field.fieldType) {
      case "string":
        return this[field.field] as string;
      case "string[]":
        return this[field.field] as string[]
      default:
        console.error(`Failed to retrieve field ${field.field} with type ${field.fieldType}`)
        return "@Field Retrieval Error@"
        break;
    }
  }
}