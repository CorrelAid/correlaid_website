<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import {
    BookHand,
    DataPresentation,
    Lab,
    ArrowPeople,
    CodeLearning,
  } from '$lib/svg/nav_icons';
  import NavTiles from '$lib/components/NavTiles.svelte';

  onMount(() => {
    $pageKey = 'navbar.education';
  });
  const navItems = [
    {key: 'navbar.education.resources', icon: BookHand},
    {key: 'navbar.education.learning_r', icon: CodeLearning},
    {key: 'navbar.education.course_data', icon: DataPresentation},
    {key: 'navbar.education.tidy_tuesday', icon: Lab},
    {key: 'navbar.education.mentoring', icon: ArrowPeople},
  ];
</script>

<NavTiles {navItems} />
