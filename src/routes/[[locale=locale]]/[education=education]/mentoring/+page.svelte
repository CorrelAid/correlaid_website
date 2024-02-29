<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';

  onMount(() => {
    $pageKey = 'navbar.education.mentoring';
  });
</script>
