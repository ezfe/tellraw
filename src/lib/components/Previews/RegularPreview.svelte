<script lang="ts">
	import type { Snippet } from '../../classes/Snippets/SnippetTypes/Snippet';
	import type { TranslationSet } from '../../helpers/translation_processor';
	import { previewBackgroundColor } from '../../persistence/stores';
	import PreviewContents from './PreviewContents.svelte';

	interface Props {
		snippets: Snippet[];
		translationSet: TranslationSet;
	}

	let { snippets, translationSet }: Props = $props();
</script>

<div class="preview p-3" style={`background-color: ${$previewBackgroundColor}`}>
	<PreviewContents {snippets} bookPage={null} {translationSet} />
</div>

<style>
	.preview {
		background-color: var(--background-color);
		min-height: 300px;
		color: white;
		border-radius: 5px;
	}
</style>
