<script lang="typescript">
  import { Row } from "sveltestrap";
  import type { FieldSpecifier,Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import type { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";

  export let snippet: TextSnippet
  export let updateSnippet: (snippet: Snippet) => void

  function updateField(field: FieldSpecifier, value: any, index: number | null = null) {
    let newSnippet = snippet.copy()
    if (field.fieldType == "string") {
      newSnippet[field.field] = value
    } else if (field.fieldType == "string[]") {
      newSnippet[field.field][index] = value
    } else {
      console.error("Unexpected fieldType", field.fieldType)
    }
    updateSnippet(newSnippet)
  }
</script>

<Row>
  {#each snippet.editor_fields() as field, index}
    <div class="col-6">
      <input
        list={field.datalistID}
        class="form-control"
        placeholder={field.placeholder}
        value={snippet[field.field]}
        on:input={(evt) => { updateField(field, evt.currentTarget.value) }}
      />
    </div>
  {/each}
</Row>
