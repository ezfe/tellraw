<script lang="typescript">
  import { previewBackgroundColor } from "../../persistence/stores"

  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";

  export let snippets: Snippet[]

  let bookPage = 1

  $: pageCount = snippets.filter(s => { return s instanceof PagebreakSnippet }).length + 1
</script>

<div class="preview" style={`background-color: ${$previewBackgroundColor}`}>
  { formatSnippets(snippets) }
  <input class="preview-color-picker" type="color" bind:value={$previewBackgroundColor} />
</div>

<style>
.preview {
  min-height: 300px;
}
</style>