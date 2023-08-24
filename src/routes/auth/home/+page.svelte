<script>
	export let data;
	let albums = [];
	// Your fetch logic
	const url = 'https://api.spotify.com/v1/browse/new-releases?limit=6';
	const accessToken = data.accessToken;
	fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})
		.then((response) => response.json())
		.then((data) => {
			albums = data.albums.items; // <-- Store the data in the albums array
		})
		.catch((error) => {
			console.error('Error:', error);
		});
</script>

<div class="main-content" data-aos="fade-up">
	<h2 data-aos="fade-up">New Releases🔥</h2>
	<div id="album-container">
		{#each albums as album}
			<a href="/auth/album/{album.id}" data-aos="fade-up">
				<div class="album">
					<img src={album.images[0].url} alt={album.name} />
					<h5>{album.name.length > 23 ? album.name.slice(0, 20) + '...' : album.name}</h5>
					<p>{album.artists[0].name}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
<div class="main-content" data-aos="fade-up">
	<h2 data-aos="fade-up">Featured Playlists👌</h2>
	<div id="album-container">
		{#each albums as album}
			<a href="/auth/album/{album.id}" data-aos="fade-up">
				<div class="album">
					<img src={album.images[0].url} alt={album.name} />
					<h5>{album.name.length > 23 ? album.name.slice(0, 20) + '...' : album.name}</h5>
					<p>{album.artists[0].name}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
<div class="main-content" data-aos="fade-up">
	<h2 data-aos="fade-up">At Home🤢</h2>
	<div id="album-container">
		{#each albums as album}
			<a href="/auth/album/{album.id}" data-aos="fade-up">
				<div class="album">
					<img src={album.images[0].url} alt={album.name} />
					<h5>{album.name.length > 23 ? album.name.slice(0, 20) + '...' : album.name}</h5>
					<p>{album.artists[0].name}</p>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	a {
		text-decoration: none;
		color: white;
	}
	a:hover {
		text-decoration: none;
	}
	p {
		color: var(--light-gray);
		font-size: 0.8em;
	}
	.main-content {
		margin-left: 300px;
	}
	#album-container {
		display: grid;
		grid-template-columns: repeat(6, 1fr); /* creates 7 equal-width columns */
		gap: 5px; /* spacing between the grid items */
	}
	.album:hover {
		border: 1px solid var(--accent-color);
		transition: border 0.3s ease; /* Transition applied directly to the image */
		cursor: pointer;
	}

	.album {
		padding: 5px;
		box-sizing: border-box;
		height: 236px;
		background-color: var(--medium-gray);
	}

	.album img {
		max-width: 100%;
		max-height: 150px;
	}
</style>
