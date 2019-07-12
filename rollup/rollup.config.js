import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
import postcss from "rollup-plugin-postcss";
import replace from "rollup-plugin-replace";
import copy from "rollup-plugin-copy";
import json from "rollup-plugin-json";
import del from "rollup-plugin-delete";
import loadz0r from "rollup-plugin-loadz0r";
import alias from "rollup-plugin-alias";
import visualizer from "rollup-plugin-visualizer";

const dev = (process.env.NODE_ENV || "development") === "development";
const extensions = [".tsx", ".ts", ".jsx", ".mjs", ".js", ".json"];

export default {
  input: "./src/index.tsx",
  output: {
    dir: "dist",
    entryFileNames: "bundle.js",
    format: "amd",
    sourcemap: true
  },
  plugins: [
    del({ targets: ["dist"] }),
    copy({
      targets: [{ src: "src/index.html", dest: "dist", copyOnce: true }]
    }),
    loadz0r(),
    alias({
      "@ant-design/icons/lib/dist":
        "node_modules/@ant-design/icons/lib/index.es.js"
    }),
    replace({
      "process.env.NODE_ENV": `'${process.env.NODE_ENV}'`
    }),
    json(),
    postcss({
      extract: true,
      use: [
        [
          "less",
          {
            javascriptEnabled: true,
            modifyVars: {
              "@primary-color": "#00c5cd"
            }
          }
        ]
      ]
    }),
    nodeResolve({
      extensions,
      browser: true,
      dedupe: ["react", "react-dom"]
    }),
    commonjs({
      include: [/node_modules/],
      namedExports: {
        "node_modules/react/index.js": [
          "Children",
          "Component",
          "PropTypes",
          "createElement",
          "cloneElement",
          "createContext",
          "Fragment",
          "isValidElement"
        ],
        "node_modules/react-dom/index.js": [
          "render",
          "findDOMNode",
          "createPortal",
          "unmountComponentAtNode"
        ],
        "node_modules/prop-types/index.js": [
          "array",
          "bool",
          "func",
          "number",
          "object",
          "string",
          "symbol",
          "any",
          "arrayOf",
          "element",
          "elementType",
          "instanceOf",
          "node",
          "objectOf",
          "oneOf",
          "oneOfType",
          "shape",
          "exact"
        ]
      }
    }),
    babel({
      extensions,
      include: [/src/, /node_modules\/.+(\/|\.)es(\/|\.).+(?!node_modules)/]
    }),
    !dev && terser(),
    dev &&
      serve({
        contentBase: "dist",
        historyApiFallback: true,
        port: 3000
      }),
    visualizer({ sourcemap: true })
  ].filter(Boolean)
};
