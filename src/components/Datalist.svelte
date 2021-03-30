<script lang="ts">
   import { version } from "../persistence/stores";

   export let fileIdentifier: string;
   export let versioned: boolean = false;

   $: url = versioned ? `datafiles/${$version}/${fileIdentifier}.json` : `datafiles/${fileIdentifier}.json`;
   $: responsePromise = fetch(url);
   $: jsonPromise = responsePromise.then(res => res.ok ? res.json() : []);
   $: listPromise = jsonPromise.then(json => Array.isArray(json) ? json : Object.keys(json));
</script>

<datalist id={`datalist-${fileIdentifier}`}>
   {#await listPromise then list}
      {#each list as value}
         <option {value} />
      {/each}
   {/await}
</datalist>