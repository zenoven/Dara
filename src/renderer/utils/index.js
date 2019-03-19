import BigNumber from 'bignumber.js'
export function formatTask(task) {
  let {
    gid,
    status,
    totalLength,
    completedLength,
    ...item
  } = task;
  return {
    ...task,
    name: getTaskName(task),
    progress: getProgress(task),
  }
}

export function isTorrent({ bittorrent }) {
  return bittorrent && bittorrent.info;
}

export function getTaskName(task) {
  let { files, bittorrent } = task;
  return isTorrent(task) ? bittorrent.info.name : getFileName(files[0]);
}

export function getFileName(file) {
  if (!file) return '';

  let { path } = file;

  if (!path && file.uris && file.uris.length) {
    path = decodeURI(file.uris[0]);
  }

  let index = path.lastIndexOf('/');

  if (index <= 0) {
    return path;
  }

  return path.substring(index + 1);
}

export function getProgress({
  totalLength,
  completedLength,
  ...item
}) {
  return BigNumber(completedLength).times(100).div(completedLength).toFixed(2)
}