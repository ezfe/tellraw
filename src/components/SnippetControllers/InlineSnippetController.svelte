<script lang="typescript">
  import { faClone,faEdit,faFileAlt,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
  import { Col,Row } from "sveltestrap";
  import { v4 as uuidv4 } from "uuid";
  import { LinebreakSnippet } from "../../classes/Snippets/SnippetTypes/LinebreakSnippet";
  import { NBTSnippet } from "../../classes/Snippets/SnippetTypes/NBTSnippet";
  import { PagebreakSnippet } from "../../classes/Snippets/SnippetTypes/PagebreakSnippet";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import { TranslateSnippet } from "../../classes/Snippets/SnippetTypes/TranslateSnippet";
  import { duplicate_snippet } from "../../helpers/copy_snippet";
  import { snippets } from "../../persistence/stores";
  import Icon from "../generic/Icon.svelte";
  import SplitDropdown from "../generic/SplitDropdown.svelte";
  import MinecraftColorWell from "../MinecraftColorWell.svelte";
  import GenericSnippetController from "./GenericSnippetController.svelte";
  import NbtSnippetController from "./NBTSnippetController.svelte";
  import type { GenericFieldCompatable } from "../../classes/Snippets/SnippetTypes/GenericFieldCompatable"
import { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";
import { SelectorSnippet } from "../../classes/Snippets/SnippetTypes/SelectorSnippet";
import { KeybindSnippet } from "../../classes/Snippets/SnippetTypes/KeybindSnippet";
import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";

  export let snippet: Snippet
  export let editing: Snippet
  export let updateSnippet: (snippet: Snippet) => void

  function removeSnippet() {
    let filtered = $snippets.filter(cs => cs.id !== snippet.id)
    snippets.set(filtered)
  }
  
  function duplicateSnippet() {
    let now = [...$snippets]
    let newSnippet = duplicate_snippet(snippet)
    newSnippet.id = uuidv4()

    let i = now.indexOf(snippet);
    now.splice(i, 0, newSnippet);

    snippets.set(now);
  }

  function startEditingSnippet() {
    editing = snippet
  }

  $: editingEnabled = !(snippet instanceof LinebreakSnippet || snippet instanceof PagebreakSnippet)
  
  function genericSnippet(): GenericFieldCompatable {
    if (
      snippet instanceof ScoreboardObjectiveSnippet
      || snippet instanceof KeybindSnippet
      || snippet instanceof SelectorSnippet
      || snippet instanceof TextSnippet
      || snippet instanceof TranslateSnippet
    ) {
      return snippet
    } else {
      return null
    }
  }
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
          icon: faTrashAlt,
          onClick: () => {
            removeSnippet()
          }
        },
        {
          label: "Duplicate",
          icon: faClone,
          onClick: () => {
            duplicateSnippet()
          }
        }
      ]} 
    >
      <Icon icon={faEdit} />
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
      <span>Page Break <Icon icon={faFileAlt} /></span>
    {:else if snippet instanceof NBTSnippet}
      <NbtSnippetController {snippet} {updateSnippet} />
    {:else if snippet instanceof TranslateSnippet}
      <span>Translation Snippet ({ snippet.translate }) - Click Edit to modify</span>
    {:else if genericSnippet()}
      <!-- Generic Snippet will be nil if it's not a generic snippet -->
      <!-- by if-ing first, can assure it's not null -->
      <GenericSnippetController snippet={genericSnippet()} {updateSnippet} />
    {:else}
      <span>{typeof snippet} isn't implemented</span>
    {/if}
  </Col>

  <div class="col-1">
    <MinecraftColorWell color={snippet.color} />
  </div>
</Row>