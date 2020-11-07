<script lang="typescript">
  import FAIcon from 'svelte-awesome';

  //IconPathData
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types'

  export let icon: IconDefinition;

  // let pathData: IconPathData;
  // let path = "";
  // let classes = "";
  // let viewBox = "";
  
  // $: console.log(icon)
  // $: viewBox = "0 0 " + icon.icon[0] + " " + icon.icon[1];
  // $: classes = "fa-svelte " + ($$props.class ? $$props.class : "");
  // $: {
  //   pathData = icon.icon[4];
  //   if (typeof pathData == "string") {
  //     path = pathData;
  //   } else {
  //     console.log("Identified rogue path data", pathData);
  //   }
  // }
</script>

<FAIcon data={icon} />

<!-- <svg
  aria-hidden="true"
  class="{classes}"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="{viewBox}"
>
  <path fill="currentColor" d="{path}" />
</svg>

<style>
  .fa-svelte {
    width: 1em;
    height: 1em;
    overflow: visible;
    display: inline-block;
  }

  .fa-svelte-w-16 {
    width: 1em;
  }

  .fa-svelte-w-18 {
    width: 1.125em;
  }
</style> -->