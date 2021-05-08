<script lang="ts">
	import { Button, Row } from "sveltestrap";
	import { previewBackgroundColor, version, customLanguageTranslations } from "../persistence/stores";

	function fancyPrint(object: any): string {
		return JSON.stringify(object, null, 3);
	}

	function importTranslations() {
		const valueString = prompt("Paste translation file here:");
		const object = JSON.parse(valueString);
		if (object.constructor != Object) {
			alert('Unexpected format?');
			return;
		}
		customLanguageTranslations.set(object);
	}
</script>

<Row>
	<div class="col-3">
		<span style="font-weight: bold">Settings</span>
	</div>
	<div id="settings-grid" class="col">
		<label id="version-label" for="version-select">
			Minecraft Version Compatibility:
		</label>
		<select id="version-select" class="form-select" bind:value={$version}>
			<option value="1.13">1.13</option>
			<option value="1.14">1.14</option>
			<option value="1.15">1.15</option>
			<option value="1.16">1.16 (Current Version)</option>
		</select>

		<label id="bg-color-label" for="bg-color-input">
			Preview Background Color:
		</label>
		<input id="bg-color-input" type="color" bind:value={$previewBackgroundColor} />

		<label id="lang-label" for="lang-input">

		</label>
		<div>
			<span>Using {Object.keys($customLanguageTranslations).length} custom translations</span>
			<Button on:click={importTranslations}>Import</Button>
		</div>
	</div>
</Row>

<style>
	#settings-grid {
		display: grid;

		grid-template-columns: max-content max-content;
		row-gap: 0.5rem;
		column-gap: 1.5rem;

		align-items: center;
	}

	input[type=color] {
		margin-left: -3px;
	}
</style>