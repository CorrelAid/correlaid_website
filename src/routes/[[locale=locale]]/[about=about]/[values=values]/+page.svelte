<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Person from '$lib/components/Person.svelte';
  import {gen_img_url} from '$lib/js/helpers';
  import Html from '$lib/components/Html.svelte';

  onMount(() => {
    $page_key = 'navbar.about.values';
  });

  export let data;

  let ethics_commission;
  $: ethics_commission = data.ethics_commission;

  let organizational_structure;
  $: organizational_structure = data.organizational_structure;
</script>

<Html
  source={organizational_structure.translations[0].ethics_commission}
  options={'pb-12'}
  width={'text'}
/>
<div class="container mx-auto flex flex-col gap-y-3 space-y-8 pb-12">
  {#each ethics_commission as person}
    <Person
      name={person.person.name}
      img={gen_img_url(
        person.person.image.id,
        'fit=cover&width=200&height=200&quality=80',
      )}
      email={person.person.email}
      position={person.translations[0].position}
      description={person.translations[0].description}
    />
  {/each}
</div>
