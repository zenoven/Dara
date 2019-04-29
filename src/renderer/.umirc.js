import { join, resolve } from 'path';
import slash from 'slash';

const cwd = process.cwd();

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
  chainWebpack(config, { webpack }) {

    // config.context = join()
    config.entry('main').add('../main/index.js')
    // config.entry = {
    //   main: join(__dirname, '../main/index.js'),
    // };
    config.output.path = join(cwd, '../../app/dist/main');
    config.target = 'electron';
    config.externals = (context, request, callback) => {
      callback(null, request.charAt(0) === '.' ? false : `require("${request}")`);
    };
    config.plugins.push(
      new webpack.DefinePlugin({
        $dirname: '__dirname',
      }),
    );
    console.log('config:', config);
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
