<script lang="ts">
  import { Button,Row } from 'sveltestrap';
  import { TextSnippet } from '../classes/Snippets/SnippetTypes/TextSnippet';
  import { CommandType,template_lookup } from '../data/templates';
  import { compile } from '../helpers/compile';
  import { export_snippets } from '../helpers/export';
import type { TranslationSet } from '../helpers/translation_processor';
  import { command,commandType,customColors,snippets,version } from '../persistence/stores';
  import SiteActions from './buttons/SiteActions.svelte';
  import CommandTemplatesController from './CommandTemplatesController.svelte';
  import Datalist from './Datalist.svelte';
  import CheckCircle from './generic/Icons/CheckCircle.svelte';
  import ExclamationTriangle from './generic/Icons/ExclamationTriangle.svelte';
  import FileExport from './generic/Icons/FileExport.svelte';
  import FileImport from './generic/Icons/FileImport.svelte';
  import LightWell from './generic/LightWell.svelte';
  import Importing from './Importing.svelte';
  import PreviewContainer from './Previews/PreviewContainer.svelte';
  import SnippetCollection from './SnippetCollection.svelte';

  let exporting = false;
  let importing = false;

  let colorManaging = false;
  let hideWrapper = false;

  let translationSet: TranslationSet = {};

  $: compiled = compile($snippets, $command, $commandType, $version);

  function clearAllSnippets() {
    const titleString = "Are you sure!?!"
    const bodyString = "Clicking Delete will remove all your text and reset it to an empty string."
    if (confirm(`${titleString}\n${bodyString}`)) {
      snippets.set([])
      commandType.set(CommandType.tellraw)
      command.set(template_lookup($commandType)[0])
    }
  }

  function startImporting() {
    importing = true
  }

  function startExporting() {
    exporting = true
  }

  function updateTranslationSet(newContents: any) {
    if (newContents.constructor == Object) {
      translationSet = newContents;
    } else {
      console.error('Received non-object translation set', newContents);
    }
  }

  function speedtest() {
    let arr = [];
    for (var i = 0; i < 10000; i++) {
      arr.push(new TextSnippet(null));
    }
    snippets.set(arr);
  }
</script>

<div class="container">
  {#if importing}
    <Importing bind:importing={importing} />
  {:else if exporting}
    <Row>
      <div class="col-md-6 offset-md-3 text-center">
        <LightWell>
          <p class="mb-3">
            Click below to copy the exported command string. Store it in a safe place
            to import back onto the site in the future.
          </p>
          <textarea readOnly={true}
                    class="form-control mb-3"
                    on:click={(event) => {
                      event.currentTarget.select()
                    }}
                    value={ export_snippets($snippets, $command, $commandType) } />
          <Button color="success" on:click={() => { exporting = false }}>
            <CheckCircle />
            Done
          </Button>
        </LightWell>
      </div>
    </Row>
  {:else if colorManaging}
    <!-- <ColorManager customColors={[]}
                setCustomColors={(customColors: Color[]) => { setCustomColors(customColors) }}
                setColorManaging={(newValue: boolean) => { setColorManaging(newValue) }} /> -->
    <ul>
      {#each $customColors as color}
        <li>{color}</li>
      {/each}
    </ul>
  {:else}
    <div class="row">
      <div class="col-sm-8 col-md mb-2">
        <h4>Tellraw Generator for Minecraft</h4>
      </div>
      <div class="col-sm-5 mb-2">
        <div class="btn-toolbar d-flex justify-content-end"
              role="toolbar"
              aria-label="Toolbar with button groups">
          <Button size="sm" color="danger" href="https://github.com/ezfe/tellraw/issues/new" target="_">
            <ExclamationTriangle /> Report an Issue
          </Button>
          <SiteActions />
        </div>
      </div>
    </div>

    {#if !hideWrapper}
      <Row>
        <div class="col-sm-5 col-md-3 mb-2" id="command-label">
          <span style="font-weight: bold;">Command Template</span>
          <br />
          <span>Used to select and execute different players</span>
        </div>
        <div class="col-sm mb-4">
          <input bind:value={$command}
                  type="text"
                  class="form-control"
                  aria-labelledby="command-label" />
        </div>
      </Row>
    {/if}

    <CommandTemplatesController />

    <div class:mb-2={hideWrapper}>
      <LightWell>
        <SnippetCollection
          snippets={$snippets}
          updateSnippets={(newValue) => {
            snippets.set(newValue)
          }}
          deleteAll={clearAllSnippets}
          bind:commandType={$commandType}
          bind:colorManaging={colorManaging}
          {translationSet}
          bind:hideExteriorWrapper={hideWrapper}
        />
      </LightWell>
    </div>

    {#if !hideWrapper}
      <br />
      <br />
      <div class="row mb-2">
        <div class="col-3">
          <span style="font-weight: bold">Command</span>
          <br />
          <span>Copy and paste into Minecraft</span>
        </div>
        <div class="col">
          <textarea readOnly={true}
                    class="form-control"
                    onClick={(event) => {
                      event.currentTarget.select()
                    }}
                    value={compiled} />
        </div>
      </div>

      <PreviewContainer snippets={$snippets} commandType={$commandType} {translationSet} />

      <hr />

      <div class="row">
        <div class="col-3">
          <span style="font-weight: bold;">Save and Restore</span>
        </div>
        <div class="col-sm-2 mb-2">
          <Button color="light" block on:click={startImporting}>
            <FileImport /> Import
          </Button>
        </div>
        <div class="col-sm-2 mb-2">
          <Button color="light" block on:click={startExporting}>
            <FileExport /> Export
          </Button>
        </div>
        <div class="col mb-2">
          <span>
            Export your command and save in a text file, so that you can
            get easily get it back. Some browsers reset their cache
            periodically and will forget what you've entered if you don't
            save it by clicking Export.
          </span>
        </div>
      </div>

      <hr />
    {/if}

    <Row>
      <div class="col-3">
        <span style="font-weight: bold">Settings</span>
      </div>
      <div class="col-3">
        <div class="form-group">
          <label for="versionSelect">Minecraft Version Compatibility:</label>
          <select class="custom-select" bind:value={$version} id="versionSelect">
            <option value="1.13">1.13</option>
            <option value="1.14">1.14</option>
            <option value="1.15">1.15</option>
            <option value="1.16">1.16 (Current Version)</option>
          </select>
        </div>
      </div>
    </Row>

    <hr />

    <div class="row">
      <div class="col">
        <span style="color: grey; font-size: 10px;">
          <a href="https://ezekielelin.com/contact" target="_blank">Contact Me</a> | "Minecraft" content and materials are trademarks and copyrights of Mojang and its licensors. This site is not affiliated with Mojang.
        </span>
        <button on:click={speedtest} style="display: none;">speedtest</button>
      </div>
    </div>
  {/if}
</div>

<Datalist fileIdentifier="keybinds" />
<Datalist fileIdentifier="translations" newFileContents={updateTranslationSet} />
<Datalist fileIdentifier="commands" versioned />

<style>
  .container {
    margin-top: 20px;
  }
</style>
