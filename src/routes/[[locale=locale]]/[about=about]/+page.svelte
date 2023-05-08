<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Awards from '$lib/components/Awards.svelte';
  import {parseEntries} from '$lib/js/parse_cms.js';

  onMount(() => {
    $page_key = 'navbar.about';
  });
  export let data;
  $: awards = parseEntries(data.Awards, 'awards');

  function indexToImagePosition(award, index) {
    award.imageOnRightSide = index % 2 === 0;
    return award;
  }
</script>

<div class="container mx-auto flex flex-col gap-y-3 space-y-8 pb-12">
  {#each awards as award, index}
    <Awards {...indexToImagePosition(award, index)} />
  {/each}
</div>
