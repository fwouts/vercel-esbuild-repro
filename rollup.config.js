import alias from "@rollup/plugin-alias";
import commonJs from "@rollup/plugin-commonjs";
import jsonPlugin from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "api/api.js",
  output: {
    file: "api/index.js",
    format: "cjs",
  },
  external: [
    "@prisma/client",
    "@remix-run/react",
    "@remix-run/node",
    "esbuild",
    "react",
  ],
  plugins: [
    commonJs(),
    alias({
      entries: [{ find: "fetch", replacement: "node-fetch" }],
    }),
    resolve({
      moduleDirectories: ["node_modules"],
    }),
    jsonPlugin(),
  ],
};
