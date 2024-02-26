<script>
  export let iconType;
  export let text;
  import Html from '$lib/components/Html.svelte';
  import Infrastrucuture from '$lib/svg/Infrastrucuture.svelte';
  import LikeMinded from '$lib/svg/LikeMinded.svelte';
  import Volunteering from '$lib/svg/Volunteering.svelte';
  import Communicate from '$lib/svg/Communicate.svelte';
  import Box from '$lib/components/Box.svelte';

  const iconSize = 100;
</script>

<Box>
  <div class="grid grid-cols-8">
    <div
      class="col-span-full flex items-center justify-center pb-4 text-base-content md:col-span-2 md:pb-0"
    >
      {#if iconType == 'volunteer'}
        <Volunteering width={iconSize} height={iconSize} />
      {:else if iconType == 'like_minded'}
        <LikeMinded width={iconSize} height={iconSize} />
      {:else if iconType == 'infrastructure'}
        <Infrastrucuture width={iconSize} height={iconSize} />
      {:else if iconType == 'get_in_touch'}
        <Communicate width={iconSize - 10} height={iconSize - 10} />
      {/if}
    </div>
    <div class="col-span-full md:col-span-6">
      <Html source={text} options={'prose-h2:mb-2 px-0'} />
    </div>
  </div>
</Box>
