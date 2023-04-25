<script>
  export let href;
  export let text;
  export let type = '';
  export let color;
  import ExternalLink from '../svg/External_Link.svelte';

  // dafuq
  $: if (color != 'bg-secondary') {
    color = 'bg-primary';
  }
</script>

<a
  class="inline-flex items-center rounded-md px-4 py-2 font-medium text-white shadow transition {String(
    color,
  )}"
  {href}
>
  {text}
  {#if type == 'external'}<span class="ml-1.5"
      ><ExternalLink height={20} width={20} /></span
    >{/if}
</a>
