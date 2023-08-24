<script>
	import { Home, Search, ListMusic, ChevronDown } from 'lucide-svelte';
	export let data;
	import AOS from 'aos';
	import { onMount } from 'svelte';
	import 'aos/dist/aos.css';
	import spotify from '$lib/images/spotify.png';
	import { trackDataStore } from '$lib/store.js';


	$: user = data.user;
	let showDropdown = false;
	function toggleDropdown() {
		showDropdown = !showDropdown;
	}
	onMount(() => {
		AOS.init();
		const closeDropdown = (event) => {
			if (!document.querySelector('.user-profile').contains(event.target)) {
				showDropdown = false;
			}
		};

		document.addEventListener('click', closeDropdown);
		return () => {
			document.removeEventListener('click', closeDropdown);
		};
	});

	async function logoutWithSpotify() {
		const response = await fetch('/api/logout', {
			method: 'POST'
		});

		if (response.ok) {
			window.location.href = '/';
		} else {
			console.error('Failed to logout');
		}
	}
	let audioElement;
	let currentPreviewUrl = $trackDataStore.preview_url;
    
    $: if (currentPreviewUrl !== $trackDataStore.preview_url) {
        currentPreviewUrl = $trackDataStore.preview_url;
        audioElement && audioElement.load();
    }
	function handleCanPlayThrough() {
		audioElement.play();
	}
</script>

<div class="nav-bar">
	<a class="title1" href="/auth/home"> <img id="logo" src={spotify} alt="" /></a>
	<ul class="nav-list">
		<li><a href="/auth/home">Home <Home /> </a></li>
		<li><a href="/auth/search">Search <Search /></a></li>
		<li><a href="/auth/playlists">Playlist <ListMusic /></a></li>
	</ul>
</div>

<div class="user-profile" on:click={toggleDropdown}>
	<img
		class="profile-pic"
		src="https://pbs.twimg.com/profile_images/1284959902671093761/tLN43QKJ_400x400.jpg"
		alt="{user.display_name}'s profile picture"
	/>
	<span>{user.display_name}<ChevronDown class="chevron" /> </span>
	{#if showDropdown}
		<div class="dropdown">
			<button>Settings</button>
			<button on:click={logoutWithSpotify}>Log Out</button>
		</div>
	{/if}
</div>
<div class="music">
	{#if currentPreviewUrl}
		<audio controls bind:this={audioElement} on:canplaythrough={handleCanPlayThrough} key={currentPreviewUrl}>
			<source src={currentPreviewUrl} type="audio/mpeg" />
			Your browser does not support the audio element.
		</audio>
	{:else}
		<audio controls bind:this={audioElement} on:canplaythrough={handleCanPlayThrough}>
			<source src='path_to_default_or_placeholder.mp3' type="audio/mpeg" />
			Your browser does not support the audio element.
		</audio>
	{/if}
	</div>
<slot />

<style lang="scss">
	#logo {
		width: 200px;
		height: auto;
	}
	.title1 {
		text-decoration: none;
		color: white;
	}

	.profile-pic {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		margin-right: 10px; // Spacing between image and display name
	}
	.dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		width: 150px;
		background-color: var(--sidebar-color);
		border-radius: 5px;
		box-shadow: 2px 2px 5px var(--border);
		z-index: 1;

		button {
			display: block;
			width: 100%;
			padding: 8px 10px;
			background: none;
			border: none;
			text-align: left;
			color: var(--menu-text-color);
			cursor: pointer;
			transition: background-color 0.3s;

			&:hover {
				background-color: var(--medium-gray);
			}
		}
	}
	:global(.chevron) {
		position: relative;
		top: 7px;
	}
	:global(.nav-list a svg) {
		margin-top: -8px;
		vertical-align: middle; /* To align the icon with the text */
	}

	.nav-bar {
		width: var(--sidebar-width);
		height: 100vh;
		background-color: var(--sidebar-color);
		position: fixed;
		top: 0;
		left: 0;
		padding: 20px;
		box-shadow: 2px 0 5px var(--border);
	}

	.nav-title {
		color: var(--text-color);
		font-weight: 600;
		font-size: 1.75rem;
		margin-bottom: 20px;
		border-bottom: 1px solid var(--border);
		padding-bottom: 15px;
	}

	.nav-list {
		list-style: none;
		padding: 0;
	}

	.nav-list li {
		margin: 10px 0;
	}

	.nav-list a {
		color: var(--menu-text-color);
		text-decoration: none;
		font-size: 1rem;
		display: block;
		padding: 8px 10px;
		border-radius: 5px;
		transition: background-color 0.3s;
	}

	.nav-list a:hover {
		background-color: var(--medium-gray);
	}

	.content {
		margin-left: calc(var(--sidebar-width) + 10px); /* width of nav-bar + some padding */
		padding: 20px;
	}
	.user-profile {
		position: fixed;
		top: 20px;
		right: 20px;
		z-index: 999;
		display: flex;
		align-items: center;
		background-color: var(--sidebar-color);
		padding: 0 10px 10px 10px;
		border-radius: 5px;
		box-shadow: 2px 2px 5px var(--border);
		transition: box-shadow 0.3s;

		&:hover {
			cursor: pointer;
			box-shadow: 2px 2px 5px var(--accent-color);
		}

		img.profile-pic {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			margin-right: 10px;
		}
	}

	.dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		width: 150px;
		background-color: var(--sidebar-color);
		border-radius: 5px;
		box-shadow: 2px 2px 5px var(--border);
		z-index: 1;
		overflow: hidden; // to ensure border radius applies to inner buttons

		button {
			display: block;
			width: 100%;
			padding: 8px 10px;
			background: none;
			border: none;
			border-bottom: 1px solid var(--border); // Spacing between dropdown items
			text-align: left;
			color: var(--menu-text-color);
			cursor: pointer;
			transition: background-color 0.3s;

			&:hover {
				background-color: var(--medium-gray);
			}

			&:last-child {
				border-bottom: none; // Remove border for the last item
			}

			&:active {
				background-color: var(--dark-gray); // Active state effect
			}
		}
	}
</style>