<script lang="ts">
	import type {
		IconDefinition as IconDefinition1,
		IconPathData
	} from '@fortawesome/fontawesome-common-types';
	import type { IconDefinition as IconDefinition2 } from '@fortawesome/free-solid-svg-icons';

	export let icon: IconDefinition1 | IconDefinition2;

	export let width = '1em';
	export let height = '1em';
	export let verticalAlign = '-0.125em';

	export let style = '';

	let pathData: IconPathData;
	let path = '';
	let viewBox = '';

	$: viewBox = '0 0 ' + icon.icon[0] + ' ' + icon.icon[1];
	$: {
		pathData = icon.icon[4];
		if (typeof pathData == 'string') {
			path = pathData;
		} else {
			console.log('Identified rogue path data', pathData);
		}
	}
</script>

<svg
	aria-hidden="true"
	role="img"
	xmlns="http://www.w3.org/2000/svg"
	{viewBox}
	style="width: {width}; height: {height}; vertical-align: {verticalAlign}; {style}"
>
	<path fill="currentColor" d={path} />
</svg>
