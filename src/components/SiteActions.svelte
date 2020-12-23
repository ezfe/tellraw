<script lang="typescript">
  import { DropdownItem,DropdownMenu,DropdownToggle,UncontrolledDropdown } from 'sveltestrap';
  import CodeBranch from './generic/Icons/CodeBranch.svelte';
  import FileDownload from './generic/Icons/FileDownload.svelte';
  import List from './generic/Icons/List.svelte';
  import Twitter from './generic/Icons/Twitter.svelte';
  import WiFi from './generic/Icons/WiFi.svelte';
</script>

<UncontrolledDropdown class="ml-2">
  <DropdownToggle size="sm" color="secondary" caret>
    <List />
  </DropdownToggle>
  <DropdownMenu>
    <DropdownItem href="https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fwww.minecraftjson.com%2F&text=%2Ftellraw%20generator%20for%20minecraft&tw_p=tweetbutton&url=http%3A%2F%2Fwww.minecraftjson.com%2F&via=superezfe">
      <Twitter />
      Tweet
    </DropdownItem>
    <DropdownItem href="https://status.minecraftjson.com">
      <WiFi />
      Uptime
    </DropdownItem>
    <DropdownItem href="https://github.com/ezfe/tellraw/releases/latest">
      <FileDownload />
      Download Website
    </DropdownItem>
    <DropdownItem href="https://legacy.minecraftjson.com">
      <CodeBranch />
      Legacy Version
    </DropdownItem>
  </DropdownMenu>
</UncontrolledDropdown>
