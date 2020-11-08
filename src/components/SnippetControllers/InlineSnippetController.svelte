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

  export let snippet: Snippet
  export let editing: Snippet

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
      <!-- <NBTSnippetController snippet={props.snippet} updateSnippet={props.updateSnippet} commandType={props.commandtype} version={props.version}/> -->
      <span>NBT Controller!</span>
    {:else if snippet instanceof TranslateSnippet}
      <span>Translation Snippet ({ snippet.translate }) - Click Edit to modify</span>
    {:else}
      Generic Controller
      <!-- <GenericSnippetController snippet={props.snippet} updateSnippet={props.updateSnippet} /> -->
      <!-- add this message to generic controller -->
      <!-- <span>{typeof props.snippet} isn't implemented</span> -->
    {/if}
  </Col>

  <div class="col-1">
    <MinecraftColorWell color={snippet.color} />
  </div>
</Row>