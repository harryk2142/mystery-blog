// @ts-check
const config = {
	singleQuote: false,
	trailingComma: "all",
	printWidth: 90,
	tabWidth: 4,
	useTabs: true,
	plugins: ["prettier-plugin-astro", "prettier-plugin-organize-imports"],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};

export default config;
