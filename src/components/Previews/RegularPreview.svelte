<script lang="typescript">
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import { previewBackgroundColor } from "../../persistence/stores";
  import PreviewContents from "./PreviewContents.svelte";

  export let snippets: Snippet[]
</script>

<div class="preview" style={`background-color: ${$previewBackgroundColor}`}>
  <PreviewContents {snippets} bookPage={null} />
  <input class="preview-color-picker" type="color" bind:value={$previewBackgroundColor} />
</div>

<style>
  .preview {
    min-height: 300px;
  }
  .preview-color-picker {
    position: absolute;
    right: 20px;
    bottom: 5px;
  }
</style>