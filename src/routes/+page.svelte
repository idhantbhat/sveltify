<script>
	import { onMount } from 'svelte';


	export let data;

	$: user = data.user;
    onMount(() => {
    window.location.href = "/auth/home";
  });
</script>

{#if user}
	<p>logging in {user.display_name}</p>
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif" alt="Loading..." />
{/if}

