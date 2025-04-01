const config = {
	singleQuote: false,
	printWidth: 160,
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
