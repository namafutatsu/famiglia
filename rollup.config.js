import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss';
import html, { makeHtmlAttributes } from '@rollup/plugin-html';
import url from '@rollup/plugin-url';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

/* had to rewrite this function, thanks to this fucker maintainer that does
 * not understand how to write a clean API.
 */
function makeHtmlTemplate({ attributes, files, meta, publicPath, title }) {
  const scriptAttrs = makeHtmlAttributes(attributes.script);
  const scripts = files.js.map(({ fileName }) => {
    return `<script src="${publicPath}${fileName}" ${scriptAttrs}></script>`;
  }).join('\n');

  const linkAttrs = makeHtmlAttributes(attributes.link);
  const links = files.css.map(({ fileName }) => {
    return `<link href="${publicPath}${fileName}" rel="stylesheet" ${linkAttrs}>`;
  }).join('\n');

  const metas = meta.map((input) => {
    const attrs = makeHtmlAttributes(input);
    return `<meta${attrs}>`;
  }).join('\n');

  return `
    <!doctype html>
    <html${makeHtmlAttributes(attributes.html)}>
      <head>
        ${metas}
        <title>${title}</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap" rel="stylesheet">
        ${links}
      </head>
      <body>
        ${scripts}
      </body>
    </html>`.trim();
}

export default {
  input: 'src/main.js',
  output: {
    entryFileNames: '[name].[hash].js',
    sourcemap: true,
    format: 'es',
    name: 'app',
    dir: 'public/build'
  },
  plugins: [
    copy({
      targets: [
        { src: 'src/assets/favicons/*', dest: 'public/build' },
      ]
    }),
    url(),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      emitCss: true,
    }),
    postcss({
      extract: true,
      sourceMap: true,
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),

    html({
      title: 'Tarot de Pigalle',
      meta: [
        { charset: 'utf-8' },
        { content: 'width=device-width, initial-scale=1', name: 'viewport' },
      ],
      template: makeHtmlTemplate,
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        // Starts the sirv server
        // FIXME: does not kill it upon crashes :(
        require('child_process').spawn('sirv', ['public/build', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });
      }
    }
  };
}
