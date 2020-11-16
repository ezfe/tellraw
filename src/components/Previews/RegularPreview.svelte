<script lang="typescript">
  import { PagebreakSnippet } from "../../classes/Snippets/SnippetTypes/PagebreakSnippet";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import { previewBackgroundColor } from "../../persistence/stores";
  import PreviewContents from "./PreviewContents.svelte";


  export let snippets: Snippet[]

  let bookPage = 1

  $: pageCount = snippets.filter(s => { return s instanceof PagebreakSnippet }).length + 1
</script>

<div class="preview" style={`background-color: ${$previewBackgroundColor}`}>
  <PreviewContents {snippets} />
  <input class="preview-color-picker" type="color" bind:value={$previewBackgroundColor} />
</div>

<style>
.preview {
  min-height: 300px;
}
</style>