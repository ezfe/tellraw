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
</div>

<style>
  .preview {
    min-height: 300px;
    color: white;
  }
</style>