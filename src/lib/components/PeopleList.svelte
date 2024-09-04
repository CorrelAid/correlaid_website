<script>
  import Person from '$lib/components/Person.svelte';
  export let people;
  import Avatar from '$lib/components/Avatar.svelte';
  import Links from '$lib/components/Links.svelte';
  const w = `w-32`;
  const wM = `md:w-44`;

  const expand = {};

  function expandFunc(i, y) {
    const iy = `${i}${y}`;
    for (const key in expand) {
      if (expand.hasOwnProperty(key)) {
        if (key !== iy) {
          expand[key] = false;
        }
      }
    }
    expand[iy] = !expand[iy];
  }

  const no_cols = 3;

  $: team_len = people.length;
  $: batch_size = Math.ceil(team_len / no_cols);

  // Create an array of empty columns
  $: team_cols = Array.from({length: no_cols}, () => []);

  // Distribute the people into the columns in a row-wise order
  $: for (let i = 0; i < team_len; i++) {
    team_cols[i % no_cols].push(people[i]);
  }
</script>

<div class="hidden w-full md:flex md:px-0">
  {#each team_cols as col, i}
    <div class="inline-block w-1/3 align-top">
      {#each col as person, y}
        <div
          class="mb-7 mb-8 overflow-hidden transition-all duration-200 {expand[
            `${i}${y}`
          ] === true
            ? 'mb-14 h-[610px]'
            : 'h-[305px]'}"
        >
          <button
            class="flex pb-5"
            on:click={() => {
              expandFunc(i, y);
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
          <div class="pb-2.5">
            <button
              class="text-md text-left font-normal {w} {wM} leading-snug hover:text-primary"
              on:click={() => {
                expandFunc(i, y);
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
            <h3
              class="font-light {w} {wM} text-sm {expand[`${i}${y}`] === true
                ? 'line-clamp-3'
                : 'line-clamp-2'}"
            >
              {person.position}
            </h3>
          {/if}
          <div
            class="transition-all duration-100 {expand[`${i}${y}`] === true
              ? 'opacity-100'
              : 'opacity-0'}"
          >
            <div class="pb-1 pr-4 pt-6 text-left">
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
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>

<div class="container flex flex-col gap-y-8 px-4 md:hidden">
  {#each people as person}
    <Person {...person} />
  {/each}
</div>
