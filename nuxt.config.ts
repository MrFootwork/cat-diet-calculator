import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	// preset for deploying
	// https://v3.nuxtjs.org/guide/deploy/presets/
	nitro: {
		preset: 'node-server',
	},
	/** Strict Type Checking
	 *  https://v3.nuxtjs.org/guide/concepts/typescript/
	 */
	// typescript: {
	// 	strict: true,
	// },

	// debugging in nuxt
	// https://github.com/nuxt/framework/discussions/2098
	// https://nordschool.com/enable-vs-code-debugger-for-nuxt-and-typescript/
	extend(config: any, ctx: any) {
		if (ctx.isDev) {
			config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
		}
	},

	// ESM issues with chart.js
	// https://v3.nuxtjs.org/guide/going-further/esm#transpiling-libraries
	// without this following error would occur
	// https://v3.nuxtjs.org/guide/going-further/esm/#what-kinds-of-problems-can-there-be
	build: {
		transpile: ['chart.js'],
	},

	// https://stackoverflow.com/questions/71540998/how-to-use-global-sass-variables-in-my-nuxt-3-components
	css: ['@/assets/scss/main.scss'],
})
