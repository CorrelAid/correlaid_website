<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import Html from '$lib/components/Html.svelte';
  import Person from '$lib/components/Person.svelte';

  onMount(() => {
    $pageKey = 'navbar.about.team';
  });
  export let data;

  $: remoteOffice = data.remoteOffice;
  $: board = data.board;
  $: remoteOfficeDescription = data.remoteOfficeDescription;
  $: boardDescription = data.boardDescription;
</script>

<div class="mt-12">
  <Html source={remoteOfficeDescription} options={'pb-12  mx-auto'} />

  <div class="container mx-auto flex flex-col gap-y-8 px-4 pb-12">
    {#each remoteOffice as person}
      <Person {...person} />
    {/each}
  </div>

  <Html source={boardDescription} options={'mx-auto pb-12'} />

  <div class="container mx-auto flex flex-col gap-y-8 px-4 pb-12">
    {#each board as person}
      <Person {...person} />
    {/each}
  </div>
</div>
