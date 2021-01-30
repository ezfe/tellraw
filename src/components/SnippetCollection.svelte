<script lang="typescript">
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { Button,DropdownItem,DropdownMenu,DropdownToggle,Row,UncontrolledDropdown } from "sveltestrap";
  import { v4 as uuidv4 } from "uuid";
  import { KeybindSnippet } from "../classes/Snippets/SnippetTypes/KeybindSnippet";
  import { LinebreakSnippet } from "../classes/Snippets/SnippetTypes/LinebreakSnippet";
  import { NBTSnippet } from "../classes/Snippets/SnippetTypes/NBTSnippet";
  import { PagebreakSnippet } from "../classes/Snippets/SnippetTypes/PagebreakSnippet";
  import { ScoreboardObjectiveSnippet } from "../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
  import { SelectorSnippet } from "../classes/Snippets/SnippetTypes/SelectorSnippet";
  import { GroupSnippet } from "../classes/Snippets/SnippetTypes/GroupSnippet";
  import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
  import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
  import { TranslateSnippet } from "../classes/Snippets/SnippetTypes/TranslateSnippet";
  import { CommandType,FeatureType,isFeatureAvailable } from "../data/templates";
  import { duplicate_snippet } from "../helpers/duplicate_snippet";
  import { loadCurrentVersionState } from "../helpers/loaders";
  import { fastEditTipShown,version } from "../persistence/stores";
  import FileAlt from "./generic/Icons/FileAlt.svelte";
  import PlusCircle from "./generic/Icons/PlusCircle.svelte";
  import TachometerAlt from "./generic/Icons/TachometerAlt.svelte";
  import TimesCircle from "./generic/Icons/TimesCircle.svelte";
  import LightWell from "./generic/LightWell.svelte";
  import SnippetDetailController from "./SnippetControllers/DetailController/SnippetDetailController.svelte";
  import InlineSnippetController from "./SnippetControllers/InlineSnippetController.svelte";

  let editing: Snippet = null
  let optionPressed = false
  export let commandType: CommandType
  export let colorManaging: boolean
  export let snippets: Snippet[]
  export let updateSnippets: (newValue: Snippet[]) => void
  export let deleteAll: () => void

  /**
   * Add a new snippet to the list.
   *
   * - If `option` is pressed, the snippet is added immediately
   * - If `option` is not pressed, the snippet is not saved, but
   *   starts being edited. It is added when the edit form is completed.
   * @param snippet
   */
  function addSnippet(snippet: Snippet) {
    if (optionPressed) {
      updateSnippets([...snippets, snippet])
    } else {
      startEditing(snippet)
    }
  }

  /**
   * Start editing a specific snippet
   * @param snippet The snippet to edit
   */
  function startEditing(snippet: Snippet) {
    editing = snippet
  }

  /**
   * Stop editing the current snippet.
   * @param save Whether to save or discard the current edits
   */
  function stopEditing(save: boolean) {
    if (save && editing !== null) {
      updateSnippet(editing)
    }

    editing = null
  }

  /**
   * Save a new copy of a snippet. The snippet can be
   * new, or could already exist.
   *
   * - New snippets are appended to the end of the set
   * - Existing snippets are replaced
   *
   * @param newSnippet The snippet to insert or replace
   */
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

  /**
   * Remove a snippet and call `updateSnippets` to
   * save the new snippet set.
   * @param snippet The snippet to delete
   */
  function removeSnippet(snippet: Snippet) {
    updateSnippets(snippets.filter(cs => cs.id !== snippet.id))
  }

  /**
   * Duplicate a snippet and call `updateSnippets` to
   * save the new snippet set.
   * @param snippet The snippet to duplicate
   */
  function duplicateSnippet(snippet: Snippet) {
    let now = [...snippets]
    let newSnippet = duplicate_snippet(snippet)
    newSnippet.id = uuidv4()

    let i = now.indexOf(snippet);
    now.splice(i, 0, newSnippet);

    updateSnippets(now);
  }

  function newLinebreak() {
    updateSnippets([...snippets, new LinebreakSnippet(null)])
  }

  function newPagebreak() {
    updateSnippets([...snippets, new PagebreakSnippet(null)])
  }

  function hideFastEditTip() {
    fastEditTipShown.set(false)
  }

  function keyDown(event) {
    if (event.key === "Alt" || event.keyCode === 18) {
      optionPressed = true;
    }
  }

  function keyUp(event) {
    if (event.key === "Alt" || event.keyCode === 18) {
      optionPressed = false;
    }
  }

  function handleDndConsider(event) {
    console.log('Considering event', event)
    updateSnippets(loadCurrentVersionState(event.detail.items));
  }

  function handleDndFinalize(event) {
    console.log('Finalizing event', event)
    updateSnippets(loadCurrentVersionState(event.detail.items));
  }

  $: nbtStorageAvailable = isFeatureAvailable(commandType, $version, FeatureType.nbtComponent)
  $: pageBreakAvailalbe = isFeatureAvailable(commandType, $version, FeatureType.pages)
</script>

<svelte:window on:keydown={keyDown} on:keyup={keyUp} />

<LightWell>
  {#if editing}
    <SnippetDetailController
      {commandType}
      bind:snippet={editing}
      stopEditing={stopEditing}
      bind:colorManaging={colorManaging}
    />
  {:else}
    <section use:dndzone={{items: snippets, flipDurationMs: 300}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
      {#each snippets as snippet(snippet.id)}
        <div animate:flip={{ duration: 300 }}>
          <InlineSnippetController {snippet} {updateSnippet} {removeSnippet} {duplicateSnippet} bind:editing={editing} />
        </div>
      {/each}
    </section>

    <Row>
      <div class="col-sm-4 col-md-3 offset-sm-2 mb-2 mb-sm-0">
        <UncontrolledDropdown>
          <!-- this will be a controlled dropdown w/ a button toggle-->
          <DropdownToggle color="primary" block caret>
            {#if optionPressed}
              <TachometerAlt />
            {:else}
              <PlusCircle />
            {/if}
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
            <DropdownItem on:click={() => { addSnippet(new GroupSnippet(null)) }}>
              Snippet Group
            </DropdownItem>
            <DropdownItem on:click={newLinebreak}>
              Line Break ⏎
            </DropdownItem>
            {#if pageBreakAvailalbe}
              <DropdownItem on:click={newPagebreak}>
                New Page <FileAlt />
              </DropdownItem>
            {/if}
            {#if $fastEditTipShown}
              <div class="dropdown-divider"></div>
              <p class="text-muted pl-4 pr-4 mb-0 d-flex justify-content-between align-items-center">
                Hold option to add without editing
                <Button color="danger" size="sm" outline on:click={hideFastEditTip}>
                  OK
                </Button>
                <!-- <button className="btn btn-sm btn-outline-danger" onClick={}>OK</button> -->
              </p>
            {/if}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <div class="col-sm-4 col-md-3">
        <Button block
                color="danger"
                on:click={deleteAll}>
          <TimesCircle />
          Delete All
        </Button>
      </div>
    </Row>
  {/if}
</LightWell>
