<script lang="typescript">
  import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
  import { Button } from 'sveltestrap';
  import type { Snippet } from '../../classes/Snippets/SnippetTypes/Snippet';
  import { CommandType,FeatureType,isFeatureAvailable } from '../../data/templates';
  import type { Version } from '../../helpers/versions';
  import { bookPreviewDisclaimerShown } from '../../persistence/stores';
  import Icon from '../generic/Icon.svelte';
  import BookPreview from './BookPreview.svelte';
  import RegularPreview from './RegularPreview.svelte';


  export let commandType: CommandType
  export let snippets: Snippet[]
  export let version: Version

  $: isBookPreview = isFeatureAvailable(commandType, version, FeatureType.bookPreview)  
  $: bookPreviewClass = isBookPreview  ? "d-flex align-items-center justify-content-center" : ""
</script>

<div class="row mb-2">
  <div class={`col-sm-10 col-md-8 offset-sm-2 ${bookPreviewClass}`}>
    {#if isBookPreview}
      <BookPreview {snippets} />
    {:else}
      <RegularPreview {snippets} />
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
        <Icon icon={faCheckCircle} />
        OK
      </Button>
    </div>
  </div>
{/if}
