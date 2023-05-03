<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {gen_img_url} from '$lib/js/helpers';
  import Awards from '../../../lib/components/Awards.svelte';

  onMount(() => {
    $page_key = 'navbar.about';
  });
  export let data;
  let awards;
  $: awards = data.awards;
</script>

<div class="container mx-auto flex flex-col gap-y-3 space-y-8 pb-12">
  {#each awards.Awards as award, index}
    <Awards
      year={award.year}
      imageOnRightSide={index % 2 == 0 ? true : false}
      image={gen_img_url(
        award.image.id,
        'fit=cover&width=392&height=240&quality=80',
      )}
      alt={award.translations[0].image_alt}
      title={award.translations[0].title}
    />
  {/each}
</div>
