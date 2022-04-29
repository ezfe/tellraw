import adapterCf from '@sveltejs/adapter-cloudflare';
import adapterStatic from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const adapter = process.env.CF_PAGES ? adapterCf : adapterStatic;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		prerender: {
			default: true,
		}
	}
};

export default config;
