<script lang="ts">
   import { version } from "../persistence/stores";

   export let fileIdentifier: string;
   export let versioned: boolean = false;
   export let newFileContents: ((fileContents: Promise<any>) => void) | null;

   $: url = versioned ? `datafiles/${$version}/${fileIdentifier}.json` : `datafiles/${fileIdentifier}.json`;
   $: responsePromise = fetch(url);
   $: jsonPromise = responsePromise.then(res => res.ok ? res.json() : []);
   $: listPromise = jsonPromise.then(json => Array.isArray(json) ? json : Object.keys(json));

   $: {
      if (newFileContents) {
         jsonPromise.then(json => newFileContents(json));
      }
   }
</script>

<datalist id={`datalist-${fileIdentifier}`}>
   {#await listPromise then list}
      {#each list as value}
         <option {value} />
      {/each}
   {/await}
</datalist>