<script>
  export let href;
  export let text;
  export let category;
  export let options = '';
  import DropdownIcon from '$lib/svg/Dropdown_Icon.svelte';
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  let menuEnterTimer;
  let aria = false;

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
  on:mouseover={delay}
  on:mouseleave={() => {
    (aria = false), clearTimeout(menuEnterTimer);
  }}
  on:focus={dropdown}
  on:click={() => {
    dispatch('click', {});
  }}
>
  {text}
  <DropdownIcon height={20} width={20} />
</a>
