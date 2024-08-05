<script>
  import Person from '$lib/components/Person.svelte';
  export let people;
  import Avatar from '$lib/components/Avatar.svelte';
  import Links from '$lib/components/Links.svelte';
  const w = `w-32`;
  const wM = `md:w-44`;
  const itemH = `h-72`;
  const itemHM = `md:h-72`;

  const expand = {};

  function expandFunc(i) {
    i = `${i}`;
    // Set all keys in expand to false
    for (const key in expand) {
      if (expand.hasOwnProperty(key)) {
        if (key !== i) {
          expand[key] = false;
        }
      }
    }

    // Toggle the key that was clicked
    expand[i] = !expand[i];
  }
</script>

<div
  class="hidden grid-cols-3 place-content-around place-items-center gap-y-10 md:grid md:px-0"
>
  {#each people as person, i}
    <div
      class="col-span-1 {expand[i] === true
        ? 'row-span-2'
        : ''} place-self-stretch"
    >
      <div class={expand[i] === true ? 'pb-5' : `${itemH} ${itemHM}`}>
        <button
          class="flex pb-3"
          on:click={() => {
            expandFunc(i);
          }}
        >
          <div aria-hidden="true" class="flex">
            <Avatar
              imageSrc={person.imageSrc}
              imageAlt={person.imageAlt}
              imageDesc={person.imageDesc}
              showCredit={false}
              {w}
              {wM}
            />
          </div>
        </button>
        <div class="pb-2">
          <button
            class="text-md text-left font-normal {w} {wM} leading-snug hover:text-primary"
            on:click={() => {
              expandFunc(i);
            }}
          >
            {person.name}
            <span class=""
              >{person.pronouns && person.pronouns != ''
                ? `(${person.pronouns})`
                : ''}</span
            >
          </button>
        </div>
        {#if person.position}
          <h3 class="font-light {w} {wM} text-sm">{person.position}</h3>
        {/if}
      </div>
      {#if expand[i] === true}
        <div class="w-full pb-1 pr-4 text-left">
          <p class="line-clamp-[11] text-sm">{person.description}</p>
        </div>
        {#if person.email && person.email != ''}
          <p class="pb-3">
            <a
              class="text-sm font-normal text-secondary underline drop-shadow-sm"
              href="mailto:{person.email}">{person.email}</a
            >
          </p>
        {/if}
        <Links iconSize={20} {...person.links} />
      {/if}
    </div>
  {/each}
</div>

<div class="container flex flex-col gap-y-8 px-4 md:hidden">
  {#each people as person}
    <Person {...person} />
  {/each}
</div>
