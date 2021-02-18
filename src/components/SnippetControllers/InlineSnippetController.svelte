<script lang="typescript">
  import { Col,Row } from "sveltestrap";
  import { GroupSnippet } from "../../classes/Snippets/SnippetTypes/GroupSnippet";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";
  import { duplicate_snippet } from "../../helpers/duplicate_snippet";
  import SnippetCollection from "../SnippetCollection.svelte";
  import GenericSnippetController from "./GenericSnippetController.svelte";

  export let snippet: Snippet
  export let editing: Snippet
  export let updateSnippet: (snippet: Snippet) => void
  export let removeSnippet: (snippet: Snippet) => void
  export let duplicateSnippet: (snippet: Snippet) => void

  function changeGroupSnippetChildren(snippets: Array<Snippet>) {
    // TODO: Break this out into a new file so we don't need
    // to do stuff like "as GroupSnippet"
    let newSnippet = duplicate_snippet(snippet) as GroupSnippet
    newSnippet.children = snippets
    updateSnippet(newSnippet)
  }

  function startEditingSnippet() {
    editing = snippet
  }
</script>

<Row class="mb-2">
  <div class="col-3">
    <button on:click={() => { removeSnippet(snippet) }}>Delete</button>
    <button on:click={() => { duplicateSnippet(snippet) }}>Duplicate</button>
  </div>

  <!--
      Flex justification is for text fields
      which are used for page and linebreaks
    -->
  <Col style="display: flex; flex-direction: column; justify-content: center;">
    {#if snippet instanceof GroupSnippet}
      <div class="col">
        <div class="row">
          <div class="col inline-snippet-collection">
            <SnippetCollection
              snippets={snippet.children}
              updateSnippets={changeGroupSnippetChildren}
              deleteAll={() => {
                changeGroupSnippetChildren([])
              }}
            />
          </div>
        </div>
      </div>
    {:else if snippet instanceof TextSnippet}
      <!-- Generic Snippet will be nil if it's not a generic snippet -->
      <!-- by if-ing first, can assure it's not null -->
      <GenericSnippetController {snippet} {updateSnippet} />
    {:else}
      <span>{typeof snippet} isn't implemented :(S</span>
    {/if}
  </Col>
</Row>