import commonjs from "@rollup/plugin-commonjs";
import babel from '@rollup/plugin-babel';

export default {
	input: "./index.js",
	output: {
		file: "./index.esm.js",
		format: "esm",
	},
	plugins: [commonjs(), babel()],
};
