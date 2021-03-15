<script lang="typescript">
  import { Button,Col,Row } from "sveltestrap";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import type { TranslateSnippet } from "../../classes/Snippets/SnippetTypes/TranslateSnippet";
  import type { CommandType } from "../../data/templates";
  import AddSnippetDropdown from "../AddSnippetDropdown.svelte";
  import PlusCircle from "../generic/Icons/PlusCircle.svelte";


  export let snippet: TranslateSnippet
  export let commandType: CommandType
  export let updateSnippet: (snippet: Snippet) => void

  function addSnippet(newParameter: Snippet, fast: boolean) {
    const newSnippet = snippet.copy();
    newSnippet.parameters.push(newParameter);
    updateSnippet(newSnippet);
  }

  function updateField(field: string, event: any) {
    updateFieldValue(field, event.target.value)
  }

  function updateFieldValue(field: string, value: any) {
    let newSnippet = snippet.copy()
    newSnippet[field] = value
    updateSnippet(newSnippet)
  }
</script>

<div class="col-6">
  {#each snippet.parameters as value, subIndex}
    <Row class="mb-1">
      <Col>
        <input
          class="form-control"
          placeholder={`Parameter #${subIndex + 1}`}
          value={JSON.stringify(value)}
          on:input={(evt) => {
            // updateField(field, evt.currentTarget.value, subIndex)
          }}
        />
      </Col>
      <!-- <div class="col-3">
        <Button
          color="danger"
          on:click={() => { removeIndex(field, subIndex) }}
        >
          <TimesCircle />
        </Button>
      </div> -->
    </Row>
  {/each}
  <Row>
    <Col>
      <AddSnippetDropdown
        {commandType}
        {addSnippet}
      />
    </Col>
  </Row>
</div>
