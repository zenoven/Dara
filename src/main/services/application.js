import { create, getPath } from './window';

export function init() {
  const win = create({
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    titleBarStyle: 'hidden',
    frame: false,
    hasShadow: false, // 窗口是否有阴影. 仅在 macOS 上支持
  });
  win.loadURL(getPath());
}
