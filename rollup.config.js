import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import html from '@rollup/plugin-html';
import url from '@rollup/plugin-url';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;


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
