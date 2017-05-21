import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'src/webSocket.js',
  format: 'cjs',
  dest: 'lib/webSocket.js',
  plugins: [ babel(), resolve(), commonjs() ],
  exports: 'named',
  external: [
    'rxjs/Observable',
    'rxjs/observable/dom/webSocket'
  ]
}
