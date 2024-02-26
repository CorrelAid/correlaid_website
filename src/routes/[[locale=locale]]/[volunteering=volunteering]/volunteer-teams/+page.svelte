<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';

  onMount(() => {
    $pageKey = 'navbar.volunteering.volunteer_teams';
  });
</script>
