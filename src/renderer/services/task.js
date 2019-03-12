import { remote } from 'electron';
const { aria2 } = remote.getGlobal('services');

export function fetchList(payload) {
  let { status, params } = payload;
  status = `${status[0].toUpperCase()}${status.slice(1)}`;
  return aria2.call(`tell${status}`, ...params);
}

export function fetchStat(payload) {
  return aria2.call('getGlobalStat', payload);
}