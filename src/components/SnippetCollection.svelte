<script lang="typescript">
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { Button,DropdownItem,DropdownMenu,DropdownToggle,Row,UncontrolledDropdown } from "sveltestrap";
  import { v4 as uuidv4 } from "uuid";
  import { GroupSnippet } from "../classes/Snippets/SnippetTypes/GroupSnippet";
  import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
  import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
  import { CommandType,FeatureType,isFeatureAvailable } from "../data/templates";
  import { duplicate_snippet } from "../helpers/duplicate_snippet";
  import { loadCurrentVersionState } from "../helpers/loaders";
  import PlusCircle from "./generic/Icons/PlusCircle.svelte";
  import TachometerAlt from "./generic/Icons/TachometerAlt.svelte";
  import TimesCircle from "./generic/Icons/TimesCircle.svelte";
  import LightWell from "./generic/LightWell.svelte";
  import InlineSnippetController from "./SnippetControllers/InlineSnippetController.svelte";

  let editing: Snippet = null
  let optionPressed = false
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
    snippets = loadCurrentVersionState(event.detail.items, false);
  }

  function handleDndFinalize(event) {
    console.log('Finalizing event', event)
    updateSnippets(loadCurrentVersionState(event.detail.items));
  }
</script>

<svelte:window on:keydown={keyDown} on:keyup={keyUp} />

<LightWell>
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
          <DropdownItem on:click={() => { addSnippet(new GroupSnippet(null)) }}>
            Snippet Group
          </DropdownItem>
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
</LightWell>
