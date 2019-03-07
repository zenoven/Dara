import is from 'electron-is';
import { create, getPath } from './window';

const vibrancyConf = is.macOS() ? {
  transparent: true,
  vibrancy: 'appearance-based', // 毛玻璃效果，仅在 macOS 有效
} : {};
export function init() {
  const win = create({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    frame: false,
    ...vibrancyConf
  });
  win.loadURL(getPath());
}
