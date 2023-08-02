<script>
  import {page} from '$app/stores';
  import {locale} from '$lib/stores/i18n';

  // Sincching failed per definition for 404 matchers cannot be used
  $: if ($page.url.pathname.includes('/en/')) {
    $locale = 'en';
  }

  $: msg = $locale === 'de' ? 'Nicht gefunden' : 'Not found';
</script>

<div class="mx-auto my-52 w-fit text-3xl font-bold">
  <h1>{msg} &#x1F615;</h1>
</div>
