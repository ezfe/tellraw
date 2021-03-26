module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: [
		"svelte3",
		"@typescript-eslint" // add the TypeScript plugin
	],
	overrides: [
		{
			files: ["*.svelte"],
			processor: "svelte3/svelte3"
		}
	],
	rules: {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	},
	settings: {
		// pass the TypeScript package to the Svelte plugin
		"svelte3/typescript": require("typescript"),
	}
};