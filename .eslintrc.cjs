module.exports = {
	extends: ['plugin:svelte/recommended', 'plugin:@typescript-eslint/recommended'],
	plugins: ['testing-library', 'jest-dom', 'svelte', 'svelte'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		extraFileExtensions: ['.svelte'],
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
	],
};
