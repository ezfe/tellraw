<script lang="typescript">
  import { faFileAlt,faPlusCircle,faTimesCircle } from "@fortawesome/free-solid-svg-icons";
  import { Button,DropdownItem,DropdownMenu,DropdownToggle,Row,UncontrolledDropdown } from "sveltestrap";
  import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
  import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
  import { NBTSnippet } from "../classes/Snippets/SnippetTypes/NBTSnippet";
  import { PagebreakSnippet } from "../classes/Snippets/SnippetTypes/PagebreakSnippet";
  import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
  import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
  import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
  import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
  import { TranslateSnippet } from "../classes/Snippets/SnippetTypes/TranslateSnippet";
  import { CommandType,FeatureType,isFeatureAvailable,template_lookup } from "../data/templates";
  import { version } from "../persistence/stores";
  import Icon from "./generic/Icon.svelte";
import SnippetDetailController from "./SnippetControllers/DetailController/SnippetDetailController.svelte";
  import InlineSnippetController from "./SnippetControllers/InlineSnippetController.svelte";

  let editing: Snippet = null
  export let commandType: CommandType
  export let colorManaging: boolean
  export let snippets: Snippet[]
  export let updateSnippets: (newValue: Snippet[]) => void
  export let deleteAll: () => void

  function addSnippet(snippet: Snippet) {
    //if (/* || optionPressed*/) {
    updateSnippets([...snippets, snippet])
    //}
    // } else {
    // startEditing(snippet)
    // }
  }

  function startEditing(snippet: Snippet) {
    editing = snippet
  }

  function stopEditing(save: boolean) {
    if (save && editing !== null) {
      updateSnippet(editing)
    }

    editing = null
  }

  function updateSnippet(newSnippet: Snippet) {
    console.log("Updating", newSnippet)
    let isNewSnippet = true
    let updatedSnippets = snippets.map(currentSnippet => {
      if (currentSnippet.id === newSnippet.id) {
        isNewSnippet = false
        return newSnippet
      } else {
        return currentSnippet
      }
    })

    if (isNewSnippet) {
      updatedSnippets = [...snippets, newSnippet]
    }
    
    updateSnippets(updatedSnippets)
  }

  function newLinebreak() {
    updateSnippets([...snippets, new LinebreakSnippet(null)])
  }

  function newPagebreak() {
    updateSnippets([...snippets, new PagebreakSnippet(null)])
  }

  $: nbtStorageAvailable = isFeatureAvailable(commandType, $version, FeatureType.nbtComponent)
  $: pageBreakAvailalbe = isFeatureAvailable(commandType, $version, FeatureType.pages)
</script>

<div class="light-well">
  {#if editing}
    <SnippetDetailController
      {commandType}
      bind:snippet={editing}
      stopEditing={stopEditing}
      bind:colorManaging={colorManaging}
    />
  {:else}
    {#each snippets as snippet}
      <InlineSnippetController {snippet} {updateSnippet} bind:editing={editing} />
    {/each}

    <Row>
      <div class="col-sm-4 col-md-3 offset-sm-2 mb-2 mb-sm-0">
        <UncontrolledDropdown>
          <!-- this will be a controlled dropdown w/ a button toggle-->
          <DropdownToggle color="primary" block caret>
            <!-- tachometer-alt when option pressed-->
            <Icon icon={faPlusCircle} />
            Add Text
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem on:click={() => { addSnippet(new TextSnippet(null)) }}>
              Text
            </DropdownItem>
            <DropdownItem on:click={() => { addSnippet(new SelectorSnippet(null)) }}>
              Selector
            </DropdownItem>
            <DropdownItem on:click={() => { addSnippet(new ScoreboardObjectiveSnippet(null)) }}>
              Scoreboard Objective
            </DropdownItem>
            {#if nbtStorageAvailable}
              <DropdownItem on:click={() => { addSnippet(new NBTSnippet(null)) }}>
                NBT Storage
              </DropdownItem>
            {/if}
            <DropdownItem on:click={() => { addSnippet(new KeybindSnippet(null)) }}>
              Keybind
            </DropdownItem>
            <DropdownItem on:click={() => { addSnippet(new TranslateSnippet(null)) }}>
              Translation
            </DropdownItem>
            <DropdownItem on:click={newLinebreak}>
              Line Break ⏎
            </DropdownItem>
            {#if pageBreakAvailalbe}
              <DropdownItem on:click={newPagebreak}>
                New Page <Icon icon={faFileAlt} />
              </DropdownItem>
            {/if}
            <!-- fast edit tip -->
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <div class="col-sm-4 col-md-3">
        <Button block
                color="danger"
                on:click={deleteAll}>
          <Icon icon={faTimesCircle} />
          Delete All
        </Button>
      </div>
    </Row>
  {/if}
</div>