<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';

  onMount(() => {
    $pageKey = 'navbar.education.tidy_tuesday';
  });
</script>
