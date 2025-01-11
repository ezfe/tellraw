<script lang="ts">
	import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from '@sveltestrap/sveltestrap';
	import CodeBranch from '../generic/Icons/CodeBranch.svelte';
	import List from '../generic/Icons/List.svelte';
</script>

<ButtonDropdown class="ms-2">
	<DropdownToggle size="sm" color="secondary" caret>
		<List />
	</DropdownToggle>
	<DropdownMenu>
		<DropdownItem href="https://legacy.minecraftjson.com">
			<CodeBranch />
			Legacy Version
		</DropdownItem>
	</DropdownMenu>
</ButtonDropdown>
