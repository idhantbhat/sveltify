<script>
	import { onMount } from 'svelte';

	export let data;
    let searchTerm = '';
	let categoryDetails;
	let slug = data.slug;
    let searchInput;
	const fetchCategoryDetails = async () => {
		try {
			const response = await fetch(
				`https://api.spotify.com/v1/search?q=${slug.replace(
					/%20/g,
					'+'
				)}&type=album%2Cartist%2Ctrack%2Cplaylist&limit=6`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${data.accessToken}`
					}
				}
			);

			if (response.ok) {
				categoryDetails = await response.json();
			} else {
				console.error(`Error fetching category: ${response.statusText}`);
			}
		} catch (err) {
			console.error('Failed to fetch category details:', err);
		}
	};

	onMount(() => {
		fetchCategoryDetails();
        searchInput.focus();
	});
	
    async function handleKeyDown(event) {
    if (event.key === 'Enter') { // Handling both properties for maximum compatibility
        if (searchTerm.trim() !== '') {
            slug = searchTerm.trim()
            await fetchCategoryDetails();
            document.getElementById('virtualAnchor').click();
            setTimeout(() => {
                searchInput.focus();
            }, 100);         
        }
    }}
</script>
<div class="everything" on:keydown={handleKeyDown} data-aos="fade-up">
    <a href='/auth/search/query/{searchTerm}' id="virtualAnchor" style="display: none;"></a>

    <div>
            <input type="text" bind:value={searchTerm}     bind:this={searchInput} 
            placeholder="🌊 Search for albums, artists, or playlists" />
    </div>
    </div>
<br>
<div class="main-content" data-aos="fade-up">
	<h2 data-aos="fade-up">Searched Songs</h2>
	<div id="album-container">
		{#if categoryDetails && categoryDetails.tracks}
			{#each categoryDetails.tracks.items as track}
				<a href="/auth/track/{track.id}" data-aos="fade-up">
					<div class="album">
						<img src={track.album.images[0]?.url} alt={track.name} />
						<h5>{track.name.length > 23 ? track.name.slice(0, 20) + '...' : track.name}</h5>
						<p>{track.artists[0]?.name}</p>
					</div>
				</a>
			{/each}
		{/if}
	</div>
</div>

<div class="main-content" data-aos="fade-up">
	<h2 data-aos="fade-up">Searched Albums</h2>
	<div id="album-container">
		{#if categoryDetails && categoryDetails.albums}
			{#each categoryDetails.albums.items as album}
				<a href="/auth/album/{album.id}" data-aos="fade-up">
					<div class="album">
						<img src={album.images[0]?.url} alt={album.name} />
						<h5>{album.name.length > 23 ? album.name.slice(0, 20) + '...' : album.name}</h5>
						<p>{album.artists[0]?.name}</p>
					</div>
				</a>
			{/each}
		{/if}
	</div>
</div>

<div class="main-content" data-aos="fade-up">
	<h2 data-aos="fade-up">Searched Playlists</h2>
	<div id="album-container">
		{#if categoryDetails && categoryDetails.playlists}
			{#each categoryDetails.playlists.items as playlist}
				<a href="/auth/album/{playlist.id}" data-aos="fade-up">
					<div class="album">
						<img src={playlist.images[0]?.url} alt={playlist.name} />
						<h5>{playlist.name.length > 23 ? playlist.name.slice(0, 20) + '...' : playlist.name}</h5>
					</div>
				</a>
			{/each}
		{/if}
	</div>
</div>

<style>
	input {
		margin-top: 20px;
		margin-left: 400px;
		padding: 10px 15px; /* Increased padding for larger appearance */
		font-size: 18px; /* Bigger font size */
		border-radius: 20px; /* Rounded corners */
		border: 1px solid var(--accent-color); /* Optional border */
		width: 300px; /* Optional fixed width */
		transition: border-color 0.3s, box-shadow 0.3s; /* Smooth transitions for focus effect */
		outline: var(--accent-color); /* Remove default focus outline */
	}

	input:focus {
		border-color: #007bff; /* Change border color on focus */
		box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a subtle glow effect on focus */
	}
	a {
		text-decoration: none;
        color:white;

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
		background-color: var(--medium-gray);
        height: 226px;
	}

	.album img {
		max-width: 100%;
		max-height: 150px;
	}
</style>
