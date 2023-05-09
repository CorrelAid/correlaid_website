<script>
  import Carousel from 'svelte-carousel';
  import {browser} from '$app/environment';
  import {gen_img_url} from '$lib/js/helpers';
  import {t} from '$lib/stores/i18n';
  export let text_only = false;
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
  class="relative border bg-gradient-to-r from-primary-75 to-secondary-75 text-white"
>
  <div class="container mx-auto">
    {#if browser}
      <!-- https://github.com/vadimkorr/svelte-carousel/issues/29 -->
      {#key quotes}
        <Carousel bind:this={carousel} arrows={false} dots={false}>
          {#each quotes as quote}
            <div class="pt-2">
              {#if text_only === false}
                <div class="grid px-3 xl:grid-cols-2">
                  <div class="flex flex-col items-center pt-4">
                    {#if quote.quote_id.image}
                      <img
                        class="h-40 w-72 rounded object-cover"
                        alt="Logo/Photo {quote.quote_id.translations[0]
                          .subtitle}"
                        src={gen_img_url(quote.quote_id.image.id)}
                      />
                    {:else}
                      <div class="h-40 w-72 bg-neutral object-cover" />
                    {/if}
                  </div>

                  <div class=" pt-4">
                    <p class="line-clamp-7 text-justify drop-shadow-md">
                      {quote.quote_id.translations[0].text}
                    </p>
                    <p class="mt-2 text-lg font-semibold drop-shadow-md">
                      {quote.quote_id.translations[0].subtitle}
                    </p>
                  </div>
                </div>
              {:else}
                <div class="px-3">
                  <p
                    class="line-clamp-7 pt-8 text-justify text-lg drop-shadow-md"
                  >
                    {quote.quote_id.translations[0].text}
                  </p>
                  <p
                    class="line-clamp-7 pt-6 text-justify text-lg font-semibold drop-shadow-md"
                  >
                    {quote.quote_id.translations[0].subtitle}
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
