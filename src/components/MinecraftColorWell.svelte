<script lang="typescript">
  import type { Color } from "../classes/Color"
  import { getCSSHEX } from "../classes/Color";

  export let color: Color
</script>


{#if color == "none"}
  <div class="color-well-none" />
{:else}
  <div class="color-well cw-filled" style={`background-color: ${getCSSHEX(color)}`} />
{/if}

<style>
  .color-well {
    width: calc(1.5em + 0.75rem + 2px);
    height: calc(1.5em + 0.75rem + 2px);
  }
  
  .cw-filled {
    border-radius: 6px;
    border-style: solid;
    border-width: 3px;
    border-color: grey;
  }
</style>