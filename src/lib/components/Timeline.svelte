<script>
  export let steps;
  export let color;
  import Html from '$lib/components/Html.svelte';
  import Inform from '$lib/svg/Inform.svelte';
  import Team from '$lib/svg/Team.svelte';
  import Finish from '$lib/svg/Finish.svelte';
  import Infrastrucuture from '$lib/svg/Infrastrucuture.svelte';
  import LikeMinded from '$lib/svg/LikeMinded.svelte';
  function check_x(i) {
    i = i + 1;
    if (i & 1) {
      return 'left';
    } else {
      return 'right';
    }
  }

  function check_border(i) {
    i = i + 1;
    if (i & 1) {
      return 'border-l-2';
    } else {
      return 'border-r-2';
    }
  }
  function check_odd(i) {
    i = i + 1;
    if (i & 1) {
      return true;
    } else {
      return false;
    }
  }
  const icon_mobile = 150;
  const icon_lg = 200;
  $: console.log(steps);
</script>

<div class="hidden lg:block">
  {#each steps as step, i}
    <div class="relative w-full">
      <div
        class="absolute flex h-full w-1/3 items-center justify-center {check_odd(
          i,
        ) == true
          ? 'left-0'
          : 'right-0'}"
      >
        <div class="px-4">
          {#if step.timeline_steps_id.icon == 'inform'}
            <Inform width={icon_lg} height={icon_lg} />
          {:else if step.timeline_steps_id.icon == 'like_minded'}
            <LikeMinded width={icon_lg} height={icon_lg} />
          {:else if step.timeline_steps_id.icon == 'infrastructure'}
            <Infrastrucuture width={icon_lg} height={icon_lg} />
          {:else if step.timeline_steps_id.icon == 'team'}
            <Team width={icon_lg} height={icon_lg} />
          {:else if step.timeline_steps_id.icon == 'finish'}
            <Finish width={icon_lg} height={icon_lg} />
          {/if}
        </div>
      </div>
      <div
        class="w-2/3 {check_x(i)}-1/3 absolute -z-10 grid h-full grid-cols-2"
      >
        {#if check_odd(i) == false}
          <div />
        {/if}
        <div
          class="{i + 1 === steps.length ? '' : 'border-b-2'} {check_border(
            i,
          )} relative -z-10 col-span-1 border-neutral-25 py-12"
        >
          <span
            class="absolute bg-gradient-to-r {color === 'correlaid'
              ? 'from-secondary to-primary'
              : 'from-tertiary to-secondary'} text-lg font-semibold text-white shadow-md {check_x(
              i,
            )}-0 {check_odd(i)
              ? '-ml-5'
              : '-mr-5'}  top-1/4 flex h-10 w-10 items-center justify-center rounded-full"
            >{i + 1}</span
          >
        </div>
        {#if check_odd(i) == true}
          <div />
        {/if}
      </div>
      <div
        class="z-20 w-2/3 {check_odd(i)
          ? 'relative left-1/3  pl-7'
          : 'pr-7'} z-20 h-full py-12"
      >
        <Html
          source={step.timeline_steps_id.translations[0].text}
          options={'container mx-auto z-20'}
        />
      </div>
    </div>
    <div />
  {/each}
</div>
<div class="container lg:hidden">
  {#each steps as step, i}
    <div class=" w-full" />
    <div
      class="relative mb-12 flex justify-center border-t-2 border-neutral-25"
    >
      <span
        class="absolute top-0 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-tertiary to-secondary px-4 py-1 text-lg font-semibold text-white shadow-md"
        >{i + 1}</span
      >

      <div class="">
        <div class="my-6 mt-12 flex justify-center">
          <div class="">
            {#if step.timeline_steps_id.icon == 'inform'}
              <Inform width={icon_mobile} height={icon_mobile} />
            {:else if step.timeline_steps_id.icon == 'like_minded'}
              <LikeMinded width={icon_mobile} height={icon_mobile} />
            {:else if step.timeline_steps_id.icon == 'infrastructure'}
              <Infrastrucuture width={icon_mobile} height={icon_mobile} />
            {:else if step.timeline_steps_id.icon == 'team'}
              <Team width={icon_lg} height={icon_lg} />
            {:else if step.timeline_steps_id.icon == 'finish'}
              <Finish width={icon_lg} height={icon_lg} />
            {/if}
          </div>
        </div>
        <Html source={step.timeline_steps_id.translations[0].text} />
      </div>
    </div>
  {/each}
</div>
