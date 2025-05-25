<script>
  import DropdownIcon from '$lib/svg/DropdownIcon.svelte';
  import {createEventDispatcher} from 'svelte';
  /**
   * @typedef {Object} Props
   * @property {any} href
   * @property {any} text
   * @property {any} category
   * @property {string} [options]
   */

  /** @type {Props} */
  let {href, text, category, options = ''} = $props();

  const dispatch = createEventDispatcher();

  let menuEnterTimer = $state();
  let aria = $state(false);

  function dropdown() {
    dispatch('message', {
      category: category,
    });
  }

  function delay() {
    menuEnterTimer = setTimeout(function () {
      aria = true;
      dropdown();
    }, 110);
  }
</script>

<a
  class="inline-flex items-center justify-center tracking-wide transition hover:text-secondary {options}"
  aria-expanded={aria}
  {href}
  onmouseover={delay}
  onmouseleave={() => {
    (aria = false), clearTimeout(menuEnterTimer);
  }}
  onfocus={dropdown}
  onclick={() => {
    dispatch('click', {});
  }}
>
  {text}
  <DropdownIcon height={20} width={20} />
</a>
