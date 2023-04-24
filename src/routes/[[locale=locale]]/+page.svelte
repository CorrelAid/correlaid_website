<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import CTA from '$lib/components/CTA.svelte';

  onMount(() => {
    $page_key = 'navbar.home';
  });
</script>

<CTA />
