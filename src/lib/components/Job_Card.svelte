<script>
  import {t, locale} from '$lib/stores/i18n';
  import {toLocalDateString, convertContractType} from '$lib/js/helpers';

  export let title;
  export let slug;
  export let summary;
  export let fte;
  export let type;
  export let language;
  export let deadline;
  export let location;
  export let salary;
  export let tags = [];
  export let href = '';

  const listStyle = 'min-w-min mr-4 mb-2';

  const emojis = {
    workload: '&#x1F550;',
    salary: '&#x1F4B0;',
    location: '&#x1F4CD;',
    language_: '&#x1F5E3;',
  };

  let cardDetails = {};

  $: if (typeof slug !== 'undefined') {
    href = $t('navbar.jobs').url + '/' + slug;
  }

  $: {
    cardDetails = {};
    if ($locale === 'de') {
      cardDetails['Bewerbungsschluss: '] = toLocalDateString(
        deadline,
        $locale,
        true,
      );
      cardDetails['Art: '] = convertContractType(type, $locale);
    } else {
      cardDetails['Application Deadline: '] = toLocalDateString(
        deadline,
        $locale,
        true,
      );
      cardDetails['Type: '] = convertContractType(type, $locale);
    }
    cardDetails[emojis['workload']] = fte;
    cardDetails[emojis['location']] = location;
    cardDetails[emojis['salary']] = salary;
    cardDetails[emojis['language_']] = language;

    console.log(cardDetails);
  }
</script>

<div class="offset-right relative w-full" style="">
  <div
    class="z-1 relative top-0 grid h-full w-full grid-cols-4 rounded border border-neutral-25 bg-white p-4"
  >
    <div class="col-span-full">
      <div class="pb-2">
        <a
          {href}
          class="text-xl font-semibold text-base-content transition hover:text-primary"
        >
          {title}
        </a>
      </div>
      <div class="mb-4">
        {#each tags as tag}
          <span
            class="line-clamp-1 mr-2 inline-block whitespace-nowrap rounded bg-secondary px-3 py-1 text-xs font-bold text-white"
            >{tag}</span
          >
        {/each}
      </div>

      <ul class="mb-3 flex flex-wrap">
        {#each Object.keys(cardDetails) as key}
          <li class={listStyle}>
            {#if Object.values(emojis).some((value) => key.includes(value))}
              <strong aria-hidden="true">{@html key}</strong>
              <span class="sr-only"
                >{$t(
                  `access.${
                    Object.entries(emojis).find(
                      ([key_, value]) => value === key,
                    )[0]
                  }`,
                ).text}</span
              >
            {:else}
              <strong>{@html key}</strong>
            {/if}

            {cardDetails[key]}
          </li>
        {/each}
      </ul>

      <p class="line-clamp-3 mb-3 text-lg text-base-content xl:pb-0 xl:pr-4">
        {summary}
      </p>
    </div>
  </div>
</div>
