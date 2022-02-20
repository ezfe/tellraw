<script lang="ts">
  import { faCheckCircle as icon } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
  import IconContainer from './IconContainer.svelte';

  export let style = "";
</script>

<IconContainer {icon} {style} />
