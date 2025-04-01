/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

var FB_API_KEY: string;
var FB_PROJECT_ID: string;

interface ImportMetaEnv {
	readonly DB_PASSWORD: string;
	readonly PUBLIC_POKEAPI: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
