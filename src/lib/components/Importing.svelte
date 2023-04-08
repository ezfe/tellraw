<script lang="ts">
	import { parse_mc_command } from '$lib/helpers/mc_parser';
	import { Button } from 'sveltestrap';
	import { loadCurrentVersionState, upgradeV7State } from '../helpers/loaders';
	import { command, commandType, snippets } from '../persistence/stores';
	import CheckCircle from './generic/Icons/CheckCircle.svelte';
	import TimesCircle from './generic/Icons/TimesCircle.svelte';
	import LightWell from './generic/LightWell.svelte';

	let importingString = '';
	export let importing: boolean;

	function formSubmit(e: any): boolean {
		e.preventDefault();
		e.stopPropagation();
		doImport();
		return false;
	}

	function doImport() {
		snippets.set(parse_mc_command(importingString));
		importing = false;
	}
</script>

<form on:submit={formSubmit}>
	<div class="row">
		<div class="col-md-6 offset-md-3 text-center">
			<LightWell>
				<p class="mb-3">Please enter the string you were given when you exported your command</p>
				<!-- svelte-ignore a11y-autofocus -->
				<input autoFocus class="form-control mb-3" bind:value={importingString} />
				<Button
					type="button"
					color="danger"
					class="me-3"
					on:click={() => {
						importing = false;
					}}
				>
					<TimesCircle />
					Cancel
				</Button>
				<Button type="submit" color="success" class="me-3" on:click={doImport}>
					<CheckCircle />
					Import
				</Button>
			</LightWell>
		</div>
	</div>
</form>
