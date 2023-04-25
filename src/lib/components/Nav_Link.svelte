<script>
  export let href;
  export let text;
  export let options = '';
</script>

<a
  class="inline-flex items-center justify-center tracking-wide transition hover:text-secondary {options}"
  {href}
>
  {text}
</a>
