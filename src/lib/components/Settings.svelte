<script lang="ts">
	import { Button, Row } from '@sveltestrap/sveltestrap';
	import {
		customLanguageTranslations,
		previewBackgroundColor,
		version
	} from '../persistence/stores';

	let translationsCount = $derived(Object.keys($customLanguageTranslations).length);

	function importTranslations() {
		const valueString = prompt('Paste translation file here:');
		if (valueString) {
			const object = JSON.parse(valueString);
			if (object.constructor != Object) {
				alert('Unexpected format?');
				return;
			}
			customLanguageTranslations.set(object);
		}
	}

	function resetTranslations() {
		customLanguageTranslations.set({});
	}
</script>

<Row>
	<div class="col-3">
		<span style="font-weight: bold">Settings</span>
	</div>
	<div id="settings-grid" class="col">
		<label id="version-label" for="version-select"> Minecraft Version Compatibility: </label>
		<select id="version-select" class="form-select" bind:value={$version}>
			<option value="1.13">1.13</option>
			<option value="1.14">1.14</option>
			<option value="1.15">1.15</option>
			<option value="1.16">1.16</option>
			<option value="1.17">1.17</option>
			<option value="1.18">1.18</option>
			<option value="1.19">1.19</option>
			<option value="1.20">1.20.0-1.20.4</option>
			<option value="1.20.5">1.20.5-1.20.6</option>
			<option value="1.21">1.21 (Current Version)</option>
			<option value="1.22">1.22 (Snapshot 25w09a)</option>
		</select>

		<label id="bg-color-label" for="bg-color-input"> Preview Background Color: </label>
		<input id="bg-color-input" type="color" bind:value={$previewBackgroundColor} />

		<label id="lang-label" for="lang-input"> Custom Language Translations: </label>
		<div>
			{#if translationsCount > 0}
				<span>Using {translationsCount.toLocaleString()} custom translations</span>
				<Button size="sm" color="secondary" on:click={importTranslations}>Replace</Button>
				<Button size="sm" color="danger" on:click={resetTranslations}>Reset</Button>
			{:else}
				<Button size="sm" color="primary" on:click={importTranslations}>Import</Button>
			{/if}
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

	input[type='color'] {
		margin-left: -3px;
	}

	label {
		margin-bottom: 0px;
	}
</style>
