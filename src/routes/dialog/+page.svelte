<script lang="ts">
	import type { Snippet } from '$lib/classes/Snippets/SnippetTypes/Snippet';
	import SnippetCollection from '$lib/components/SnippetCollection.svelte';
	import { CommandType } from '$lib/data/templates';
	import { compile } from '$lib/helpers/compile';
	import { Col, Row } from '@sveltestrap/sveltestrap';

	let body: Snippet[] = $state([]);

	let compiled = $derived(
		compile(body, '/dialog show @p %s', CommandType.dialog_plain_text, '1.21.6', false)
	);
</script>

<div class="container">
	<Row>
		<Col>
			<h4>Dialog Generator for Minecraft</h4>
		</Col>
	</Row>
	<Row class="mb-3">
		<Col md={2}>
			<label for="dialogTypeSelect" class="form-label">Dialog Type</label>
		</Col>
		<Col>
			<select id="dialogTypeSelect" class="form-select">
				<option value="minecraft:notice">Notice</option>
				<option value="minecraft:confirmation">Confirmation</option>
				<option value="minecraft:multi_action">Multi-Action</option>
				<option value="minecraft:server_links">Server Links</option>
				<option value="minecraft:dialog_list">Dialog List</option>
			</select>
		</Col>
	</Row>
	<Row class="mb-3">
		<Col md={2}>
			<label for="dialogTitle" class="form-label">Title</label>
		</Col>
		<Col>
			<input type="text" class="form-control" />
		</Col>
	</Row>
	<Row class="mb-3">
		<Col md={2}>
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="form-label">Body</label>
		</Col>
		<Col>
			<Row>
				<Col class="inline-snippet-collection">
					<SnippetCollection
						commandType={CommandType.dialog_plain_text}
						snippets={body}
						updateSnippets={(newValue) => {
							body = newValue;
						}}
						deleteAll={() => {
							body = [];
						}}
						colorManaging={false}
					/>
				</Col>
			</Row>
		</Col>
	</Row>
	<Row>
		<Col>
			{compiled}
		</Col>
	</Row>
</div>

<style>
	.container {
		margin-top: 20px;
	}
</style>
