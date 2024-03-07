<script>
  import Html from '$lib/components/Html.svelte';
  import {onMount} from 'svelte';
  import {pageKey} from '$lib/stores/pageKey';
  import TextContainer from '$lib/components/TextContainer.svelte';
  import Person from '$lib/components/Person.svelte';

  onMount(() => {
    $pageKey = 'navbar.blog';
  });

  /** @type {import('./$types').PageData} */
  export let data;
  $: blogPost = data.blogPost;
</script>

<TextContainer
  title={blogPost.title}
  titleImage={blogPost.imageSrc}
  imageAlt={blogPost.imageAlt}
  teaser={blogPost.teaser}
>
  <div slot="sub_subtitle">
    <p class="mx-4 pb-4 text-lg font-light">
      {blogPost.pubDate} - {#each blogPost.contentCreators as person, i}
        {person.name}
        {person.pronouns ? `(${person.pronouns})` : ''}
        {#if i < blogPost.contentCreators.length - 1}{', '} {/if}{/each}
    </p>
  </div>
  <Html source={blogPost.text} options={'mx-auto'} slot="main" />
</TextContainer>
{#if blogPost.contentCreators.length != 0}
  <div class="container mx-auto space-y-8 px-4 py-12">
    {#each blogPost.contentCreators as person}
      <Person {...person} />
    {/each}
  </div>
{/if}
