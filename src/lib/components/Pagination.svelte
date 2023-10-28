<script>
  import ArrowLeft from '../svg/Arrow_Left.svelte';
  import ArrowRight from '../svg/Arrow_Right.svelte';

  export let items;
  export let perPage;
  export let trimmedItems;

  $: totalItems = items.length;
  $: currentPage = 0;
  $: totalPages = Math.ceil(totalItems / perPage);
  $: start = currentPage * perPage;
  $: end =
    currentPage === totalPages - 1 ? totalItems - 1 : start + perPage - 1;

  $: trimmedItems = items.slice(start, end + 1);

  $: totalItems, (currentPage = 0);
  $: currentPage, start, end;
</script>

{#if totalItems && totalItems > perPage}
  <div class="pagination">
    <button
      on:click={() => (currentPage -= 1)}
      disabled={currentPage === 0 ? true : false}
      aria-label="left arrow icon"
      aria-describedby="prev"
    >
      <ArrowLeft width={30} height={30} />
    </button>
    <p>{start + 1} - {end + 1} of {totalItems}</p>
    <button
      on:click={() => (currentPage += 1)}
      disabled={currentPage === totalPages - 1 ? true : false}
      aria-label="right arrow icon"
      aria-describedby="next"
    >
      <ArrowRight width={30} height={30} />
    </button>
  </div>
{/if}

<style>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: all;
  }
  .pagination p {
    margin: 0 1rem;
  }
  button {
    display: flex;
  }
</style>
