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

  export let nestedEditing: boolean
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
    nestedEditing = true;
  }

  function stopEditing() {
    editing = null;
    nestedEditing = false;
  }
</script>

{#if editing !== null}
  <SnippetCollection
    commandType={commandType}
    snippets={snippet.parameters[editing]}
    updateSnippets={(snippets) => {
      updateParameter(snippets, editing)
    }}
    deleteAll={() => {
      updateParameter([], editing)
    }}
    bind:colorManaging={colorManaging}
  />
  <Row>
    <Col>
      <Button color="primary" on:click={stopEditing}>
        <PlusCircle />
        Stop Editing
      </Button>
    </Col>
  </Row>
{:else}
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
      <div class="col parameter-row">
        <div class="center-vertically flex-shrink-0">
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

        <div class="center-vertically flex-grow-1">
          <p>
            <PreviewContents snippets={param} bookPage={null} />
          </p>
        </div>
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
{/if}

<style>
  .parameter-row {
    display: flex;
    gap: 30px;
  }

  .center-vertically {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>