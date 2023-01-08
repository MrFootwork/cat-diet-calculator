import { defineConfig } from 'vite'
import { alias } from './alias'

// TODO add quokka functionality
// https://quokkajs.com/whatsnew/vite-node-runtime.html
// https://www.npmjs.com/package/vite-node

export default defineConfig({
	root: '.',
	esbuild: {
		tsconfigRaw: '{}',
	},
	resolve: {
		alias,
	},
})
