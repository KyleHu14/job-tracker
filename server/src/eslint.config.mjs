import globals from "globals";
import pluginJs from "@eslint/js";

export default [
	{
		env: {
			node: true,
			commonjs: true,
		},
		files: ["**/*.js"],
		languageOptions: { sourceType: "commonjs" },
	},
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
];
