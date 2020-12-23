<script lang="typescript">
  import { createEventDispatcher } from 'svelte';
  import { Button } from 'sveltestrap';
  import { CommandType,template_lookup } from "../data/templates";
  import { command,commandType } from '../persistence/stores';
import CheckCircle from './generic/Icons/CheckCircle.svelte';

  interface SelectableState {
    type: CommandType
    name: string
    isSelected: boolean
    isLast: boolean
  }

  const dispatch = createEventDispatcher();

  const selectableStates: SelectableState[] = [
    {
      type: CommandType.tellraw,
      name: "Basic Tellraw",
      isSelected: false,
      isLast: false
    },
    {
      type: CommandType.overlay,
      name: "Screen Overlay",
      isSelected: false,
      isLast: false
    },
    {
      type: CommandType.sign,
      name: "Sign",
      isSelected: false,
      isLast: false
    },
    {
      type: CommandType.book,
      name: "Book",
      isSelected: false,
      isLast: false
    }
  ];

  function makeSelection(typeInfo: SelectableState, template?: string) {
    commandType.set(typeInfo.type);
    command.set(template || template_lookup(typeInfo.type)[0]);
  }

  $: mapped = selectableStates.map((typeInfo, index) => {
    return {
      ...typeInfo,
      isSelected: typeInfo.type === $commandType,
      isLast: index >= selectableStates.length - 1
    }
  })
</script>

<div class="row">
  {#each mapped as typeInfo, index (typeInfo)}
    <div class={`col-12 col-sm-5 col-md-4 col-lg-3 ${typeInfo.isLast ? "mb-4" : "mb-2"}`}>
      <Button
        block
        color={ typeInfo.isSelected ? "success" : "light" }
        on:click={() => { makeSelection(typeInfo) }}
      >
        {#if typeInfo.isSelected}
          <CheckCircle />
        {/if}
        { typeInfo.name }
      </Button>
    </div>
  {/each}
</div>
