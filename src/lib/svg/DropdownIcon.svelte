<script>
  export let width;
  export let height;
  export let direction = 'down';
</script>

<svg
  {width}
  {height}
  class="z-0"
  style="z-index: -1;"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#3c3c3b"
  transform={direction === 'up' ? 'rotate(180) translate(0, 0)' : ''}
>
  <path
    fill-rule="evenodd"
    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
    clip-rule="evenodd"
  />
</svg>
