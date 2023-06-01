<script lang="ts">
	import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'sveltestrap';
	import CodeBranch from '../generic/Icons/CodeBranch.svelte';
	import FileDownload from '../generic/Icons/FileDownload.svelte';
	import List from '../generic/Icons/List.svelte';
	import Twitter from '../generic/Icons/Twitter.svelte';
	import WiFi from '../generic/Icons/WiFi.svelte';
</script>

<ButtonDropdown class="ms-2">
	<DropdownToggle size="sm" color="secondary" caret>
		<List />
	</DropdownToggle>
	<DropdownMenu>
		<DropdownItem href="https://github.com/ezfe/tellraw/releases/latest">
			<FileDownload />
			Download Website
		</DropdownItem>
		<DropdownItem href="https://legacy.minecraftjson.com">
			<CodeBranch />
			Legacy Version
		</DropdownItem>
	</DropdownMenu>
</ButtonDropdown>
