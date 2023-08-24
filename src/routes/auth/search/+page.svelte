<script>
    export let data;
    let categories = [];
    let searchTerm = '';
    let searchInput;
    import {onMount} from 'svelte';


    const url = 'https://api.spotify.com/v1/browse/categories';
    const accessToken = data.accessToken;

    fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    .then((response) => response.json())
    .then((data) => {
        categories = data.categories.items;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    function handleKeyDown(event) {
    if (event.key === 'Enter') { // Handling both properties for maximum compatibility
        if (searchTerm.trim() !== '') {
            document.getElementById('virtualAnchor').click();
        }
    }
}

    onMount(() => {
        searchInput.focus();
	});

</script>

<div class="everything" on:keydown={handleKeyDown} data-aos="fade-up">
    <a href='/auth/search/query/{searchTerm}' id="virtualAnchor" style="display: none;"></a>

    <div>
            <input type="text" bind:value={searchTerm} bind:this={searchInput} placeholder="🌊 Search for albums, artists, or playlists" />
    </div>
    <h1>Browse Categories</h1>
    <div class="main-content">
        {#if categories && categories.length}
            {#each categories as category}
                <a data-aos="fade-up" href='/auth/search/query/{category.name}'>
                    <div class="category-item">
                        <img src="{category.icons[0].url}" alt="{category.name}">
                        <h3>{category.name}</h3>
                    </div>
                </a>
            {/each}
        {:else}
            <p>No categories available</p>
        {/if}
    </div>
</div>


<style>
	input {
		margin-top: 20px;
		margin-left: 100px;
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

	.everything {
		margin-left: 300px;
	}

	.main-content {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.category-item {
		position: relative;
		width: 150px;
		height: 150px;
	}

	.category-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 10px;
	}
    

	.category-item h3 {
		position: absolute;
		top: 75%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		text-align: center;
		width: 100%;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
	}
</style>
