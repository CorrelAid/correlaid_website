<script>
  export let href;
  export let text;
  export let type = '';
  export let color;
  export let options = '';
  export let downloadText = '';
  import ExternalLink from '../svg/External_Link.svelte';
  import Calendar from '../svg/Calendar.svelte';

  // dafuq
  $: if (color == 'bg-quaternary') {
    color = 'bg-quaternary';
  }
  $: if (color == 'bg-primary') {
    color = 'bg-primary';
  }
  $: if (color == 'bg-secondary') {
    color = 'bg-secondary';
  }
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
        class="ml-1 inline-block whitespace-nowrap align-text-top"
        ><ExternalLink height={20} width={20} /></span
      >
    {:else if type == 'calendar'}
      <span class="ml-1 ml-3 inline-block whitespace-nowrap align-text-bottom">
        <Calendar height={20} width={20} color={'white'} />
      </span>
    {/if}
  </span>
</a>
