<script>
  export let source;
  export let options = '';
  import 'highlight.js/styles/base16/google-dark.css';

  import hljs from 'highlight.js';

  const h1 = 'prose-h1:text-3xl prose-h1:text-base-content';
  const h2 = 'prose-h2:text-2xl prose-h2:text-base-content';
  const a =
    'prose-a:text-secondary prose-a:no-underline prose-a:font-normal hover:prose-a:underline';
  // const li = "marker:prose-li:text-primary"
  const typography = `${h1} ${h2} ${a}`;

  function foo(node) {
    node.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });

    return {
      destroy() {
        // the node has been removed from the DOM
      },
    };
  }
</script>

<!-- see app.css for more prose adjustments -->
<article
  class="text_width prose max-w-none px-4 text-neutral {typography} {options}"
  use:foo
>
  {@html source}
</article>
