<script>
  import {page} from '$app/stores';
  import {get_locale} from '$lib/js/helpers';
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import Box from '$lib/components/Box.svelte';
  import Map from '$lib/components/single_use/Map.svelte';
  import 'maplibre-gl/dist/maplibre-gl.css';

  onMount(() => {
    $page_key = 'navbar.community.correlaidx';
  });

  export let data;

  let geo_json;
  $: geo_json = data.geo_json;
  let local_chapters;
  $: local_chapters = data.local_chapters;
</script>

<div class="px-4">
  <div class="">
    <div class="mb-16 grid grid-cols-2 gap-7">
      {#each local_chapters as local_chapter}
        <a
          href={`${
            get_locale($page.params) == 'de' ? '' : '/en'
          }/community/correlaidx/${local_chapter.translations[0].city}`}
        >
          <Box type={'correlaidx'}>
            <h2 class="">{local_chapter.translations[0].city}</h2>
          </Box>
        </a>
      {/each}
    </div>
  </div>
  <div class="relative mt-12 hidden xl:block">
    <Map {geo_json} />
  </div>
</div>
