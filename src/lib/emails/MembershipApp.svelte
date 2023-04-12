<script>
	import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';

	
</script>

<Html lang="en">
	<Head />
	<Preview preview="Welcome to svelte-email" />
	<Section>
		<Container>
			<Img
				src="https://svelte.dev/svelte-logo-horizontal.svg"
				alt="Svelte logo"
			
				width="200"
				height="50"
			/>
			<Text>, welcome to svelte-email</Text>
			<Text>A Svelte component library for building responsive emails</Text>
			<Section >
				<Button pX={12} pY={12} href="https://github.com/carstenlebek/svelte-email">
					View on GitHub
				</Button>
			</Section>
			<Text>Happy coding!</Text>
			<Hr/>
			<Text>Carsten Lebek</Text>
		</Container>
	</Section>
</Html>
