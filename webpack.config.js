module.exports = {
	entry: "./demos/index.js",
	output: {
		path: "./demos",
		filename: "build.js"
	},
	resolve: {
		extensions: [
			"",
			".js"
		],
		modulesDirectories: [
			"node_modules"
		]
	},
	module: {
		loaders: []
	}
};