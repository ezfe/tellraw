<script lang="typescript">
  import { Button,Col,Row } from "sveltestrap";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import type { TranslateSnippet } from "../../classes/Snippets/SnippetTypes/TranslateSnippet";
  import type { CommandType } from "../../data/templates";
  import AddSnippetDropdown from "../AddSnippetDropdown.svelte";
  import PlusCircle from "../generic/Icons/PlusCircle.svelte";
import TimesCircle from "../generic/Icons/TimesCircle.svelte";
  import SnippetCollection from "../SnippetCollection.svelte";


  export let snippet: TranslateSnippet
  export let commandType: CommandType
  export let colorManaging: boolean
  export let updateSnippet: (snippet: Snippet) => void

  function updateTranslate(event) {
    const newSnippet = snippet.copy();
    newSnippet.translate = event.target.value;
    updateSnippet(newSnippet);
  }

  function updateParameter(newParameter: Snippet[], index: number) {
    const newSnippet = snippet.copy();
    newSnippet.parameters[index] = newParameter;
    updateSnippet(newSnippet);
  }

  function addParameter() {
    const newSnippet = snippet.copy();
    newSnippet.parameters.push([])
    updateSnippet(newSnippet);
  }

  function deleteParameter(index: number) {
    const newSnippet = snippet.copy();
    newSnippet.parameters.splice(index, 1);
    updateSnippet(newSnippet);
  }
</script>

<div class="col-6">
  <Row class="mb-2">
    <input
      list="datalist-translations"
      class="form-control"
      placeholder="Translate identifier"
      value={snippet.translate}
      on:input={updateTranslate}
    />
  </Row>
</div>
<div class="col-6">
  {#each snippet.parameters as param, paramIndex}
    <Row class="mb-1">
      <div class="col inline-snippet-collection">
        <SnippetCollection
          commandType={commandType}
          snippets={param}
          updateSnippets={(snippets) => {
            updateParameter(snippets, paramIndex)
          }}
          deleteAll={() => {
            updateParameter([], paramIndex)
          }}
          bind:colorManaging={colorManaging}
        />
      </div>
      <div class="col-3">
        <Button
          color="danger"
          on:click={() => { deleteParameter(paramIndex) }}
        >
          <TimesCircle />
        </Button>
      </div>
    </Row>
  {/each}
  <Row>
    <Col>
      <Button color="success" on:click={addParameter}>
        <PlusCircle />
        Add Parameter Value
      </Button>
    </Col>
  </Row>
</div>
