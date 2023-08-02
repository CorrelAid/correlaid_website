<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Html from '$lib/components/Html.svelte';
  import Person from '$lib/components/Person.svelte';

  onMount(() => {
    $page_key = 'navbar.about.team';
  });
  export let data;

  $: remote_office = data.remote_office;
  $: board = data.board;
  $: remote_office_description = data.remote_office_description;
  $: board_description = data.board_description;
</script>

<div class="mt-12">
  <Html source={remote_office_description} options={'pb-12  mx-auto'} />

  <div class="container mx-auto flex flex-col gap-y-8 px-4 pb-12">
    {#each remote_office as person}
      <Person {...person} />
    {/each}
  </div>

  <Html source={board_description} options={'mx-auto pb-12'} />

  <div class="container mx-auto flex flex-col gap-y-8 px-4 pb-12">
    {#each board as person}
      <Person {...person} />
    {/each}
  </div>
</div>
