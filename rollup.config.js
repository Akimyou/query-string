import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

export default {
	input: "./index.js",
	output: {
		file: "./index.esm.js",
		format: "esm",
	},
	plugins: [
		resolve(),
		commonjs(),
		babel({
			include: ["./index.js", /split-on-first/],
		}),
	],
};
