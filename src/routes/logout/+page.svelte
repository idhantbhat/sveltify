<script>
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
</script>

<button on:click={logoutWithSpotify}>logout</button>