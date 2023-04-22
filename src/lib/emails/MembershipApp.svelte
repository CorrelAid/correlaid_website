<script>
	import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';

	export let name = "ddf";

	
</script>

<Html lang="de">
	<Head />
	<Preview preview="Welcome to svelte-email" />
	<Section>
		<Container>
			<Text>{name} würde gerne Mitglied im Verein werden</Text>
		</Container>
	</Section>
</Html>
