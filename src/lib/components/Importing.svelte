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

	$: isUsingNewImport = !isJson(importingString) && importingString.length > 0;

	function formSubmit(e: any): boolean {
		e.preventDefault();
		e.stopPropagation();
		doImport();
		return false;
	}

	function doImport() {
		if (isJson(importingString)) {
			doTraditionalImport();
		} else {
			doMinecraftImport();
		}
	}

	function doMinecraftImport() {
		snippets.set(parse_mc_command(importingString));
		importing = false;
	}

	function doTraditionalImport() {
		let import_data: Array<object>;
		try {
			import_data = JSON.parse(importingString) as Array<object>;
		} catch (e) {
			console.error(e);
			alert(
				`An error occurred importing your command.\n\nFeel free to use the "Report an Issue" option on the main page to report this`
			);
			return;
		}

		if (!('command' in import_data && 'jobject' in import_data && 'jtemplate' in import_data)) {
			console.error('Missing one of command, jobject, jtemplate');
			alert(
				`An error occurred importing your command.\n\nFeel free to use the "Report an Issue" option on the main page to report this`
			);
			return;
		}

		if ('jtemplate' in import_data && import_data['jformat'] >= 7) {
			command.set(import_data['command']);

			commandType.set(import_data['jtemplate']);

			let jobject = import_data['jobject'] as object[];

			if (import_data['jformat'] == 7) {
				jobject = upgradeV7State(jobject);
			}

			snippets.set(loadCurrentVersionState(jobject));
		} else {
			alert(
				'Your export data is incorrectly formatted - and may be too old, and cannot be imported.'
			);
		}

		importing = false;
	}

	function isJson(str: string) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}
</script>

<form on:submit={formSubmit}>
	<div class="row mb-5">
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
	{#if isUsingNewImport}
		<div class="row">
			<div class="col-md-6 offset-md-3 text-center">
				<div class="alert alert-info">
					<p>
						Incomplete support for importing raw Minecraft commands is now available. At this time,
						<code>/tellraw</code> commands should import most contents correctly.
					</p>
					<p>
						Please raise an issue (use the Report an Issue button on the main screen) <b>only</b>
						if importing regular <code>/tellraw</code> commands fails. Please include the command you
						tried to import and what failed.
					</p>
					<p>
						Do not raise issues for any other commands. This message will be updated when other
						command formats (books, title, etc.) are available.
					</p>
				</div>
			</div>
		</div>
	{/if}
</form>
