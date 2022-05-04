import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	// ssr breaks on windows for "npm run generate"
	// https://github.com/nuxt/framework/issues/4555
	ssr: false,
})
