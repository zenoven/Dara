import { join, resolve } from 'path';
import slash from 'slash';

export default {
  history: 'hash',
  publicPath: './static/',
  outputPath: '../../app/dist/renderer',
  plugins: [
    ['umi-plugin-react', {
      dva: {
        immer: true,
      },
      antd: true,
    }],
  ],
  externals(context, request, callback) {
    const isDev = process.env.NODE_ENV === 'development';
    let isExternal = false;
    const load = [
      'electron',
      'fs',
      'path',
      'os',
      'url',
      'child_process'
    ];
    if (load.includes(request)) {
      isExternal = `require("${request}")`;
    }
    const appDeps = Object.keys(require('../../app/package').dependencies);
    if (appDeps.includes(request)) {
      const orininalPath = slash(join(__dirname, '../../app/node_modules', request));
      const requireAbsolute = `require('${orininalPath}')`;
      isExternal = isDev ? requireAbsolute : `require('${request}')`;
    }
    callback(null, isExternal);
  },
  alias: {
    c: join(__dirname, './components'),
    components: join(__dirname, './components'),
    common: join(__dirname, './common'),
    pages: join(__dirname, './pages'),
    models: join(__dirname, './models'),
    layout: join(__dirname, './layout'),
    services: join(__dirname, './services'),
    utils: join(__dirname, './utils'),
    root: join(__dirname), // renderer root
  }
};
