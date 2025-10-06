<script>
  import ArrowLeft from '../svg/ArrowLeft.svelte';
  import ArrowRight from '../svg/ArrowRight.svelte';
  import {t} from '$lib/stores/i18n';
  import {page} from '$app/stores';
  import {replaceState} from '$app/navigation';
  import {onMount} from 'svelte';

  let {items, perPage, trimmedItems = $bindable()} = $props();

  let totalItems = $derived(items.length);
  let currentPage = $state(0);

  let totalPages = $derived(Math.ceil(totalItems / perPage));
  let start = $derived(currentPage * perPage);
  let end = $derived(
    currentPage === totalPages - 1 ? totalItems - 1 : start + perPage - 1,
  );

  // Initialize page from URL on mount
  onMount(() => {
    const urlPage = $page.url.searchParams.get('page');
    if (urlPage) {
      const pageNum = parseInt(urlPage, 10) - 1; // Convert to 0-based indexing
      if (pageNum >= 0 && pageNum < totalPages) {
        currentPage = pageNum;
      }
    }
  });

  // Handle page navigation with URL update
  function goToPage(newPage) {
    currentPage = newPage;

    // Update URL
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      if (newPage === 0) {
        url.searchParams.delete('page');
      } else {
        url.searchParams.set('page', (newPage + 1).toString());
      }
      replaceState(url.pathname + url.search, {});
    }
  }

  // Reset to page 0 when items change (e.g., new filter applied)
  $effect(() => {
    if (items) {
      const newTotalPages = Math.ceil(items.length / perPage);
      if (currentPage >= newTotalPages && newTotalPages > 0) {
        goToPage(0);
      }
    }
  });

  $effect(() => {
    trimmedItems = items.slice(start, end + 1);
  });
</script>

{#if totalItems && totalItems > perPage}
  <div
    class="pagination pointer-events-auto flex items-center justify-center"
    role="navigation"
    aria-label="Pagination"
  >
    <button
      onclick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 0 ? true : false}
      aria-label={$t('access.previous').text}
    >
      <ArrowLeft width={30} height={30} />
    </button>
    <p class="m-0 mx-2">{start + 1} - {end + 1} of {totalItems}</p>
    <button
      class="flex"
      onclick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages - 1 ? true : false}
      aria-label={$t('access.next').text}
    >
      <ArrowRight width={30} height={30} />
    </button>
  </div>
{/if}
