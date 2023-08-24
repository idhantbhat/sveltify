<script>
    import { onMount } from 'svelte';
    import { trackDataStore } from '$lib/store.js'; // Import from the $lib directory
    
    export let data;
    let accessToken = data.accessToken;
    let slug = data.slug;
    let previewUrl = null;
    let trackData;

    onMount(async () => {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${slug}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        trackData = await response.json();
        
        trackDataStore.set(trackData);
        previewUrl = trackData.preview_url;
    });


</script>

{#if $trackDataStore.name}
    <p>Track Name: {$trackDataStore.name}</p>
{/if}

<!-- Button to update the store -->

<style>
    p, button{
        margin-left:300px;
    }
</style>
