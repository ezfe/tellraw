<script type="typescript">
  import { createEventDispatcher } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';


  const dispatch = createEventDispatcher();
  
  export let checked: boolean

  let randomUUID = uuidv4()
</script>

<div class="custom-control custom-checkbox">
  <input {checked} on:change type="checkbox" class="custom-control-input" id={randomUUID} />
  <label class="custom-control-label" for={randomUUID}><slot /></label>
</div>
