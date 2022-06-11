// https://github.com/vuejs/pinia/issues/675#issuecomment-919544784
module.exports = {
	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.mjs$/,
					include: /node_modules/,
					type: 'javascript/auto',
				},
			],
		},
	},
}
