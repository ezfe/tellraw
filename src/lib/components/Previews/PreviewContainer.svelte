<script lang="ts">
  import { Button } from 'sveltestrap';
  import type { Snippet } from '../../classes/Snippets/SnippetTypes/Snippet';
  import { CommandType,FeatureType,isFeatureAvailable } from '../../data/templates';
  import type { TranslationSet } from '../../helpers/translation_processor';
  import { bookPreviewDisclaimerShown,version } from '../../persistence/stores';
  import CheckCircle from '../generic/Icons/CheckCircle.svelte';
  import BookPreview from './BookPreview.svelte';
  import RegularPreview from './RegularPreview.svelte';

  export let snippets: Snippet[];
  export let commandType: CommandType;
  export let translationSet: TranslationSet;

  $: isBookPreview = isFeatureAvailable(commandType, $version, FeatureType.bookPreview)
  $: bookPreviewClass = isBookPreview  ? "d-flex align-items-center justify-content-center" : ""
</script>

<div class="row mb-2">
  <div class={`col-sm-10 col-md-8 offset-sm-2 ${bookPreviewClass}`}>
    {#if isBookPreview}
      <BookPreview {snippets} {translationSet} />
    {:else}
      <RegularPreview {snippets} {translationSet} />
    {/if}
  </div>
</div>
{#if isBookPreview && !bookPreviewDisclaimerShown}
  <div class="row mb-2">
    <div class="col-8 offset-2">
      <p>
        Please understand that it is difficult for me to
        replicate the same text size and wrapping behavior as in regular Minecraft.
      </p>
      <p>
        You should verify that it looks correct from time-to-time in-game as well,
        as some text may not fit when it appears as though it will here!
      </p>
      <Button color="info" on:click={() => { bookPreviewDisclaimerShown.set(true) }}>
        <CheckCircle />
        OK
      </Button>
    </div>
  </div>
{/if}
