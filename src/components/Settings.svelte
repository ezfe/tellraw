<script>
	import { Row } from "sveltestrap";
	import { previewBackgroundColor, version } from "../persistence/stores";
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