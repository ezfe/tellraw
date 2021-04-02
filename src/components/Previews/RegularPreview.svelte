<script lang="typescript">
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
import type { TranslationSet } from "../../helpers/translation_processor";
  import { previewBackgroundColor } from "../../persistence/stores";
  import PreviewContents from "./PreviewContents.svelte";

  export let snippets: Snippet[];
  export let translationSet: TranslationSet;
</script>

<div class="preview" style={`--background-color: ${$previewBackgroundColor};`}>
  <div class="content-wrapper">
    <PreviewContents {snippets} bookPage={null} {translationSet} />
  </div>
  <div class="control-lane" style={`--background-color: ${$previewBackgroundColor};`}>
    <label>Background Color:</label>
    <input class="preview-color-picker" type="color" bind:value={$previewBackgroundColor} />
  </div>
</div>

<style>
  .preview {
    background-color: var(--background-color);
    min-height: 300px;
    
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .content-wrapper {
    padding: 10px;

    color: black;
  }
  
  .control-lane {
    -webkit-backdrop-filter: brightness(80%);
    backdrop-filter: brightness(80%);

    padding: 10px;
    display: flex;
    align-items: center;
  }
</style>
