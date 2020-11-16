<script lang="typescript">
  import { faArrowCircleLeft,faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
  import { Button } from "sveltestrap";
  import { PagebreakSnippet } from "../../classes/Snippets/SnippetTypes/PagebreakSnippet";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import Icon from "../generic/Icon.svelte";

  export let snippets: Snippet[]
  let bookPage = 1

  $: pageCount = snippets.filter(s => { return s instanceof PagebreakSnippet }).length + 1
</script>

<div>
  <Button style="width: 150px"
          color="light"
          icon="arrow-circle-left"
          disabled={bookPage <= 1}
          onClick={() => { bookPage -= 1 }}>
    <Icon icon={faArrowCircleLeft} />
    Previous
  </Button>
</div>
<div class="preview book-preview ml-3 mr-3">
  <div class="format-wrapper">
    { formatSnippets(snippets, bookPage) }
  </div>
</div>
<div>
  <Button style="width: 150px"
          color="light"
          disabled={bookPage >= pageCount}
          onClick={() => { bookPage += 1 }}>
    <Icon icon={faArrowCircleRight} />
    Next
  </Button>
</div>

<style>
.format-wrapper {
  overflow-y: scroll;
  height: 100%;
  width: 100%;
}
</style>