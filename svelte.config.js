import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: preprocess({
		
	}),

	kit: {
		alias: { 'lib/': './src/routes/lib/' }
	}
};

export default config;