<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';

  onMount(() => {
    $pageKey = 'footer.privacy_policy';
  });
</script>
