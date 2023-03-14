<script>
  import { page_key } from "$lib/stores/page_key";
  import { onMount } from "svelte";


  onMount(() => {
    $page_key = "navbar.about";
  });
  
  /** @type {import('./$types').PageData} */
  export let data;

  let remote_office;
  $: remote_office = data.remote_office;
  let board;
  $: board = data.board;
  let organizational_structure;
  $: organizational_structure = data.organizational_structure;
  let ethics_commission;
  $: ethics_commission = data.ethics_commission;
</script>


