<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import Box from '$lib/components/Box.svelte';
  import Map from '$lib/components/singleUse/Map.svelte';
  import 'maplibre-gl/dist/maplibre-gl.css';

  onMount(() => {
    $pageKey = 'navbar.volunteering.correlaidx';
  });

  export let data;

  let geoJson;
  $: geoJson = data.geoJson;
  let localChapters;
  $: localChapters = data.localChapters;
</script>

<div class="px-4">
  <div class="">
    <div class="mb-16 grid grid-cols-2 gap-7">
      {#each localChapters as lc}
        <a href={lc.href}>
          <Box type={'correlaidx'}>
            <h2 class="">{lc.city}</h2>
          </Box>
        </a>
      {/each}
    </div>
  </div>
  <div class="relative mt-12 hidden xl:block">
    <Map {geoJson} />
  </div>
</div>
