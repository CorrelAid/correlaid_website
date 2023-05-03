<script>
  export let href;
  export let text;
  export let type = '';
  export let color;
  export let options = '';
  import ExternalLink from '../svg/External_Link.svelte';

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

<div>
  <a
    class="inline-flex min-w-36 items-center justify-center rounded-md px-4 py-2 font-semibold text-white shadow-md transition {String(
      color,
    )} {options}"
    {href}
  >
    {text}
    {#if type == 'external'}<span class="ml-1.5"
        ><ExternalLink height={20} width={20} /></span
      >{/if}
  </a>
</div>
