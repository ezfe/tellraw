<script lang="typescript">

  import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
  import { Button } from 'sveltestrap';
import { loadCurrentVersionState, upgradeV5State } from '../helpers/loaders';
  import { command,commandType,customColors,snippets,version } from '../persistence/stores';
  import Icon from './generic/Icon.svelte';

  let importingString = ""
  export let importing: boolean

  function formSubmit(e): boolean {
    e.preventDefault()
    e.stopPropagation()
    doImport()
    return false
  }

  function doImport() {
    let import_data: Array<object>
    try {
      import_data = JSON.parse(importingString) as Array<object>
    } catch (e) {
      alert(`An error occurred importing your command.\n\nFeel free to use the "Report an Issue" option on the main page to report this`)
      return
    }

    if (!("command" in import_data
          && "jobject" in import_data
          && "jtemplate" in import_data)) {
      
      alert(`An error occurred importing your command.\n\nFeel free to use the "Report an Issue" option on the main page to report this`)
      return
    }

    if ("jtemplate" in import_data && import_data["jformat"] >= 5) {
      command.set(import_data["command"])

      commandType.set(import_data["jtemplate"])
    
      let jobject = import_data["jobject"] as object[]

      if (import_data["jformat"] == 5) {
        jobject = upgradeV5State(jobject)
      }

      snippets.set(loadCurrentVersionState(jobject))
    } else {
      alert("Your export data is incorrectly formatted, and cannot be imported.")
    }

    importing = false
  }

</script>

<form on:submit={formSubmit}>
  <div class="row">
    <div class="col-md-6 offset-md-3 light-well text-center">
      <p class="mb-3">
        Please enter the string you were given when you exported your command
      </p>
      <input
        autoFocus
        class="form-control mb-3"
        id="hotfix-input-cell"
        bind:value={importingString}
      />
      <Button type="button" color="danger" class="mr-3" on:click={() => { importing = false }}>
        <Icon icon={faTimesCircle} />
        Cancel
      </Button>
      <Button type="submit" color="success" class="mr-3" on:click={doImport}>
        <Icon icon={faCheckCircle} />
        Import
      </Button>
    </div>
  </div>
</form>
