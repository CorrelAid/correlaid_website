<script>
  export let source;
  export let options = '';

  const h1 = 'prose-h1:text-3xl prose-h1:text-base-content';
  const h2 = 'prose-h2:text-2xl prose-h2:text-base-content';
  const a =
    'prose-a:text-secondary prose-a:no-underline prose-a:font-normal hover:prose-a:underline';

  const typography = `${h1} ${h2} ${a}`;
</script>

<!-- see app.css for more prose adjustments -->
<article
  class="text_width prose max-w-none px-4 text-neutral {typography} {options}"
>
  {@html source}
</article>
