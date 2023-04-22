<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Person from '$lib/components/Person.svelte';
  import {gen_img_url} from '$lib/js/helpers';

  onMount(() => {
    $page_key = 'navbar.about.partners';
  });

  export let data;
  let partners;
  $: partners = data.partners;
</script>

<div class="mt-12">
  <div class="container mx-auto flex flex-col gap-y-3 space-y-8 pb-12">
    {#each partners as partner}
      <Person
        is_partner={true}
        name={partner.name}
        img={gen_img_url(partner.logo.id, 'fit=cover&quality=100')}
        description={partner.translations[0].description}
      />
    {/each}
  </div>
</div>
