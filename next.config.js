const path = require('path')

module.exports = {
	trailingSlash: true,
	reactStrictMode: false,

	// experimental: {
	//   esmExternals: false,
	//   jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
	// },
	webpack: config => {
		config.resolve.alias = {
			...config.resolve.alias,
			apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
		}

		return config
	},
	async headers() {
		return [
			{
				source: '/',
				headers: [
					{
						key: 'Content-Type',
						value: 'text-html; charset=utf-8'
					}
				]
			}
		]
	}
}
