<script lang="typescript">
  import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
  import { Button,Col,Row } from "sveltestrap";
  import type { GenericFieldCompatable } from "../../classes/Snippets/SnippetTypes/GenericFieldCompatable";
  import type { FieldSpecifier, Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import Icon from "../generic/Icon.svelte";


  export let snippet: GenericFieldCompatable
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
  
  function extendArray(field: FieldSpecifier) {
    let newSnippet = snippet.copy()
    newSnippet[field.field].push("")
    updateSnippet(newSnippet)
  }

  function removeIndex(field: FieldSpecifier, index: number) {
    let newSnippet = snippet.copy()
    newSnippet[field.field].splice(index, 1)
    updateSnippet(newSnippet)
  }

</script>

<Row>
  {#each snippet.editor_fields() as field, index}
    {#if field.fieldType == "string"}
      <div class="col-6">
        <input
          list={field.datalistID}
          class="form-control"
          placeholder={field.placeholder}
          value={snippet[field.field]}
          on:input={(evt) => { updateField(field, evt.currentTarget.value) }}
        />
      </div>
    {:else if field.fieldType == "string[]"}
      <!-- let stringList: string[] = snippet[field.field]; -->
      <div class="col-6">
        {#each snippet.value(field) as value, subIndex}
          <Row class="mb-1">
            <Col>
              <input
                list={field.datalistID}
                class="form-control"
                placeholder={`${field.placeholder} #${subIndex + 1}`}
                value={value}
                on:input={(evt) => {
                  updateField(field, evt.currentTarget.value, subIndex)
                }}
              />
            </Col>
            <div class="col-3">
              <Button
                color="danger"
                on:click={() => { removeIndex(field, subIndex) }}
              >
                <Icon icon={faTimesCircle} />
              </Button>
            </div>
          </Row>
        {/each}
        <Row>
          <Col>                   
            <Button color="success" on:click={() => { extendArray(field) }}>
              <Icon icon={faPlusCircle} />
              Add Parameter Value
            </Button>
          </Col>
        </Row>
      </div>
    {/if}
  {/each}
</Row>
