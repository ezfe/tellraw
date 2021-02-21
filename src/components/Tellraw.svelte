<script lang="typescript">
import type { Snippet } from '../classes/Snippets/SnippetTypes/Snippet';

  import { compile } from '../helpers/compile';
  import SnippetCollection from './SnippetCollection.svelte';

  let snippets: Snippet[] = []
  $: compiled = compile(snippets)

  function clearAllSnippets() {
    const titleString = "Are you sure!?!"
    const bodyString = "Clicking Delete will remove all your text and reset it to an empty string."
    if (confirm(`${titleString}\n${bodyString}`)) {
      snippets = []
    }
  }
</script>

<div class="container">
  <SnippetCollection
    {snippets}
    updateSnippets={newValue => { snippets = newValue }}
    deleteAll={clearAllSnippets}
  />

  <br />
  <br />
  <div class="row mb-2">
    <div class="col-3">
      <span style="font-weight: bold">Command</span>
    </div>
    <div class="col">
      <textarea readOnly={true}
                class="form-control"
                onClick={(event) => {
                  event.currentTarget.select()
                }}
                value={compiled} />
    </div>
  </div>
</div>

<style>
  .container {
    margin-top: 20px;
  }
</style>