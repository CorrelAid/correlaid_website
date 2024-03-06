<script>
  import Carousel from 'svelte-carousel';
  import {browser} from '$app/environment';
  import {t} from '$lib/stores/i18n';
  export let textOnly = false;
  export let quotes;

  const handleNextClick = () => {
    carousel.goToNext();
  };
  const handlePrevClick = () => {
    carousel.goToPrev();
  };
  let carousel;
</script>

<div
  class="relative border bg-gradient-to-r from-secondary-75 to-primary-75 text-white"
>
  <div class="container mx-auto">
    {#if browser}
      <!-- https://github.com/vadimkorr/svelte-carousel/issues/29 -->
      {#key quotes}
        <Carousel bind:this={carousel} arrows={false} dots={false}>
          {#each quotes as quote}
            <div class="pt-6">
              {#if textOnly === false}
                <div class="grid px-4 md:grid-cols-10 md:space-x-6">
                  <div class="flex flex-col items-center md:col-span-4">
                    {#if quote.imageSrc}
                      <div
                        class="relative w-full"
                        style="padding-bottom: 56.25%;"
                      >
                        <img
                          class="absolute left-0 top-0 z-0 h-full w-full"
                          alt="Logo/Photo {quote.subtitle}"
                          src={quote.imageSrc}
                        />
                      </div>
                      {#if quote.imageDesc}
                        <div class="right-0 z-30 w-full opacity-100">
                          <span
                            class="z-0 line-clamp-1 block rounded-b bg-white px-1 py-0.5 text-xs text-black opacity-100"
                            >{quote.imageDesc}</span
                          >
                        </div>
                      {/if}
                    {:else}
                      <div class="h-40 w-72 bg-neutral object-cover" />
                    {/if}
                  </div>

                  <div class="mt-4 md:col-span-6 md:mt-0">
                    <p
                      class="text-md line-clamp-5 drop-shadow-md md:line-clamp-4"
                    >
                      {quote.text}
                    </p>
                    <p
                      class="mt-0.5 line-clamp-1 text-lg font-semibold drop-shadow-md"
                    >
                      {quote.subtitle}
                    </p>
                  </div>
                </div>
              {:else}
                <div class="px-3">
                  <p class="line-clamp-7 pt-8 text-lg drop-shadow-md">
                    {quote.text}
                  </p>
                  <p
                    class="line-clamp-7 pt-6 text-lg font-semibold drop-shadow-md"
                  >
                    {quote.subtitle}
                  </p>
                </div>
              {/if}
            </div>
          {/each}
        </Carousel>
      {/key}
    {/if}
  </div>
  <div class="flex items-center justify-center space-x-8 rounded-b pt-2">
    <button
      class="button my-3 rounded-full bg-neutral-75 px-3 py-1 text-lg font-semibold text-white shadow-md"
      aria-label={$t('access.previous').text}
      on:click={handlePrevClick}>{'<'}</button
    >
    <button
      class="button my-3 rounded-full bg-neutral-75 px-3 py-1 text-lg font-semibold text-white shadow-md"
      aria-label={$t('access.next').text}
      on:click={handleNextClick}>{'>'}</button
    >
  </div>
</div>
