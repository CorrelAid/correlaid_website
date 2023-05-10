<script>
  import {page} from '$app/stores';
  import {locale} from '$lib/stores/i18n';

  $: errorMsg =
    $locale === 'de' ? 'Es ist ein Fehler aufgetreten' : 'An error occurred';
  console.error($page.error);
</script>

<div class="mx-auto my-52 w-fit text-3xl font-bold">
  <h1>{errorMsg} &#x1F615;</h1>
</div>
