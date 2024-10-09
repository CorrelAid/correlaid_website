<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import {t} from '$lib/stores/i18n';
  import Partner from '$lib/components/Partner.svelte';

  onMount(() => {
    $pageKey = 'navbar.about.impact';
  });
</script>
