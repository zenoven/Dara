import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import is from 'electron-is';
import log from 'electron-log';
import * as application from './services/application';
import * as window from './services/window';
import * as menu from './services/menu';
import aria2 from './services/aria2';
import * as store from './config/store';

const home = app.getPath('home');

const devTools = [
  join(home, '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0')
];

log.transports.file.level = 'info';

log.info('(main/index) app start');
log.info(`(main/index) log file at ${log.transports.file.file}`);

if (is.dev()) {
  require('electron-debug')(); // eslint-disable-line global-require
}

app.on('ready', () => {
  log.info('(main/index) app ready');
  application.init();
  menu.init();
  aria2.open();

  // 加载 devtools extension
  if (is.dev()) {
    devTools.forEach((tool) => {
      BrowserWindow.addDevToolsExtension(tool)
    })
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    aria2.close();
    app.quit();
  }
});

app.on('activate', () => {
  if (window.getAllWindows.length === 0) {
    application.init();
  }
});

app.on('quit', () => {
  log.info('(main/index) app quit');
  log.info('(main/index) <<<<<<<<<<<<<<<<<<<');
});

// Register to global, so renderer can access these with remote.getGlobal
global.services = {
  application,
  window,
  aria2,
};
global.config = {
  store,
};
