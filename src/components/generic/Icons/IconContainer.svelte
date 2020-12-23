<script lang="typescript">  
  import type { IconDefinition, IconPathData } from '@fortawesome/fontawesome-common-types';

  export let icon: IconDefinition
  // export let width: string
  // export let height: string
  // export let verticalAlign: string

  let pathData: IconPathData;
  let path = "";
  let viewBox = "";

  export let width = "1em";
  export let height = "1em";
  export let verticalAlign = "-0.125em";

  $: console.log(icon)
  $: viewBox = "0 0 " + icon.icon[0] + " " + icon.icon[1];
  $: {
    pathData = icon.icon[4];
    if (typeof pathData == "string") {
      path = pathData;
    } else {
      console.log("Identified rogue path data", pathData);
    }
  }
</script>
  
<svg
  aria-hidden="true"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="{viewBox}"
  style="width: {width}; height: {height}; vertical-align: {verticalAlign}"
>
  <path fill="currentColor" d="{path}" />
</svg>
