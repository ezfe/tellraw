<script lang="typescript">
  import { faTwitter } from '@fortawesome/free-brands-svg-icons';
  import { faCodeBranch,faFileDownload,faList,faWifi } from '@fortawesome/free-solid-svg-icons';
  import { Dropdown,DropdownItem,DropdownMenu,DropdownToggle } from 'sveltestrap';
  import Icon from './Icon.svelte';

  let informationDropdownVisible = false

  function toggleInformationDropdown() {
    informationDropdownVisible = !informationDropdownVisible
  }
</script>

<Dropdown isOpen={informationDropdownVisible} toggle={toggleInformationDropdown} class="ml-2">
  <DropdownToggle size="sm" color="secondary" caret>
    <Icon icon={faList} />
  </DropdownToggle>
  <DropdownMenu>
    <DropdownItem href="https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fwww.minecraftjson.com%2F&text=%2Ftellraw%20generator%20for%20minecraft&tw_p=tweetbutton&url=http%3A%2F%2Fwww.minecraftjson.com%2F&via=superezfe">
      <Icon icon={faTwitter} />
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
</Dropdown>
