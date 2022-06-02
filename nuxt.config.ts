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
})
