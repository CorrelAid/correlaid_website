<script>
  import Html from '$lib/components/Html.svelte';
  import {onMount} from 'svelte';
  import {pageKey} from '$lib/stores/pageKey';
  import TextContainer from '$lib/components/TextContainer.svelte';
  import Person from '$lib/components/Person.svelte';

  onMount(() => {
    $pageKey = 'navbar.blog';
  });

  let {data} = $props();
  let blogPost = $derived(data.blogPost);
</script>

{#snippet sub_subtitle()}
  <div>
    <p class="mx-4 pb-4 text-lg font-light">
      {blogPost.pubDate} - {#each blogPost.contentCreators as person, i}
        {person.name}
        {person.pronouns ? `(${person.pronouns})` : ''}
        {#if i < blogPost.contentCreators.length - 1}{', '}
        {/if}{/each}
    </p>
  </div>
{/snippet}

{#snippet main()}
  <Html source={blogPost.text} options={'mx-auto'} />
{/snippet}

<TextContainer
  title={blogPost.title}
  titleImage={blogPost.imageSrc}
  imageAlt={blogPost.imageAlt}
  imageDesc={blogPost.imageDesc}
  teaser={blogPost.teaser}
  {sub_subtitle}
  {main}
/>

{#if blogPost.contentCreators.length != 0}
  <div class="container mx-auto space-y-8 px-4 py-12">
    {#each blogPost.contentCreators as person}
      <Person {...person} />
    {/each}
  </div>
{/if}
