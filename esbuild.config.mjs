import esbuild from "esbuild";
import process from "node:process";
import { builtinModules } from "node:module";

const banner =
  "/* Generated with esbuild. Inspect the TypeScript source in the repository for readable code. */";

const isProduction = process.argv[2] === "production";

const context = await esbuild.context({
  entryPoints: ["src/main.ts"],
  outfile: "main.js",
  bundle: true,
  format: "cjs",
  target: "es2018",
  sourcemap: isProduction ? false : "inline",
  treeShaking: true,
  minify: isProduction,
  logLevel: "info",
  banner: {
    js: banner
  },
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...builtinModules
  ]
});

if (isProduction) {
  await context.rebuild();
  process.exit(0);
}

await context.watch();
