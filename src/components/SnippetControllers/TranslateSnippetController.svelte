<script lang="typescript">
  import { Button,FormGroup,Row } from "sveltestrap";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";
  import type { TranslateSnippet } from "../../classes/Snippets/SnippetTypes/TranslateSnippet";
  import type { CommandType } from "../../data/templates";
  import { countParameters,TranslationSet } from "../../helpers/translation_processor";
  import PlusCircle from "../generic/Icons/PlusCircle.svelte";
  import TrashAlt from "../generic/Icons/TrashAlt.svelte";
  import SplitDropdown from "../generic/SplitDropdown.svelte";
  import PreviewContents from "../Previews/PreviewContents.svelte";
  import SnippetCollection from "../SnippetCollection.svelte";

  export let snippet: TranslateSnippet;
  export let commandType: CommandType;
  export let colorManaging: boolean;
  export let translationSet: TranslationSet;
  export let updateSnippet: (snippet: Snippet) => void;

  export let hideExteriorWrapper: boolean;
  let editing: number | null = null;

  let hideWrapper = false;

  $: targetParameterCount = countParameters(snippet.translate, translationSet);
  $: slicedParameters = snippet.parameters; // snippet.parameters.slice(0, targetParameterCount);
  $: {
    if (snippet.parameters.length < targetParameterCount) {
      const newSnippet = snippet.copy();

      while (newSnippet.parameters.length < targetParameterCount) {
        const ts = new TextSnippet(null);
        ts.text = "Click \"Edit\" to modify this parameter"
        newSnippet.parameters.push([ts]);
      }

      updateSnippet(newSnippet);
    } else if (slicedParameters.length < snippet.parameters.length) {
      // Don't shorten array when manual parameter management is enabled
      const newSnippet = snippet.copy();
      newSnippet.parameters = slicedParameters;
      updateSnippet(newSnippet);
    }
  }

  function updateTranslate(event) {
    const newSnippet = snippet.copy();
    newSnippet.translate = event.target.value;
    updateSnippet(newSnippet);
  }

  function updateParameter(newParameter: Snippet[], index: number) {
    const newSnippet = snippet.copy();
    newSnippet.parameters[index] = newParameter;
    updateSnippet(newSnippet);
  }

  function addParameter() {
    const newSnippet = snippet.copy();

    const ts = new TextSnippet(null);
    ts.text = "Click \"Edit\" to modify this parameter"
    newSnippet.parameters.push([ts]);
    updateSnippet(newSnippet);
  }

  function deleteParameter(index: number) {
    const newSnippet = snippet.copy();
    newSnippet.parameters.splice(index, 1);
    updateSnippet(newSnippet);
  }

  function startEditing(index: number) {
    editing = index;
    hideExteriorWrapper = true;
  }

  function stopEditing() {
    editing = null;
    hideExteriorWrapper = false;
  }
</script>

{#if editing !== null}
  <SnippetCollection
    commandType={commandType}
    snippets={snippet.parameters[editing]}
    updateSnippets={(snippets) => {
      updateParameter(snippets, editing)
    }}
    deleteAll={() => {
      updateParameter([], editing)
    }}
    {translationSet}
    bind:colorManaging={colorManaging}
    bind:hideExteriorWrapper={hideWrapper}
  />
  {#if !hideWrapper}
    <Row>
      <div class="offset-9 col-3">
        <Button color="primary" block on:click={stopEditing}>
          Save Parameter
        </Button>
      </div>
    </Row>
  {/if}
{:else}
  <FormGroup>
    <label for="translation-string-input">Translation string</label>
    <input
      class="form-control"
      id="translation-string-input"
      value={snippet.translate}
      list="datalist-translations"
      on:input={updateTranslate}
    />
    <small id="translation-string-help">
      Choose a translation identifier (specified in Minecraft translation files) or
      type out a translation string directly.
      <a href="https://minecraft.fandom.com/wiki/Raw_JSON_text_format#Translated_Text" target="_">
        Read more
      </a>
    </small>
  </FormGroup>
  <FormGroup>
    {#if snippet.parameters.length > 0}
      <span class="label-like">Translation parameters</span>
    {/if}
    {#each slicedParameters as param, paramIndex}
      <Row class="mb-1">
        <div class="col parameter-row">
          <div class="center-vertically flex-shrink-0">
            {#if (paramIndex + 1) <= targetParameterCount}
              <Button color="secondary" block on:click={() => { startEditing(paramIndex) }}>
                Edit
              </Button>
            {:else}
              <SplitDropdown
                color="secondary"
                block
                on:click={() => { startEditing(paramIndex) }}
                dropdowns={[
                  {
                    label: "Delete",
                    icon: TrashAlt,
                    onClick: () => {
                      deleteParameter(paramIndex)
                    },
                  },
                ]}
              >
                Edit
              </SplitDropdown>
            {/if}
          </div>

          <div class="center-vertically flex-grow-1">
            <p class="mb-0">
              <PreviewContents snippets={param} bookPage={null} {translationSet} />
            </p>
          </div>
        </div>
      </Row>
    {/each}
    {#if targetParameterCount > 0}
      <small>Each entry corresponds to a placeholder (%s) in your translation string above.</small>
    {/if}
  </FormGroup>
  <FormGroup>
    <Button color="success" on:click={addParameter}>
      <PlusCircle />
      Add Parameter
    </Button>
    <br />
    <small>If you need to add more parameters than were automatically detected, click this button.</small>
  </FormGroup>
{/if}

<style>
  .parameter-row {
    display: flex;
    gap: 30px;
  }

  .center-vertically {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .label-like {
    display: inline-block;
    margin-bottom: .5rem;
  }
</style>