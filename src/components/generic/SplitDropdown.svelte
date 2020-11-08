<script lang="typescript">
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import type { each } from "svelte/internal";

  import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "sveltestrap";
import Icon from "./Icon.svelte";

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
    icon?: IconDefinition,
    iconRight?: IconDefinition,
    // onClick?: (event) => void
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
    <Button {color} {disabled} {block}>
      <slot />
    </Button>
    <DropdownToggle {color} caret class="dropdown-toggle-split" />
  </ButtonGroup>
  <DropdownMenu>

    {#each dropdowns as dropdown}
      <DropdownItem>
        {#if dropdown.icon}
          <Icon icon={dropdown.icon} />
        {/if}
        {#if dropdown.label}
          {#if dropdown.icon}
            {" "}
          {/if}
          {dropdown.label}
          {#if dropdown.iconRight}
            {" "}
          {/if}
        {/if}
        {#if dropdown.iconRight}
          <Icon icon={dropdown.iconRight} />
        {/if}
      </DropdownItem>
    {/each}
    <DropdownItem></DropdownItem>
  </DropdownMenu>
</Dropdown>