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
    $page_key = 'navbar.volunteering';
  });

  const navItems = [
    {key: 'navbar.volunteering.correlaidx', icon: Europe},
    {key: 'navbar.volunteering.founding_lc', icon: LocationX},
    {key: 'navbar.volunteering.become_member', icon: PersonCheck},
    {key: 'navbar.volunteering.volunteer_teams', icon: PeopleHeart},
  ];
</script>

<NavTiles {navItems} />
