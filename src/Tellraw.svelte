<script lang="typescript">
  import Icon from './components/generic/Icon.svelte';
  import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'sveltestrap';
  import { CommandType, template_lookup } from './data/templates';
  import { compile } from './helpers/compile';
  import { export_snippets } from './helpers/export';
  import { command,commandType,customColors,snippets,version } from './persistence/stores';
  import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
  import { faFileImport } from '@fortawesome/free-solid-svg-icons/faFileImport';
  import { faFileExport } from '@fortawesome/free-solid-svg-icons/faFileExport';
  import SiteActions from './components/generic/SiteActions.svelte';

  let exporting = false
  let importing = false
  
  let colorManaging = false
  
  let compiled;
  $: compiled = compile($snippets, $command, $commandType, $version)

  function updateCommandType(type: CommandType, command_override?: string) {
    commandType.set(type)
    command.set(command_override || template_lookup(type)[0])
  }

  function startImporting() {
    importing = true
  }

  function stopImporting() {
    importing = false
  }
</script>

<div class="container">
  {#if importing}
    <!-- <Importing setSnippets={setSnippets} setCommand={setCommand} setCommandType={setCommandType} stopImporting={stopImporting} /> -->
    <span>Importing?</span>
  {:else if exporting}  
    <div class="row">
      <div class="col-md-6 offset-md-3 light-well text-center">
        <p class="mb-3">
          Click below to copy the exported command string. Store it in a safe place
          to import back onto the site in the future.
        </p>
        <textarea readOnly={true}
                  class="form-control mb-3"
                  onClick={(event) => {
                    event.currentTarget.select()
                  }}
                  value={ export_snippets($snippets, $command, $commandType) } />
        <button on:click={() => { exporting = false }}>Done</button>
        <!-- <Button type="success" icon="check-circle" onClick={() => { setExporting(false) }}>Done</Button> -->
      </div>
    </div>
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
            <Icon icon={faExclamationTriangle} /> Report an Issue
          </Button>
          <SiteActions />
        </div>
      </div>
    </div>
    <div class="row">
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
    </div>

    <!-- <CommandTemplatesController commandType={commandType}
                                updateCommandType={updateCommandType} />
    
    <SnippetCollection commandType={commandType}
                        snippets={snippets} 
                        updateSnippets={(snippets) => {
                          setSnippets(snippets)
                        }}
                        deleteAll={() => {
                          setSnippets([])
                          setCommand(template_lookup(CommandType.tellraw)[0])
                          setCommandType(CommandType.tellraw)
                        }}
                        version={version}
                        customColors={customColors}
                        setColorManaging={(newValue: boolean) => { setColorManaging(newValue) }}
                        /> -->
    
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

    <!-- <Preview snippets={snippets} commandType={commandType} version={version} /> -->

    <hr />

    <div class="row">
      <div class="col-3">
        <span style="font-weight: bold;">Save and Restore</span>
      </div>
      <div class="col-sm-2 mb-2">
        <Button color="light" block on:click={startImporting}>
          <Icon icon={faFileImport} /> Import
        </Button>
      </div>
      <div class="col-sm-2 mb-2">
        <Button color="light" block on:click={() => { exporting = true }}>
          <Icon icon={faFileExport} /> Export
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

    <div class="row">
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
    </div>

    <hr />

    <div class="row">
      <div class="col">
        <span style="color: grey; font-size: 10px;">
          <a href="https://ezekielelin.com/contact" target="_blank">Contact Me</a> | "Minecraft" content and materials are trademarks and copyrights of Mojang and its licensors. This site is not affiliated with Mojang.
        </span>
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    margin-top: 20px;
  }
</style>