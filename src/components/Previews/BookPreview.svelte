<script lang="typescript">
  import { Button } from "sveltestrap";
  import { PagebreakSnippet } from "../../classes/Snippets/SnippetTypes/PagebreakSnippet";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
import type { TranslationSet } from "../../helpers/translation_processor";
  import ArrowCircleLeft from "../generic/Icons/ArrowCircleLeft.svelte";
  import ArrowCircleRight from "../generic/Icons/ArrowCircleRight.svelte";
  import PreviewContents from "./PreviewContents.svelte";

  export let snippets: Snippet[];
  export let translationSet: TranslationSet;

  let bookPage = 1;

  $: pageCount = snippets.filter(s => { return s instanceof PagebreakSnippet }).length + 1;
</script>

<div>
  <Button style="width: 150px"
          color="light"
          icon="arrow-circle-left"
          disabled={bookPage <= 1}
          on:click={() => { bookPage -= 1 }}>
    <ArrowCircleLeft />
    Previous
  </Button>
</div>
<div class="preview book-preview ml-3 mr-3">
  <div class="format-wrapper">
    <PreviewContents {snippets} {bookPage} {translationSet} />
  </div>
</div>
<div>
  <Button style="width: 150px"
          color="light"
          disabled={bookPage >= pageCount}
          on:click={() => { bookPage += 1 }}>
    Next
    <ArrowCircleRight />
  </Button>
</div>

<style>
.format-wrapper {
  overflow-y: scroll;
  height: 100%;
  width: 100%;

  color: black;
}
</style>