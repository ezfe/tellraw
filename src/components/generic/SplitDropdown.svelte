<script lang="typescript">
  import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
  import { Button,ButtonGroup,Dropdown,DropdownItem,DropdownMenu,DropdownToggle } from "sveltestrap";
  import Icon from "./Icons/IconContainer.svelte";

  type ButtonColor =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';

  interface DropdownAction {
    label?: string
    icon?: any,
    iconRight?: IconDefinition,
    onClick?: () => void
    disabled?: boolean
  }

  export let color: ButtonColor
  export let disabled = false
  export let block = false
  export let dropdowns: DropdownAction[]

  let isOpen = false
</script>

<Dropdown {isOpen} toggle={() => { isOpen = !isOpen }}>
  <ButtonGroup class={block ? "btn-block" : ""}>
    <Button {color} {disabled} {block} on:click>
      <slot />
    </Button>
    <DropdownToggle {color} caret class="dropdown-toggle-split" />
  </ButtonGroup>
  <DropdownMenu>

    {#each dropdowns as dropdown}
      <DropdownItem on:click={dropdown.onClick}>
        <svelte:component this={dropdown.icon} />
        {#if dropdown.label}
          {#if dropdown.icon}
            {" "}
          {/if}
          {dropdown.label}
          {#if dropdown.iconRight}
            {" "}
          {/if}
        {/if}
        <svelte:component this={dropdown.iconRight} />
      </DropdownItem>
    {/each}
  </DropdownMenu>
</Dropdown>