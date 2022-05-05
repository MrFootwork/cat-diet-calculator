import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	// preset for deploying
	// https://v3.nuxtjs.org/guide/deploy/presets/
	nitro: {
		preset: 'node-server',
	},
})
