import is from 'electron-is';
import { join } from 'path';
import { BrowserWindow } from 'electron';

export function create(opts) {
  let win = new BrowserWindow(opts);
  win.on('close', () => {
    win = null;
  });
  return win;
}

export function getAllWindows() {
  return BrowserWindow.getAllWindows();
}

export function getPath(route = '') {
  let path = `file://${join($dirname, '..', 'renderer')}/index.html`;
  if (is.dev()) {
    path = 'http://127.0.0.1:8000/';
  }
  if (route) {
    path += `#${route}`;
  }
  return path;
}
