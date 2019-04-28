import window from './window';

export function init() {
  const win = window.create({
    width: 900,
    height: 600,
    minWidth: 600,
    minHeight: 300,
    titleBarStyle: 'hidden',
    frame: false,
  });
  win.loadURL(window.getPath());
  return win;
}
