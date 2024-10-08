<script>
  export let source;
  export let options = '';
  import 'highlight.js/styles/base16/google-dark.css';

  import hljs from 'highlight.js';

  const h1 =
    'prose-h1:text-2xl prose-h1:md:text-3xl prose-h1:text-base-content';
  const h2 =
    'prose-h2:text-xl prose-h2:md:text-2xl prose-h2:text-base-content prose-h2:mb-3';
  const h3 = 'prose-h3:text-base-content prose-h3:mb-2';
  const p = 'prose-p:text-md ';
  const a = 'prose-a:text-secondary  prose-a:font-normal ';
  const li = 'marker:prose-li:text-secondary';
  const typography = `${h1} ${h2} ${h3} ${p} ${a} ${li}`;

  // This is not prebuilt
  function postProcess(node) {
    node.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
    node.querySelectorAll('img').forEach((block) => {
      if (block.getAttribute('title')) {
        const figure = document.createElement('figure');
        const caption = document.createElement('figcaption');
        caption.innerHTML = block.getAttribute('title');
        caption.className = 'text-xs text-base-content mt-2';
        figure.appendChild(block.cloneNode(true));

        block.parentNode.replaceChild(figure, block);
        figure.appendChild(caption);
        //
      }
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
  class="container prose max-w-none px-4 text-neutral {typography} {options}"
  use:postProcess
>
  {@html source}
</article>
