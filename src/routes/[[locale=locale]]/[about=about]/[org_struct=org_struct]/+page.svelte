<script>
  import { page_key } from "$lib/stores/page_key.js";
  import { onMount } from "svelte";
 import Mermaid from "$lib/components/Mermaid.svelte";


  onMount(() => {
   
    $page_key = "navbar.about.org_struct";
  });
</script>

<div class="container mx-auto max-w-screen">
<div class="lg:w-6/12 mx-auto">
<Mermaid>
  graph TD
    A[Enter Chart Definition] --> B(Preview)
    C --> D[Keep]
    C --> E[Edit Definition]
    E --> B
    D --> F[Save Image and Code]
    F --> B
</Mermaid>
</div>
</div>