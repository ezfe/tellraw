<script lang="typescript">
  import { Button,Col,FormGroup,Row } from "sveltestrap";
import { KeybindSnippet } from "../../classes/Snippets/SnippetTypes/KeybindSnippet";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";
  import type { TranslateSnippet } from "../../classes/Snippets/SnippetTypes/TranslateSnippet";
  import type { CommandType } from "../../data/templates";
  import Edit from "../generic/Icons/Edit.svelte";
  import PlusCircle from "../generic/Icons/PlusCircle.svelte";
  import TrashAlt from "../generic/Icons/TrashAlt.svelte";
  import SplitDropdown from "../generic/SplitDropdown.svelte";
  import PreviewContents from "../Previews/PreviewContents.svelte";
  import SnippetCollection from "../SnippetCollection.svelte";

  export let snippet: TranslateSnippet;
  export let commandType: CommandType;
  export let colorManaging: boolean;
  export let updateSnippet: (snippet: Snippet) => void;

  export let hideExteriorWrapper: boolean;
  let editing: number | null = null;

  let hideWrapper = false;

  let translationStringsPromise: Promise<{ [key: string]: string }> = fetch(
      'datafiles/translations.json',
    ).then(response => response.json());

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
    {#await translationStringsPromise then translationStrings}
      <datalist id="datalist-translations">
        {#each Object.keys(translationStrings) as suggestion}
          <option value={suggestion} />
        {/each}
      </datalist>
    {:catch error}
      <span>An error occurred downloading translation suggestions</span><br />
    {/await}
    <small id="translation-string-help">
      Choose a translation identifier (specified in Minecraft translation files) or
      type out a translation string directly.
      <a href="https://minecraft.fandom.com/wiki/Raw_JSON_text_format#Translated_Text" target="_">
        Read more
      </a>
    </small>
  </FormGroup>
  <FormGroup>
    <span class="label-like">Translation parameters</span>
    {#each snippet.parameters as param, paramIndex}
      <Row class="mb-1">
        <div class="col parameter-row">
          <div class="center-vertically flex-shrink-0">
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
              <Edit />
              Edit
            </SplitDropdown>
          </div>

          <div class="center-vertically flex-grow-1">
            <p class="mb-0">
              <PreviewContents snippets={param} bookPage={null} />
            </p>
          </div>
        </div>
      </Row>
    {/each}
    <Button color="success" on:click={addParameter}>
      <PlusCircle />
      Add Parameter
    </Button>
    <br />
    <small>
      Add new parameters to replace the placeholders (usually %s or similar) in the translation string.
      <a href="https://minecraft.fandom.com/wiki/Raw_JSON_text_format#Translated_Text" target="_">
        Read more
      </a>
    </small>
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