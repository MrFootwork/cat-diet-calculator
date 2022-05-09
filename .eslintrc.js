module.exports = {
	extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
	rules: {
		'vue/first-attribute-linebreak': [
			'error',
			{
				singleline: 'ignore',
				multiline: 'below',
			},
		],
	},
}
