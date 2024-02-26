<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import Awards from '$lib/components/Awards.svelte';

  onMount(() => {
    $pageKey = 'navbar.about';
  });
  export let data;
  $: awards = data.awards;

  function indexToImagePosition(award, index) {
    award.imageOnRightSide = index % 2 === 0;
    return award;
  }
</script>

<div class="container mx-auto flex flex-col gap-y-8 space-y-20 pb-12">
  {#each awards as award, index}
    <Awards {...indexToImagePosition(award, index)} />
  {/each}
</div>
