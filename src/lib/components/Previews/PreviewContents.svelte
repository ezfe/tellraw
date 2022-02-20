<script lang="ts">
  import { getCSSHEX } from "../../classes/Color";
  import { GroupSnippet } from "../../classes/Snippets/SnippetTypes/GroupSnippet";
  import { KeybindSnippet } from "../../classes/Snippets/SnippetTypes/KeybindSnippet";
  import { LinebreakSnippet } from "../../classes/Snippets/SnippetTypes/LinebreakSnippet";
  import { NBTSnippet } from "../../classes/Snippets/SnippetTypes/NBTSnippet";
  import { PagebreakSnippet } from "../../classes/Snippets/SnippetTypes/PagebreakSnippet";
  import { ScoreboardObjectiveSnippet } from "../../classes/Snippets/SnippetTypes/ScoreboardObjectiveSnippet";
  import { SelectorSnippet } from "../../classes/Snippets/SnippetTypes/SelectorSnippet";
  import type { Snippet } from "../../classes/Snippets/SnippetTypes/Snippet";
  import { TextSnippet } from "../../classes/Snippets/SnippetTypes/TextSnippet";
  import { TranslateSnippet } from "../../classes/Snippets/SnippetTypes/TranslateSnippet";
  import { iconForSnippet } from "../../helpers/snippet_icon";
  import type { TranslationSet } from "../../helpers/translation_processor";
  import { previewGroupFromTranslate } from "../../helpers/translation_processor";


  function nthPageBreak(array: Snippet[], n: number) {
    let searchFrom = 0

    while (true) {
      const nextIndex = array.findIndex((snippet, index) => {
        return (index >= searchFrom && snippet instanceof PagebreakSnippet)
      })

      if (n <= 0 || nextIndex < 0) {
        return (n <= 0) ? searchFrom : -1
      } else {
        n -= 1
        searchFrom = nextIndex + 1
      }
    }
  }

  function findPageStartIndex(bookPage: number, snippets: Snippet[]) {
    let found = 0
    if (bookPage && bookPage > 1) {
      found = nthPageBreak(snippets, bookPage - 1)
    }
    return Math.max(found, 0)
  }

  function findPageEndIndex(bookPage: number, snippets: Snippet[]) {
    let found = snippets.length
    if (bookPage) {
      found = nthPageBreak(snippets, bookPage) - 1
      if (found < 0) {
        found = snippets.length;
      }
    }
    return Math.min(found, snippets.length)
  }

  export let snippets: Snippet[];
  export let bookPage: number | undefined;

  export let translationSet: TranslationSet;

  $: pageStartIndex = findPageStartIndex(bookPage, snippets)
  $: pageEndIndex = findPageEndIndex(bookPage, snippets)

  $: slicedSnippets = snippets.slice(pageStartIndex, pageEndIndex)
  $: decoratedSnippets = slicedSnippets.map(snippet => {
    if (snippet instanceof TranslateSnippet) {
      return previewGroupFromTranslate(snippet, translationSet);
    } else {
      return snippet;
    }
  }).map(snippet => {
    if (snippet instanceof LinebreakSnippet) {
      return {
        snippet,
        linebreak: true
      }
    }

    let classes: string[] = []

    if (snippet.underlined) {
      classes.push("underline")
    }
    if (snippet.strikethrough) {
      classes.push("line-through")
    }
    if (snippet.italic) {
      classes.push("italic")
    }
    if (snippet.bold) {
      classes.push("bold")
    }

    let icon = iconForSnippet(snippet)
    if (icon !== null) classes.push("bordered-formatter-preview")

    let color = 'none';
    if (snippet.color !== 'none') {
      color = getCSSHEX(snippet.color);
    }

    return {
      snippet,
      className: classes.join(" "),
      color,
      icon
    }
  })
</script>

{#each decoratedSnippets as snippetInfo}<!--
-->{#if snippetInfo.linebreak}<!--
  --><br /><!--
-->{:else}<!--
  --><span class={snippetInfo.className} style={`color: ${snippetInfo.color}`}><!--
    -->{#if snippetInfo.icon}<!--
      --><svelte:component this={snippetInfo.icon} /><!--
    -->{/if}<!--
    -->{#if snippetInfo.snippet instanceof TextSnippet}<!--
      -->{ snippetInfo.snippet.text }<!--
    -->{:else if snippetInfo.snippet instanceof KeybindSnippet}<!--
      -->{ snippetInfo.snippet.keybind }<!--
    -->{:else if snippetInfo.snippet instanceof ScoreboardObjectiveSnippet}<!--
      -->{ snippetInfo.snippet.score_objective }@{ snippetInfo.snippet.score_name }<!--
    -->{:else if snippetInfo.snippet instanceof SelectorSnippet}<!--
      -->{ snippetInfo.snippet.selector }<!--
    -->{:else if snippetInfo.snippet instanceof NBTSnippet}<!--
      -->{ snippetInfo.snippet.nbt}@{snippetInfo.snippet.storage }<!--
    -->{:else if snippetInfo.snippet instanceof GroupSnippet}<!--
      --><svelte:self snippets={snippetInfo.snippet.children} {translationSet} /><!--
    -->{:else if snippetInfo.snippet instanceof LinebreakSnippet}<!--
      --><br /><!--
    -->{:else if snippetInfo.snippet instanceof PagebreakSnippet}<!--
      --><br /><!--
      -->-- page break<!--
      --><br /><!--
    -->{/if}<!--
  --></span><!--
-->{/if}<!--
-->{/each}

<style>
  .underline {
    text-decoration: underline;
  }

  .line-through {
    text-decoration: line-through;
  }

  .underline.line-through {
    text-decoration: underline line-through;
  }

  .bold {
    font-weight: bold;
  }

  .italic {
    font-style: italic;
  }

  .bordered-formatter-preview {
    border-style: solid;
    border-width: 2px;
    border-radius: 3px;
    border-color: var(--info);
    /* border-color: $info; */
    display: inline-block;
  }
</style>