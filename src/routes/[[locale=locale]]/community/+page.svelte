<script>
  import {page_key} from '$lib/stores/page_key';
  import {onMount} from 'svelte';
  import {
    Europe,
    LocationX,
    PersonCheck,
    PeopleHeart,
  } from '$lib/svg/nav_icons';
  import NavTiles from '$lib/components/NavTiles.svelte';

  onMount(() => {
    $page_key = 'navbar.community';
  });

  const navItems = [
    {key: 'navbar.community.correlaidx', icon: Europe},
    {key: 'navbar.community.founding_lc', icon: LocationX},
    {key: 'navbar.community.become_member', icon: PersonCheck},
    {key: 'navbar.community.volunteer_teams', icon: PeopleHeart},
  ];
</script>

<NavTiles {navItems} />
