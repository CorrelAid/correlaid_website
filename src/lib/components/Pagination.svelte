<script>
  import ArrowLeft from '../svg/ArrowLeft.svelte';
  import ArrowRight from '../svg/ArrowRight.svelte';
  import {t} from '$lib/stores/i18n';
  import {page} from '$app/stores';
  import {goto} from '$app/navigation';

  let {items, perPage, trimmedItems = $bindable()} = $props();

  let totalItems = $derived(items.length);
  let currentPage = $state(0);
  let urlLoadComplete = $state(false);
  let previousItemsLength = $state(0);

  let totalPages = $derived(Math.ceil(totalItems / perPage));
  let start = $derived(currentPage * perPage);
  let end = $derived(
    currentPage === totalPages - 1 ? totalItems - 1 : start + perPage - 1,
  );

  // Sync currentPage with URL parameter changes (including browser back/forward)
  $effect(() => {
    if (totalPages > 0) {
      const urlPage = $page.url.searchParams.get('page');
      const urlPageNum = urlPage ? parseInt(urlPage, 10) - 1 : 0;

      // Update currentPage if URL differs from current state
      if (
        urlPageNum >= 0 &&
        urlPageNum < totalPages &&
        urlPageNum !== currentPage
      ) {
        currentPage = urlPageNum;
      } else if (!urlPage && urlPageNum === 0 && currentPage !== 0) {
        // If no page param in URL, go to page 0
        currentPage = 0;
      }

      urlLoadComplete = true;
    }
  });

  // Handle page navigation with URL update
  function goToPage(newPage) {
    // Update only the page param without rewriting entire URL
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);

      // Only modify page parameter
      if (newPage === 0) {
        url.searchParams.delete('page');
      } else {
        url.searchParams.set('page', (newPage + 1).toString());
      }

      const newUrl = url.pathname + url.search;
      goto(newUrl, {replaceState: true, noScroll: true, keepFocus: true});
      // Note: currentPage will be updated by the $effect that watches $page.url
    }
  }

  // Reset to page 0 when items change (e.g., new filter applied)
  $effect(() => {
    if (items && urlLoadComplete) {
      const newLength = items.length;
      // Only reset if items length actually changed (filter was applied)
      if (newLength !== previousItemsLength) {
        previousItemsLength = newLength;
        const newTotalPages = Math.ceil(newLength / perPage);
        if (currentPage >= newTotalPages && newTotalPages > 0) {
          goToPage(0);
        }
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
