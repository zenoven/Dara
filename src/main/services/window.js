import is from 'electron-is';
import { join } from 'path';
import { BrowserWindow } from 'electron';

const newTaskModalOptions = {
  width: 400,
  height: 400,
};

class Window {
  constructor(props) {
    this.createTaskModal = null;
  }

  create(opts) {
    let win = new BrowserWindow(opts);
    win.on('close', () => {
      win = null;
    });
    return win;
  }

  toggleNewTaskModal(show) {
    if (show) {
      this.createTaskModal = this.create(newTaskModalOptions);
      this.createTaskModal.loadURL(this.getPath('new-task'));
      this.createTaskModal.on('close', () => {
        this.createTaskModal = null;
      });
    } else {
      this.createTaskModal && this.createTaskModal.close();
      this.createTaskModal = null;
    }
  }

  getAllWindows() {
    return BrowserWindow.getAllWindows();
  }

  getPath(route = '') {
    let path = `file://${join($dirname, '..', 'renderer')}/index.html`;
    if (is.dev()) {
      path = 'http://127.0.0.1:8000/';
    }
    if (route) {
      path += `#${route}`;
    }
    return path;
  }
}

export default new Window();

