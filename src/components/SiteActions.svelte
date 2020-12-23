<script lang="typescript">
  import { faCodeBranch,faFileDownload,faWifi } from '@fortawesome/free-solid-svg-icons';
  import { UncontrolledDropdown,DropdownItem,DropdownMenu,DropdownToggle } from 'sveltestrap';
  import Icon from './generic/Icons/IconContainer.svelte';
  import List from './generic/Icons/List.svelte';
import Twitter from './generic/Icons/Twitter.svelte';
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
      <Icon icon={faWifi} />
      Uptime
    </DropdownItem>
    <DropdownItem href="https://github.com/ezfe/tellraw/releases/latest">
      <Icon icon={faFileDownload} />
      Download Website
    </DropdownItem>
    <DropdownItem href="https://legacy.minecraftjson.com">
      <Icon icon={faCodeBranch} />
      Legacy Version
    </DropdownItem>
  </DropdownMenu>
</UncontrolledDropdown>
