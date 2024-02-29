<script>
  import {pageKey} from '$lib/stores/pageKey';
  import {onMount} from 'svelte';
  import {
    Europe,
    LocationX,
    PersonCheck,
    PeopleHeart,
  } from '$lib/svg/nav_icons';
  import NavTiles from '$lib/components/NavTiles.svelte';

  onMount(() => {
    $pageKey = 'navbar.volunteering';
  });

  const navItems = [
    {key: 'navbar.volunteering.correlaidx', icon: Europe},
    {key: 'navbar.volunteering.founding_lc', icon: LocationX},
    {key: 'navbar.volunteering.become_member', icon: PersonCheck},
    {key: 'navbar.volunteering.volunteer_teams', icon: PeopleHeart},
  ];
</script>

<NavTiles {navItems} />
