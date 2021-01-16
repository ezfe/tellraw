<script lang="typescript">
  import { Col,Row } from "sveltestrap";
  import { genericSnippet } from "../../classes/Snippets/SnippetTypes/GenericFieldCompatable";
  import { LinebreakSnippet } from "../../classes/Snippets/SnippetTypes/LinebreakSnippet";
  import { NBTSnippet } from "../../classes/Snippets/SnippetTypes/NBTSnippet";
  import { PagebreakSnippet } from "../../classes/Snippets/SnippetTypes/PagebreakSnippet";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import { TranslateSnippet } from "../../classes/Snippets/SnippetTypes/TranslateSnippet";
  import Clone from "../generic/Icons/Clone.svelte";
  import Edit from "../generic/Icons/Edit.svelte";
  import FileAlt from "../generic/Icons/FileAlt.svelte";
  import TrashAlt from "../generic/Icons/TrashAlt.svelte";
  import SplitDropdown from "../generic/SplitDropdown.svelte";
  import MinecraftColorWell from "../MinecraftColorWell.svelte";
  import GenericSnippetController from "./GenericSnippetController.svelte";
  import NbtSnippetController from "./NBTSnippetController.svelte";

  export let snippet: Snippet
  export let editing: Snippet
  export let updateSnippet: (snippet: Snippet) => void
  export let removeSnippet: (snippet: Snippet) => void
  export let duplicateSnippet: (snippet: Snippet) => void

  function startEditingSnippet() {
    editing = snippet
  }

  $: editingEnabled = !(snippet instanceof LinebreakSnippet || snippet instanceof PagebreakSnippet)
</script>

<Row class="mb-2">
  <div class="col-4 col-md-3 col-lg-2 d-flex flex-column justify-content-center">
    <SplitDropdown
      color="secondary"
      disabled={!editingEnabled}
      block
      on:click={() => { startEditingSnippet() }}
      dropdowns={[
        {
          label: "Delete",
          icon: TrashAlt,
          onClick: () => {
            removeSnippet(snippet)
          }
        },
        {
          label: "Duplicate",
          icon: Clone,
          onClick: () => {
            duplicateSnippet(snippet)
          }
        }
      ]} 
    >
      <Edit />
      Edit
    </SplitDropdown>
  </div>

  <!--
      Flex justification is for text fields
      which are used for page and linebreaks
    -->
  <Col style="display: flex; flex-direction: column; justify-content: center;">
    {#if snippet instanceof LinebreakSnippet}
      <span>Line Break ⏎</span>
    {:else if snippet instanceof PagebreakSnippet}
      <span>Page Break <FileAlt /></span>
    {:else if snippet instanceof NBTSnippet}
      <NbtSnippetController {snippet} {updateSnippet} />
    {:else if snippet instanceof TranslateSnippet}
      <span>Translation Snippet ({ snippet.translate }) - Click Edit to modify</span>
    {:else if genericSnippet(snippet)}
      <!-- Generic Snippet will be nil if it's not a generic snippet -->
      <!-- by if-ing first, can assure it's not null -->
      <GenericSnippetController snippet={genericSnippet(snippet)} {updateSnippet} />
    {:else}
      <span>{typeof snippet} isn't implemented</span>
    {/if}
  </Col>

  <div class="col-1">
    <MinecraftColorWell color={snippet.color} />
  </div>
</Row>