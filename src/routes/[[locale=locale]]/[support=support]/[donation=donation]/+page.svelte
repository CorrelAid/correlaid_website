<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';

  onMount(() => {
    pageKey.set('navbar.support.donation');
  });
</script>

<!-- Twingle Donation Widget -->
<div class="container mx-auto">
  <iframe
    title="Twingle Widget"
    src="https://spenden.twingle.de/correlaid/spenden-subpage/tw68fb492481ea4/form"
    style="width: 100%; border: none; overflow: hidden; height: 450px; position: relative; z-index: 2;"
    allow="payment"
  ></iframe>
</div>

<svelte:head>
  <script src="https://spenden.twingle.de/embed/generic" async></script>
</svelte:head>
