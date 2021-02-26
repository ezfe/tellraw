<script lang="typescript">
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { Col,Row } from "sveltestrap";
  import { v4 as uuidv4 } from "uuid";
  import { GroupSnippet } from "../classes/Snippets/SnippetTypes/GroupSnippet";
  import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
  import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
  import { duplicate_snippet } from "../helpers/duplicate_snippet";
  import { loadCurrentVersionState } from "../helpers/loaders";
  import LightWell from "./generic/LightWell.svelte";
  import InlineSnippetController from "./SnippetControllers/InlineSnippetController.svelte";

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
    updateSnippets([...snippets, snippet])
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

  function handleDndConsider(event) {
    console.log('Considering event', event)
    snippets = loadCurrentVersionState(event.detail.items, false);
  }

  function handleDndFinalize(event) {
    console.log('Finalizing event', event)
    snippets = loadCurrentVersionState(event.detail.items, false);
    updateSnippets(snippets)
  }
</script>

<LightWell>
  <section use:dndzone={{items: snippets, flipDurationMs: 300}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
    {#each snippets as snippet(snippet.id)}
      <div animate:flip={{ duration: 300 }}>
        <InlineSnippetController {snippet} {updateSnippet} {removeSnippet} {duplicateSnippet} />
      </div>
    {/each}
  </section>

  <Row>
    <Col>
      <button on:click={() => { addSnippet(new TextSnippet(null)) }}>+ Text</button>
    </Col>
    <Col>
      <button on:click={() => { addSnippet(new GroupSnippet(null)) }}>+ Group</button>
    </Col>
    <Col>
      <button on:click={deleteAll}>x Delete All</button>
    </Col>
  </Row>
</LightWell>
