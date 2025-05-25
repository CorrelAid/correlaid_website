<script>
  import Html from '$lib/components/Html.svelte';
  import Inform from '$lib/svg/Inform.svelte';
  import Team from '$lib/svg/Team.svelte';
  import Finish from '$lib/svg/Finish.svelte';
  import Infrastrucuture from '$lib/svg/Infrastrucuture.svelte';
  import LikeMinded from '$lib/svg/LikeMinded.svelte';
  import BrokenGears from '../svg/BrokenGears.svelte';
  let {steps, color} = $props();
  function checkX(i) {
    i = i + 1;
    if (i & 1) {
      return 'left';
    } else {
      return 'right';
    }
  }

  function checkBorder(i) {
    i = i + 1;
    if (i & 1) {
      return 'border-l-2';
    } else {
      return 'border-r-2';
    }
  }
  function checkOdd(i) {
    i = i + 1;
    if (i & 1) {
      return true;
    } else {
      return false;
    }
  }
  const iconMobile = 150;
  const iconLg = 200;
</script>

<div class="hidden lg:block">
  {#each steps as step, i}
    <div class="relative w-full">
      <div
        class="absolute flex h-full w-1/3 items-center justify-center {checkOdd(
          i,
        ) == true
          ? 'left-0'
          : 'right-0'}"
      >
        <div class="px-4">
          {#if step.icon == 'inform'}
            <Inform width={iconLg} height={iconLg} />
          {:else if step.icon == 'like_minded'}
            <LikeMinded width={iconLg} height={iconLg} />
          {:else if step.icon == 'infrastructure'}
            <Infrastrucuture width={iconLg} height={iconLg} />
          {:else if step.icon == 'team'}
            <Team width={iconLg} height={iconLg} />
          {:else if step.icon == 'broken_gears'}
            <BrokenGears width={iconLg - 20} height={iconLg - 20} />
          {:else if step.icon == 'finish'}
            <Finish width={iconLg} height={iconLg} />
          {/if}
        </div>
      </div>
      <div class="w-2/3 {checkX(i)}-1/3 absolute -z-10 grid h-full grid-cols-2">
        {#if checkOdd(i) == false}
          <div></div>
        {/if}
        <div
          class="{i + 1 === steps.length ? '' : 'border-b-2'} {checkBorder(
            i,
          )} relative -z-10 col-span-1 border-neutral-25 py-12"
        >
          <span
            class="absolute bg-gradient-to-r {color === 'correlaid'
              ? 'from-secondary to-primary'
              : 'from-tertiary to-secondary'} text-lg font-semibold text-white shadow-md {checkX(
              i,
            )}-0 {checkOdd(i)
              ? '-ml-5'
              : '-mr-5'}  top-1/4 flex h-10 w-10 items-center justify-center rounded-full"
            >{i + 1}</span
          >
        </div>
        {#if checkOdd(i) == true}
          <div></div>
        {/if}
      </div>
      <div
        class="z-20 w-2/3 {checkOdd(i)
          ? 'relative left-1/3  pl-7'
          : 'pr-7'} z-20 h-full py-12"
      >
        <Html source={step.text} options={'container mx-auto z-20'} />
      </div>
    </div>
    <div></div>
  {/each}
</div>
<div class="container lg:hidden">
  {#each steps as step, i}
    <div class=" w-full"></div>
    <div
      class="relative mb-12 flex justify-center border-t-2 border-neutral-25"
    >
      <span
        class="absolute top-0 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r {color ===
        'correlaid'
          ? 'from-secondary to-primary'
          : 'from-tertiary to-secondary'} px-4 py-1 text-lg font-semibold text-white shadow-md"
        >{i + 1}</span
      >

      <div class="">
        <div class="my-6 mt-12 flex justify-center">
          <div class="">
            {#if step.icon == 'inform'}
              <Inform width={iconMobile} height={iconMobile} />
            {:else if step.icon == 'like_minded'}
              <LikeMinded width={iconMobile} height={iconMobile} />
            {:else if step.icon == 'infrastructure'}
              <Infrastrucuture width={iconMobile} height={iconMobile} />
            {:else if step.icon == 'team'}
              <Team width={iconMobile} height={iconMobile} />
            {:else if step.icon == 'broken_gears'}
              <BrokenGears width={iconMobile} height={iconMobile} />
            {:else if step.icon == 'finish'}
              <Finish width={iconMobile} height={iconMobile} />
            {/if}
          </div>
        </div>
        <Html source={step.text} />
      </div>
    </div>
  {/each}
</div>
