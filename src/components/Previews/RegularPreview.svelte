<script lang="ts">
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
import type { TranslationSet } from "../../helpers/translation_processor";
  import { previewBackgroundColor } from "../../persistence/stores";
  import PreviewContents from "./PreviewContents.svelte";

  export let snippets: Snippet[];
  export let translationSet: TranslationSet;
</script>

<div class="preview" style={`background-color: ${$previewBackgroundColor}`}>
  <PreviewContents {snippets} bookPage={null} {translationSet} />
  <input class="preview-color-picker" type="color" bind:value={$previewBackgroundColor} />
</div>

<style>
  .preview {
    min-height: 300px;

    color: black;
  }
  .preview-color-picker {
    position: absolute;
    right: 20px;
    bottom: 5px;
  }
</style>