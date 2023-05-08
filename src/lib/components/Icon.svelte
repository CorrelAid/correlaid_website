<script>
  export let icon_type;
  export let text;
  import Html from '$lib/components/Html.svelte';
  import Infrastrucuture from '$lib/svg/Infrastrucuture.svelte';
  import LikeMinded from '$lib/svg/LikeMinded.svelte';
  import Volunteering from '$lib/svg/Volunteering.svelte';
  import Communicate from '$lib/svg/Communicate.svelte';
  import Box from '$lib/components/Box.svelte';

  const icon_size = 100;
</script>

<Box>
  <div class="grid grid-cols-8">
    <div
      class="col-span-full flex justify-center pb-4 text-base-content md:col-span-2 md:pb-0"
    >
      {#if icon_type == 'volunteer'}
        <Volunteering width={icon_size} height={icon_size} />
      {:else if icon_type == 'like_minded'}
        <LikeMinded width={icon_size} height={icon_size} />
      {:else if icon_type == 'infrastructure'}
        <Infrastrucuture width={icon_size} height={icon_size} />
      {:else if icon_type == 'get_in_touch'}
        <Communicate width={icon_size - 10} height={icon_size - 10} />
      {/if}
    </div>
    <div class="col-span-full md:col-span-6">
      <Html source={text} options={'prose-h2:mb-2 px-0'} />
    </div>
  </div>
</Box>
