<script lang="typescript">
  import { compile } from '../helpers/compile';
  import { snippets } from '../persistence/stores';
  import SnippetCollection from './SnippetCollection.svelte';

  $: compiled = compile($snippets)

  function clearAllSnippets() {
    const titleString = "Are you sure!?!"
    const bodyString = "Clicking Delete will remove all your text and reset it to an empty string."
    if (confirm(`${titleString}\n${bodyString}`)) {
      snippets.set([])
    }
  }
</script>

<div class="container">
  <SnippetCollection
    snippets={$snippets}
    updateSnippets={(newValue) => {
      snippets.set(newValue)
    }}
    deleteAll={clearAllSnippets}
  />

  <br />
  <br />
  <div class="row mb-2">
    <div class="col-3">
      <span style="font-weight: bold">Command</span>
      <br />
      <span>Copy and paste into Minecraft</span>
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

  <div class="row">
    <div class="col">
      <span style="color: grey; font-size: 10px;">
        <a href="https://ezekielelin.com/contact" target="_blank">Contact Me</a> | "Minecraft" content and materials are trademarks and copyrights of Mojang and its licensors. This site is not affiliated with Mojang.
      </span>
    </div>
  </div>
</div>

<style>
  .container {
    margin-top: 20px;
  }
</style>