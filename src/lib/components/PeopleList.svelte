<script>
  import Person from '$lib/components/Person.svelte';
  export let people;
</script>

<div class="container flex flex-col gap-y-8 px-4">
  {#each people as person}
    <Person {...person} />
  {/each}
</div>
