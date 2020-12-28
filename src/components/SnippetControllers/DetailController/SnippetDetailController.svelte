<script lang="typescript">
  import { Button,Col,Row } from "sveltestrap";
  import type { Color } from "../../../classes/Color";
  import { getCSSHEX,minecraftColorSet } from "../../../classes/Color";
  import { ClickEventType } from "../../../classes/Snippets/ClickEvent";
  import { HoverEventType } from "../../../classes/Snippets/HoverEvent";
  import { genericSnippet } from "../../../classes/Snippets/SnippetTypes/GenericFieldCompatable";
  import { NBTSnippet } from "../../../classes/Snippets/SnippetTypes/NBTSnippet";
  import type { Snippet } from "../../../classes/Snippets/SnippetTypes/Snippet";
  import { CommandType,FeatureType,isFeatureAvailable } from "../../../data/templates";
  import { duplicate_snippet } from "../../../helpers/copy_snippet";
  import { customColors,version } from "../../../persistence/stores";
  import Checkbox from "../../generic/Checkbox.svelte";
  import MinecraftColorButton from "../../MinecraftColorButton.svelte";
import PreviewContents from "../../Previews/PreviewContents.svelte";
  import SnippetCollection from "../../SnippetCollection.svelte";
  import GenericSnippetController from "../GenericSnippetController.svelte";
  import NbtSnippetController from "../NBTSnippetController.svelte";



  export let snippet: Snippet
  export let stopEditing: (save: boolean) => void
  export let colorManaging: boolean
  export let commandType: CommandType

  $: filteredColorSet = fullColorSet().filter((color) => { return color != "none" })
  $: clickEventTypeIsCommand = snippet.click_event_type == ClickEventType.run_command || snippet.click_event_type == ClickEventType.suggest_command

  function changeClickEventType(event: any) {
    updateField("click_event_type", event.target.value)
  }

  function changeClickEventValue(event: any) {
    updateField("click_event_value", event.target.value)
  }

  function changeHoverEventType(event: any) {
    updateField("hover_event_type", event.target.value)
  }

  function changeHoverEventValue(event: any) {
    updateField("hover_event_value", event.target.value)
  }

  function changeHoverEventChildren(snippets: Array<Snippet>) {
    let newSnippet = duplicate_snippet(snippet)
    newSnippet.hover_event_children = snippets
    snippet = newSnippet
  }

  function changeInsertion(event: any) {
    updateField("insertion", event.target.value)
  }

  function changeFont(event: any) {
    updateField("font", event.target.value)
  }

  function updateField(field: string, value: any) {
    let newSnippet = duplicate_snippet(snippet)
    newSnippet[field] = value
    snippet = newSnippet
  }

  function updateSnippet(newSnippet: Snippet) {
    // snippet = duplicate_snippet(newSnippet);
    snippet = newSnippet;
  }

  function updateFontCheckbox(newValue: boolean) {
    let newSnippet = duplicate_snippet(snippet)
    if (newValue) {
      newSnippet.font = "minecraft:default"
    } else {
      newSnippet.font = null
    }
    snippet = newSnippet
  }

  function fullColorSet(): Color[] {
    return [...Object.keys(minecraftColorSet), ...$customColors]
  }

</script>

<div class="row mb-2">
  <div class="col">
    {#if snippet instanceof NBTSnippet}
      <NbtSnippetController {snippet} {updateSnippet} />
    {:else if genericSnippet(snippet)}
      <GenericSnippetController snippet={genericSnippet(snippet)} {updateSnippet} />
    {:else}
      <span>{typeof snippet} isn't implemented supported renderer</span>
    {/if}
  </div>
</div>
<hr />
<div class="row">
  <div class="col">
    <h4>
      Formatting Options:
    </h4>
  </div>
</div>
<div class="row">
  <div class="col-4">
    <div class="row mb-1">
      <div class="col">
        <span style="font-weight: bold">
          Preset Colors:
        </span>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col d-flex flex-wrap">
        {#each filteredColorSet as color}
          <MinecraftColorButton
            {color}
            checked={snippet.color == color}
            onClick={(newColor) => {
              updateField("color", newColor)
            }}
          />
        {/each}
      </div>
    </div>
    {#if isFeatureAvailable(commandType, $version, FeatureType.customColor)}
      <div class="row mb-1">
        <div class="col">
          <span style="font-weight: bold;">
            Custom Color:
          </span>
          <input
            type="color"
            value={getCSSHEX(snippet.color)}
            on:input={(evt) => {
              updateField("color", evt.currentTarget.value.toUpperCase())
            }}
          />
        </div>
      </div>
      <!-- <div class="row mb-1">
        <div class="col">
          <button onClick={() => { props.setColorManaging(true) }}>Color Manager...</button>
        </div>
      </div> -->
    {/if}
    <div class="row mb-2">
      <Col>
        {#if snippet.color != "none"}
          <Button
            color="secondary"
            on:click={() => {
              updateField("color", "none")
            }}
          >
            Unset Color
          </Button>
        {:else}
          <p class="mb-0">
            No color is selected, so it will appear
            the default color in-game, usually white or black.
          </p>
        {/if}
      </Col>
    </div>
  </div>
  <div class="col-4">
    <Checkbox checked={snippet.bold} on:change={event => updateField("bold", event.detail)}>
      Bold
    </Checkbox>
    <Checkbox checked={snippet.italic} on:change={event => updateField("italic", event.detail)}>
      Italic
    </Checkbox>
    <Checkbox checked={snippet.underlined} on:change={event => updateField("underlined", event.detail)}>
      Underlined
    </Checkbox>
    <Checkbox checked={snippet.strikethrough} on:change={event => updateField("strikethrough", event.detail)}>
      Strikethrough
    </Checkbox>
    <Checkbox checked={snippet.obfuscated} on:change={event => updateField("obfuscated", event.detail)}>
      Obfuscated
    </Checkbox>
  </div>
  {#if isFeatureAvailable(commandType, $version, FeatureType.font)}
    <div class="col-4">
      <div class="row">
        <div class="col">
          <Checkbox checked={snippet.font !== null} on:change={event => { updateFontCheckbox(event.detail) }}>
            Custom Font
          </Checkbox>
        </div>
      </div>
      <div class="row">
        <div class="col">
          {#if snippet.font !== null}
            <input type="text" class="form-control" value={snippet.font} on:input={changeFont}/>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>
<hr />

{#if isFeatureAvailable(commandType, $version, FeatureType.clicking)}
  <div class="row">
    <div class="col">
      <h4>Click Event:</h4>
    </div>
  </div>

  <Row class="mb-2">
    <div class="col-4">
      <select class="custom-select" value={snippet.click_event_type} on:input={changeClickEventType}>
        <option selected={snippet.click_event_type == ClickEventType.none} value={ClickEventType.none}>
          None
        </option>
        <option selected={snippet.click_event_type == ClickEventType.open_url} value={ClickEventType.open_url}>
          Open URL
        </option>
        <option selected={snippet.click_event_type == ClickEventType.run_command} value={ClickEventType.run_command}>
          Run Command
        </option>
        <option selected={snippet.click_event_type == ClickEventType.suggest_command} value={ClickEventType.suggest_command}>
          Suggest Command
        </option>
        <option selected={snippet.click_event_type == ClickEventType.change_page} value={ClickEventType.change_page}>
          Change Page (Books Only)
        </option>
        <option selected={snippet.click_event_type == ClickEventType.copy_to_clipboard} value={ClickEventType.copy_to_clipboard}>
          Copy to Clipboard
        </option>
      </select>
    </div>
    {#if snippet.click_event_type != ClickEventType.none}
      <div class="col">
        <div class="row">
          <div class="col">
            <input
              list={clickEventTypeIsCommand ? "datalist-commands" : null}
              type="text"
              class="form-control"
              value={snippet.click_event_value}
              on:input={changeClickEventValue}
            />
          </div>  
        </div>
        {#if commandType == CommandType.sign}
          <div class="row mt-2">
            <div class="col">
              <div class="alert alert-warning" role="alert">
                If you have more than one text entry for each line
                in the sign, the click event will not be applied.
                This is due to Minecraft limitations with signs.
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </Row>
  <hr />
{/if}

{#if isFeatureAvailable(commandType, $version, FeatureType.hovering)}
  <div class="row">
    <div class="col">
      <h4>Hover Event:</h4>
    </div>
  </div>

  <div class="row mb-2">
    <div class="col-4">
      <select class="custom-select" value={snippet.hover_event_type} on:input={changeHoverEventType}>
        <option selected={snippet.hover_event_type == HoverEventType.none} value={HoverEventType.none}>
          None
        </option>
        <option selected={snippet.hover_event_type == HoverEventType.show_entity} value={HoverEventType.show_entity}>
          Show Entity
        </option>
        <option selected={snippet.hover_event_type == HoverEventType.show_item} value={HoverEventType.show_item}>
          Show Item
        </option>
        <option selected={snippet.hover_event_type == HoverEventType.show_text} value={HoverEventType.show_text}>
          Show Text
        </option>
      </select>
    </div>
    {#if snippet.hover_event_type == HoverEventType.show_text}
      <div class="col">
        <div class="row">
          <div class="col inline-snippet-collection">
            <SnippetCollection
              commandType={CommandType.hovertext}
              snippets={snippet.hover_event_children}
              updateSnippets={changeHoverEventChildren}
              deleteAll={() => {
                changeHoverEventChildren([])
              }}
              bind:colorManaging={colorManaging}
            />
          </div>
        </div>
      </div>
    {:else if snippet.hover_event_type != HoverEventType.none}
      <div class="col">
        <input type="text" class="form-control" value={snippet.hover_event_value} onChange={changeHoverEventValue}/>
      </div>
    {/if}
  </div>
  <hr />
{/if}

{#if isFeatureAvailable(commandType, $version, FeatureType.insertion)}
  <div class="row mb-2">
    <div class="col-4">
      <h4>Insertion:</h4>
    </div>
    <div class="col">
      <input
        class="form-control"
        value={snippet.insertion}
        on:input={changeInsertion}
      />
    </div>
  </div>
  <hr />
{/if}

<br />

<!-- Preview -->

<div class="row mb-2">
  <div class="col">
    <h4>Preview:</h4>
  </div>
</div>

<div class="row mb-2">
  <div class="col">
    <p>
      <PreviewContents snippets={[snippet]} bookPage={null} />
    </p>
  </div>
</div>

<!-- Exit Controls -->

<div class="row">
  <div class="offset-8 col-2">
    <button class="btn btn-secondary btn-block" on:click={() => { stopEditing(false) }}>Cancel</button>
  </div>
  <div class="col-2">
    <button class="btn btn-primary btn-block" on:click={() => { stopEditing(true) }}>Save</button>
  </div>
</div>

<style>
  .inline-snippet-collection {
    border-style: solid;
    border-width: 3px;
    border-radius: 10px;
    padding: 15px;
    border-color: grey;
  }
</style>