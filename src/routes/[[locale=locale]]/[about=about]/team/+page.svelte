<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {gen_img_url} from '$lib/js/helpers';
  import Html from '$lib/components/Html.svelte';
  import Person from '$lib/components/Person.svelte';

  onMount(() => {
    $page_key = 'navbar.about.team';
  });
  export let data;
  let remote_office;
  let board;
  $: remote_office = data.remote_office;
  $: board = data.board;

  let organizational_structure;
  $: organizational_structure = data.organizational_structure;

  $: console.log(remote_office);
</script>

<div class="mt-12">
  <Html
    source={organizational_structure.translations[0].remote_office}
    options={'pb-12 px-0'}
    width={'text'}
  />

  <div class="container mx-auto flex flex-col gap-y-3 space-y-8 pb-12">
    {#each remote_office as person}
      <Person
        name={person.person.name}
        email={person.person.email}
        img={gen_img_url(
          person.person.image.id,
          'fit=cover&width=200&height=200&quality=80',
        )}
        position={person.translations[0].position}
        description={person.translations[0].description}
        pronouns={person.person.translations[0]
          ? person.person.translations[0].pronouns
          : null}
      />
    {/each}
  </div>

  <Html
    source={organizational_structure.translations[0].board}
    options={'pb-12'}
    width={'text'}
  />

  <div class="container mx-auto flex flex-col gap-y-3 space-y-8 pb-12">
    {#each board as person}
      <Person
        name={person.person.name}
        email={person.person.email}
        img={gen_img_url(
          person.person.image.id,
          'fit=cover&width=200&height=200&quality=80',
        )}
        position={person.translations[0].position}
        description={person.translations[0].description}
      />
    {/each}
  </div>
</div>
