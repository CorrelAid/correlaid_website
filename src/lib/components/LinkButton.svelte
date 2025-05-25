<script>
  import ExternalLink from '../svg/External_Link.svelte';

  let {
    href,
    text,
    type = '',
    color = $bindable(),
    options = '',
    iconSize = 20,
    downloadText = '',
  } = $props();
</script>

<a
  target={type == 'external' ? '__blank' : ''}
  download={downloadText == '' ? null : downloadText}
  rel={type == 'external' ? 'noreferrer' : ''}
  class="block min-w-36 max-w-80 rounded-md px-4 py-2 text-center font-semibold text-white shadow-md transition {String(
    color,
  )} {options}"
  {href}
  ><span>
    {text}{#if type == 'external'}<span
        class="ml-1 inline-block whitespace-nowrap align-text-bottom"
        ><ExternalLink height={iconSize} width={iconSize} /></span
      >
    {/if}
  </span>
</a>
