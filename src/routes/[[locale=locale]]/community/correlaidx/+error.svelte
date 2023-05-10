<script>
  import {page} from '$app/stores';
  import {locale} from '$lib/stores/i18n';

  $: errorMsg =
    $locale === 'de' ? 'Fehler bei Local Chapter' : 'Local Chapter error';
  console.error($page.error);
</script>

<div class="mx-auto my-52 w-fit text-3xl font-bold">
  <h1>{errorMsg} &#x1F615;</h1>
</div>
