<script>
  import LeftArrow from './LeftArrow.svelte';
  import RightArrow from './RightArrow.svelte';
  import {createEventDispatcher} from 'svelte/internal';
  const dispatch = createEventDispatcher();
  export let current_page = 1;
  export let number_of_items = 120;
  export let items_per_page = 5;
  const height = 12;
  const width = 12;
  $: number_of_pages = Math.ceil(number_of_items / items_per_page);
  let pages = [];
  function buildArr(c, n) {
    if (n <= 7) {
      return [...Array(n)].map((_, page) => page + 1);
    } else {
      if (c < 3 || c > n - 2) {
        return [1, 2, 3, '...', n - 2, n - 1, n];
      } else {
        return [1, '...', c - 1, c, c + 1, '...', n];
      }
    }
  }
  function setPages() {
    pages = buildArr(current_page, number_of_pages);
  }
  $: if (current_page) {
    setPages();
  }
  $: if (items_per_page) {
    setPages();
    current_page = 1;
  }
  $: if (number_of_items) {
    number_of_pages = Math.ceil(number_of_items / items_per_page);
    current_page = current_page || 1;
  }
  function setCurrentPage(page) {
    if (isNaN(page)) return;
    current_page = page;
    dispatch('navigate', current_page);
  }
</script>

<div class="flex">
  <div
    class="h-{height} w-{width} mr-1 flex items-center justify-center rounded-full
      {current_page > 1 ? 'cursor-pointer' : 'text-grey'}"
    on:click={() => current_page > 1 && setCurrentPage(current_page - 1)}
  >
    <LeftArrow class="w-{width / 2} h-{height / 2}" />
  </div>
  <div class="flex h-{height} rounded-full font-medium">
    {#each pages as page}
      <div
        class="w-{width} cursor-pointer select-none items-center justify-center
      leading-5 transition duration-150 ease-in sm:flex {page == current_page
          ? `text-green rounded-full bg-green-600`
          : 'rounded-full'}
      "
        on:click={() => setCurrentPage(page)}
      >
        {page}
      </div>
    {/each}
    <div
      class="w-{width} h-{height} flex cursor-pointer select-none items-center justify-center
        rounded-full bg-green-600 leading-5 text-white transition duration-150 ease-in sm:hidden"
    >
      {current_page}
    </div>
  </div>
  <div
    class="h-{height} w-{width} ml-1 flex items-center justify-center rounded-full bg-gray-200
      {current_page < number_of_pages ? 'cursor-pointer' : 'text-gray'}"
    on:click={() =>
      current_page < number_of_pages && setCurrentPage(current_page + 1)}
  >
    <RightArrow class="w-{width / 2} h-{height / 2}" />
  </div>
</div>
