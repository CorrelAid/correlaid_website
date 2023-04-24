<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Person from '$lib/components/Person.svelte';
  import {gen_img_url} from '$lib/js/helpers';
  import Html from '$lib/components/Html.svelte';

  onMount(() => {
    $page_key = 'navbar.using_data.consulting';
  });

  export let data;
  let experts;
  $: experts = data.experts;
</script>

<div class="container mx-auto flex flex-col gap-y-3 space-y-8 py-8">
  {#each experts as person}
    <Person
      name={person.person.name}
      img={gen_img_url(
        person.person.image.id,
        'fit=cover&width=200&height=200&quality=80',
      )}
      position={person.translations[0].area_of_expertise}
      description={person.translations[0].description}
      website={person.person.website ? person.person.website : ''}
      linkedin={person.person.linkedin ? person.person.linkedin : ''}
      mastodon={person.person.mastodon ? person.person.mastodon : ''}
      twitter={person.person.twitter ? person.person.twitter : ''}
      github={person.person.github ? person.person.github : ''}
    />
  {/each}
</div>
