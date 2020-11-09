<script lang="typescript">
  import { Col,Row } from "sveltestrap";
  import { NBTSnippet,NBTType } from "../../classes/Snippets/SnippetTypes/NBTSnippet";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import { FeatureType,isFeatureAvailable } from "../../data/templates";
  import { commandType,version } from "../../persistence/stores";
  import Checkbox from "../generic/Checkbox.svelte";


  export let snippet: NBTSnippet
  export let updateSnippet: (snippet: Snippet) => void
  
  function updateField(field: string, event: any) {
    updateFieldValue(field, event.target.value)
  }

  function updateFieldValue(field: string, value: any) {
    let newSnippet = snippet.copy()
    newSnippet[field] = value
    updateSnippet(newSnippet)
  }

  function changeNBTType(event: any) {
    let newSnippet = snippet.copy()
    newSnippet.type = event.target.value
    updateSnippet(newSnippet)
  }
</script>

{#if (!isFeatureAvailable($commandType, $version, FeatureType.nbtComponent))}
  <Row>
    <Col>
      <p>NBT Components require Minecraft 1.14+</p>
    </Col>
  </Row>
{:else}
  <Row class="mb-2">
    <Col>
      <select class="custom-select" value={snippet.type} on:input={changeNBTType}>
        <option value={NBTType.storage} disabled={!isFeatureAvailable($commandType, $version, FeatureType.nbtStorageComponent)}>
          Storage
          {#if !isFeatureAvailable($commandType, $version, FeatureType.nbtStorageComponent)}
            {" (Requires 1.15+)"}
          {/if}
        </option>
        <option value={NBTType.entity}>Entity</option>
        <option value={NBTType.block}>Block</option>
      </select>
    </Col>
    <Col>
      <input class="form-control" value={snippet.storage} placeholder="Identifier" on:change={(evt) => { updateField("storage", evt) }} />
    </Col>
  </Row>
  <Row>
    <Col>
      <input class="form-control" value={snippet.nbt} placeholder="NBT Path" on:input={(evt) => { updateField("nbt", evt) }} />
    </Col>
  </Row>
  <Row>
    <Col>
      <Checkbox checked={snippet.interpret} on:change={(event) => { updateFieldValue("interpret", event.detail) }}>
        Interpret
      </Checkbox>
    </Col>
  </Row>
{/if}