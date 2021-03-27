<script lang="typescript">
  import { Button,Col,Row } from "sveltestrap";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import type { TranslateSnippet } from "../../classes/Snippets/SnippetTypes/TranslateSnippet";
  import type { CommandType } from "../../data/templates";
  import Edit from "../generic/Icons/Edit.svelte";
  import PlusCircle from "../generic/Icons/PlusCircle.svelte";
  import TrashAlt from "../generic/Icons/TrashAlt.svelte";
  import SplitDropdown from "../generic/SplitDropdown.svelte";
  import PreviewContents from "../Previews/PreviewContents.svelte";
  import SnippetCollection from "../SnippetCollection.svelte";

  export let snippet: TranslateSnippet
  export let commandType: CommandType
  export let colorManaging: boolean
  export let updateSnippet: (snippet: Snippet) => void

  let editing: number | null = null

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

  function startEditing(index: number) {
    editing = index;
  }
</script>

<Row class="mb-2">
  <Col>
    <input
      list="datalist-translations"
      class="form-control"
      placeholder="Translate identifier"
      value={snippet.translate}
      on:input={updateTranslate}
    />
  </Col>
</Row>
{#each snippet.parameters as param, paramIndex}
  <Row class="mb-1">
    <div class="col-4 col-md-3 col-lg-2 d-flex flex-column justify-content-center">
      <SplitDropdown
        color="secondary"
        block
        on:click={() => { startEditing(paramIndex) }}
        dropdowns={[
          {
            label: "Delete",
            icon: TrashAlt,
            onClick: () => {
              deleteParameter(paramIndex)
            },
          },
        ]}
      >
        <Edit />
        Edit
      </SplitDropdown>
    </div>

    {#if editing === paramIndex}
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
    {:else}
      <div class="col">
        <PreviewContents snippets={param} bookPage={null} />
      </div>
    {/if}
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
