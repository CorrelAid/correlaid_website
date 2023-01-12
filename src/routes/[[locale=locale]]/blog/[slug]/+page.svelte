<script>
  import { page } from "$app/stores";
  import CkEditor from "$lib/components/CKEditor.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<CkEditor source = {data.text}/>


