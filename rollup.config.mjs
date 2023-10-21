import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import ts from "rollup-plugin-ts";
import pkg from "./package.json" assert { type: "json" };

export default {
  input: "src/main.ts",
  plugins: [ts(), nodeResolve(), commonjs()],
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "esm" },
  ],
  external: [],
};
