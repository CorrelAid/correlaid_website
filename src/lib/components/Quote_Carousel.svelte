<script>
  import Carousel from 'svelte-carousel';
  import {browser} from '$app/environment';
  import {gen_img_url} from '$lib/js/helpers';
  export let text_only = false;
  export let quotes;

  let carousel;
</script>

<div class="border bg-gradient-to-r from-primary-75 to-secondary-75 text-white">
  <div class="text_width mx-auto">
    {#if browser}
      <!-- https://github.com/vadimkorr/svelte-carousel/issues/29 -->
      {#key quotes}
        <Carousel bind:this={carousel} arrows={false} dots={true}>
          {#each quotes as quote}
            <div class="">
              {#if text_only === false}
                <div class="grid px-3 xl:grid-cols-2">
                  <div class="flex flex-col items-center py-12">
                    {#if quote.quote_id.image}
                      <img
                        class="mb-6 h-48 w-48 rounded object-cover"
                        alt="Office"
                        src={gen_img_url(quote.quote_id.image.id)}
                      />
                    {:else}
                      <div class="h-40 w-40 bg-neutral object-cover" />
                    {/if}
                    <p
                      class="text-justify text-lg font-semibold drop-shadow-md"
                    >
                      {quote.quote_id.translations[0].subtitle}
                    </p>
                  </div>

                  <div class="flex items-center justify-center py-4">
                    <p class="line-clamp-7 text-justify text-lg drop-shadow-md">
                      {quote.quote_id.translations[0].text}
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
</div>
