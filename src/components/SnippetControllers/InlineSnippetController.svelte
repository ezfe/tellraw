<script lang="typescript">
  import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
  import { Col,Row } from "sveltestrap";
  import { LinebreakSnippet } from "../../classes/Snippets/SnippetTypes/LinebreakSnippet";
  import { NBTSnippet } from "../../classes/Snippets/SnippetTypes/NBTSnippet";
  import { PagebreakSnippet } from "../../classes/Snippets/SnippetTypes/PagebreakSnippet";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import { TranslateSnippet } from "../../classes/Snippets/SnippetTypes/TranslateSnippet";
  import Icon from "../generic/Icon.svelte";
import MinecraftColorWell from "../MinecraftColorWell.svelte";

  export let snippet: Snippet

  function editButtonClick(action: string) {
    // if (action == "start-editing") {
    //   props.startEditingSnippet(props.snippet)
    // } else if (action == "delete") {
    //   props.removeSnippet(props.snippet)
    // } else if (action == "duplicate") {
    //   props.duplicateSnippet(props.snippet)
    // } else {
      alert(`Failed to catch ${action}`)
    // }
  }

  $: editingEnabled = !(snippet instanceof LinebreakSnippet || snippet instanceof PagebreakSnippet)
  
</script>

<Row class="mb-2">
  <div class="col-4 col-md-3 col-lg-2 d-flex flex-column justify-content-center">
    <!-- <Button
          type="secondary" block
          icon="edit"
          disabled={!editingEnabled}
          onClick={() => {
            editButtonClick("start-editing")
          }}
          dropdowns={[
            {
              label: "Delete",
              icon: "trash-alt",
              onClick: () => {
                editButtonClick("delete")
              }
            },
            {
              label: "Duplicate",
              icon: "clone",
              onClick: () => {
                editButtonClick("duplicate")
              }
            }
          ]}              
        >
          Edit
        </Button> -->
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